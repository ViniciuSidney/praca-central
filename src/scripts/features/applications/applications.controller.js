import { APP_CONFIG } from '../../core/config.js';
import { applicationsData } from '../../data/applications.js';
import { query, queryAll } from '../../shared/dom.js';
import { createApplicationsCollection } from './applications.model.js';
import {
  filterApplications,
  filterQuickApplications,
  getFilterOptions,
  hasValidUrl,
  loadFavoriteIds,
  loadRecentIds,
  loadViewMode,
  registerRecentApplication,
  saveFavoriteIds,
  saveViewMode
} from './applications.service.js';
import {
  renderApplications,
  renderDetails,
  renderFilterOptions,
  renderQuickList,
  renderSelectedApplication
} from './applications.ui.js';

const NAVIGATION_LABELS = Object.freeze({
  all: 'Todas as aplicações',
  favorites: 'Aplicações favoritas',
  development: 'Projetos em desenvolvimento',
  recent: 'Acessos recentes'
});

function createState(applications) {
  return {
    applications,
    selectedId: applications[0]?.id ?? null,
    navigation: 'all',
    search: '',
    sidebarSearch: '',
    viewMode: loadViewMode(),
    favoriteIds: loadFavoriteIds(applications),
    recentIds: loadRecentIds(applications),
    filters: {
      category: 'all',
      status: 'all',
      favoritesOnly: false
    }
  };
}

function getElements() {
  return {
    grid: query('#applicationsGrid'),
    resultSummary: query('#resultSummary'),
    activeSectionLabel: query('#activeSectionLabel'),
    mainSearch: query('#mainSearch'),
    sidebarSearch: query('#sidebarSearch'),
    selected: query('#selectedApplication'),
    selectedOpenButton: query('#selectedOpenButton'),
    quickList: query('#quickList'),
    sidebarCount: query('#sidebarCount'),
    viewToggle: query('#viewToggle'),
    viewToggleIcon: query('#viewToggleIcon'),
    filterToggle: query('#filterToggle'),
    filterPanel: query('#filterPanel'),
    filterClose: query('#filterClose'),
    filterCount: query('#filterCount'),
    categoryFilter: query('#categoryFilter'),
    statusFilter: query('#statusFilter'),
    favoritesFilter: query('#favoritesFilter'),
    clearFilters: query('#clearFilters'),
    detailsDialog: query('#detailsDialog'),
    detailsTitle: query('#detailsTitle'),
    detailsBody: query('#detailsBody'),
    detailsOpenButton: query('#detailsOpenButton'),
    aboutDialog: query('#aboutDialog'),
    aboutButton: query('#aboutButton'),
    sidebar: query('#sidebar'),
    sidebarToggle: query('#sidebarToggle'),
    sidebarClose: query('#sidebarClose'),
    sidebarBackdrop: query('#sidebarBackdrop'),
    brand: query('.brand-panel'),
    version: query('#appVersion'),
    navItems: queryAll('[data-nav]')
  };
}

function findApplication(state, id) {
  return state.applications.find((application) => application.id === id) ?? null;
}

function getSelectedApplication(state) {
  return findApplication(state, state.selectedId) ?? state.applications[0] ?? null;
}

function getActiveFilterCount(state) {
  return Number(state.filters.category !== 'all') + Number(state.filters.status !== 'all') + Number(state.filters.favoritesOnly);
}

function hasSearchOrFilters(state) {
  return Boolean(state.search.trim()) || getActiveFilterCount(state) > 0;
}

function updateViewButton(state, elements) {
  const isGrid = state.viewMode === 'grid';
  elements.viewToggleIcon.textContent = isGrid ? '▦' : '☷';
  elements.viewToggle.setAttribute('aria-label', isGrid ? 'Ativar visualização em lista' : 'Ativar visualização em grade');
  elements.viewToggle.title = isGrid ? 'Visualização em lista' : 'Visualização em grade';
}

function updateFilters(state, elements) {
  const count = getActiveFilterCount(state);
  elements.filterCount.hidden = count === 0;
  elements.filterCount.textContent = String(count);
  elements.filterToggle.classList.toggle('is-active', count > 0);
}

function updateNavigation(state, elements) {
  elements.navItems.forEach((item) => {
    const active = item.dataset.nav === state.navigation;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });

  elements.activeSectionLabel.textContent = NAVIGATION_LABELS[state.navigation] ?? NAVIGATION_LABELS.all;
}

function renderSidebar(state, elements) {
  const selected = getSelectedApplication(state);

  if (!selected) {
    elements.selected.innerHTML = '<p>Nenhuma aplicação cadastrada.</p>';
    elements.selectedOpenButton.setAttribute('aria-disabled', 'true');
    elements.quickList.innerHTML = '';
    elements.sidebarCount.textContent = '0';
    return;
  }

  renderSelectedApplication(selected, {
    selected: elements.selected,
    openButton: elements.selectedOpenButton
  });

  const quickApplications = filterQuickApplications(state.applications, state.sidebarSearch);
  renderQuickList(
    quickApplications,
    {
      list: elements.quickList,
      count: elements.sidebarCount
    },
    state.selectedId
  );
}

function renderMain(state, elements) {
  const filtered = filterApplications(state.applications, state);

  renderApplications(
    filtered,
    {
      grid: elements.grid,
      resultSummary: elements.resultSummary
    },
    {
      selectedId: state.selectedId,
      favoriteIds: state.favoriteIds,
      viewMode: state.viewMode,
      navigation: state.navigation,
      hasSearchOrFilters: hasSearchOrFilters(state)
    }
  );

  updateViewButton(state, elements);
  updateFilters(state, elements);
  updateNavigation(state, elements);
}

function renderAll(state, elements) {
  renderMain(state, elements);
  renderSidebar(state, elements);
}

function openFilterPanel(elements) {
  elements.filterPanel.hidden = false;
  elements.filterToggle.setAttribute('aria-expanded', 'true');
}

function closeFilterPanel(elements) {
  elements.filterPanel.hidden = true;
  elements.filterToggle.setAttribute('aria-expanded', 'false');
}

function openSidebar(elements) {
  elements.sidebar.classList.add('is-open');
  elements.sidebarToggle.setAttribute('aria-expanded', 'true');
  elements.sidebarToggle.setAttribute('aria-label', 'Fechar painel lateral');
  elements.sidebarBackdrop.hidden = false;
  elements.sidebarSearch.focus();
}

function closeSidebar(elements, restoreFocus = true) {
  elements.sidebar.classList.remove('is-open');
  elements.sidebarToggle.setAttribute('aria-expanded', 'false');
  elements.sidebarToggle.setAttribute('aria-label', 'Abrir painel lateral');
  elements.sidebarBackdrop.hidden = true;

  if (restoreFocus) {
    elements.sidebarToggle.focus();
  }
}

function openDetails(application, elements) {
  renderDetails(application, {
    title: elements.detailsTitle,
    body: elements.detailsBody,
    openButton: elements.detailsOpenButton
  });
  elements.detailsDialog.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) {
    dialog.close();
  }
}

function registerOpen(applicationId, state) {
  const application = findApplication(state, applicationId);

  if (!application || !hasValidUrl(application)) {
    return;
  }

  state.recentIds = registerRecentApplication(applicationId, state.recentIds);
}

function selectApplication(applicationId, state, elements, options = {}) {
  if (!findApplication(state, applicationId)) {
    return;
  }

  state.selectedId = applicationId;
  renderAll(state, elements);

  if (options.closeDrawer && window.matchMedia('(max-width: 900px)').matches) {
    closeSidebar(elements, false);
  }
}

function bindGridEvents(state, elements) {
  elements.grid.addEventListener('click', (event) => {
    const actionElement = event.target.closest('[data-action]');
    const card = event.target.closest('[data-application-id]');
    const applicationId = actionElement?.dataset.applicationId ?? card?.dataset.applicationId;

    if (!applicationId) {
      return;
    }

    if (actionElement?.dataset.action === 'favorite') {
      event.stopPropagation();

      if (state.favoriteIds.has(applicationId)) {
        state.favoriteIds.delete(applicationId);
      } else {
        state.favoriteIds.add(applicationId);
      }

      saveFavoriteIds(state.favoriteIds);
      renderAll(state, elements);
      return;
    }

    if (actionElement?.dataset.action === 'details') {
      event.stopPropagation();
      const application = findApplication(state, applicationId);
      if (application) {
        openDetails(application, elements);
      }
      return;
    }

    if (actionElement?.dataset.action === 'open') {
      registerOpen(applicationId, state);
      return;
    }

    selectApplication(applicationId, state, elements);
  });

  elements.grid.addEventListener('keydown', (event) => {
    if (!['Enter', ' '].includes(event.key) || event.target.closest('button, a')) {
      return;
    }

    const card = event.target.closest('.application-card');
    if (!card) {
      return;
    }

    event.preventDefault();
    selectApplication(card.dataset.applicationId, state, elements);
  });
}

function bindNavigation(state, elements) {
  elements.navItems.forEach((item) => {
    item.addEventListener('click', () => {
      state.navigation = item.dataset.nav;
      renderMain(state, elements);
    });
  });

  elements.brand.addEventListener('click', (event) => {
    event.preventDefault();
    state.navigation = 'all';
    state.search = '';
    elements.mainSearch.value = '';
    renderMain(state, elements);
  });
}

function bindFilters(state, elements) {
  elements.filterToggle.addEventListener('click', () => {
    if (elements.filterPanel.hidden) {
      openFilterPanel(elements);
    } else {
      closeFilterPanel(elements);
    }
  });

  elements.filterClose.addEventListener('click', () => closeFilterPanel(elements));

  elements.categoryFilter.addEventListener('change', () => {
    state.filters.category = elements.categoryFilter.value;
    renderMain(state, elements);
  });

  elements.statusFilter.addEventListener('change', () => {
    state.filters.status = elements.statusFilter.value;
    renderMain(state, elements);
  });

  elements.favoritesFilter.addEventListener('change', () => {
    state.filters.favoritesOnly = elements.favoritesFilter.checked;
    renderMain(state, elements);
  });

  elements.clearFilters.addEventListener('click', () => {
    state.filters = {
      category: 'all',
      status: 'all',
      favoritesOnly: false
    };

    elements.categoryFilter.value = 'all';
    elements.statusFilter.value = 'all';
    elements.favoritesFilter.checked = false;
    renderMain(state, elements);
  });

  document.addEventListener('click', (event) => {
    if (elements.filterPanel.hidden || event.target.closest('.filter-wrapper')) {
      return;
    }

    closeFilterPanel(elements);
  });
}

function bindSearch(state, elements) {
  elements.mainSearch.addEventListener('input', () => {
    state.search = elements.mainSearch.value;
    renderMain(state, elements);
  });

  elements.sidebarSearch.addEventListener('input', () => {
    state.sidebarSearch = elements.sidebarSearch.value;
    renderSidebar(state, elements);
  });
}

function bindSidebar(state, elements) {
  elements.quickList.addEventListener('click', (event) => {
    const item = event.target.closest('[data-quick-id]');
    if (!item) {
      return;
    }

    selectApplication(item.dataset.quickId, state, elements, { closeDrawer: true });
  });

  elements.sidebarToggle.addEventListener('click', () => {
    if (elements.sidebar.classList.contains('is-open')) {
      closeSidebar(elements);
    } else {
      openSidebar(elements);
    }
  });

  elements.sidebarClose.addEventListener('click', () => closeSidebar(elements));
  elements.sidebarBackdrop.addEventListener('click', () => closeSidebar(elements));

  elements.selectedOpenButton.addEventListener('click', (event) => {
    const applicationId = elements.selectedOpenButton.dataset.applicationId;
    const application = findApplication(state, applicationId);

    if (!application || !hasValidUrl(application)) {
      event.preventDefault();
      return;
    }

    registerOpen(applicationId, state);
  });
}

function bindDialogs(state, elements) {
  elements.aboutButton.addEventListener('click', () => elements.aboutDialog.showModal());

  queryAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  [elements.detailsDialog, elements.aboutDialog].forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });
  });

  elements.detailsOpenButton.addEventListener('click', (event) => {
    const applicationId = elements.detailsOpenButton.dataset.applicationId;
    const application = findApplication(state, applicationId);

    if (!application || !hasValidUrl(application)) {
      event.preventDefault();
      return;
    }

    registerOpen(applicationId, state);
  });
}

function bindGlobalEvents(elements) {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (!elements.filterPanel.hidden) {
      closeFilterPanel(elements);
    }

    if (elements.sidebar.classList.contains('is-open')) {
      closeSidebar(elements);
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches && elements.sidebar.classList.contains('is-open')) {
      closeSidebar(elements, false);
    }
  });
}

export function initApplications() {
  const applications = createApplicationsCollection(applicationsData);
  const state = createState(applications);
  const elements = getElements();

  elements.version.textContent = `v${APP_CONFIG.version}`;

  renderFilterOptions(getFilterOptions(applications), {
    category: elements.categoryFilter,
    status: elements.statusFilter
  });

  bindGridEvents(state, elements);
  bindNavigation(state, elements);
  bindFilters(state, elements);
  bindSearch(state, elements);
  bindSidebar(state, elements);
  bindDialogs(state, elements);
  bindGlobalEvents(elements);

  elements.viewToggle.addEventListener('click', () => {
    state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    saveViewMode(state.viewMode);
    renderMain(state, elements);
  });

  renderAll(state, elements);
}
