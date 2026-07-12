import { hasValidUrl } from './applications.service.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createImage(application, className, fallbackClassName) {
  if (application.image) {
    const classAttribute = className ? ` class="${escapeHtml(className)}"` : '';
    return `<img${classAttribute} src="${escapeHtml(application.image)}" alt="Ícone de ${escapeHtml(application.name)}" />`;
  }

  return `<span class="${fallbackClassName}" aria-hidden="true">${escapeHtml(application.initials)}</span>`;
}

function createOpenAction(application, className = 'btn btn-primary') {
  if (!hasValidUrl(application)) {
    return `<span class="${className}" aria-disabled="true">Indisponível</span>`;
  }

  return `
    <a
      class="${className}"
      href="${escapeHtml(application.url)}"
      target="_blank"
      rel="noopener noreferrer"
      data-action="open"
      data-application-id="${escapeHtml(application.id)}"
      aria-label="Abrir ${escapeHtml(application.name)} em uma nova aba"
    >
      Abrir
      <span aria-hidden="true">↗</span>
    </a>
  `;
}

export function createApplicationCard(application, context) {
  const isFavorite = context.favoriteIds.has(application.id);
  const isSelected = context.selectedId === application.id;

  return `
    <article
      class="application-card${isSelected ? ' is-selected' : ''}"
      data-application-id="${escapeHtml(application.id)}"
      tabindex="0"
      aria-label="Selecionar ${escapeHtml(application.name)}"
    >
      <div class="application-card-main">
        <div class="application-card-media">
          ${createImage(application, 'application-card-image', 'application-card-fallback')}
          <button
            class="favorite-button${isFavorite ? ' is-favorite' : ''}"
            type="button"
            data-action="favorite"
            data-application-id="${escapeHtml(application.id)}"
            aria-pressed="${String(isFavorite)}"
            aria-label="${isFavorite ? 'Remover' : 'Adicionar'} ${escapeHtml(application.name)} ${isFavorite ? 'dos' : 'aos'} favoritos"
            title="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
          >
            <span aria-hidden="true">${isFavorite ? '★' : '☆'}</span>
          </button>
        </div>

        <div class="application-card-copy">
          <header class="application-card-header">
            <h2 class="application-card-title" title="${escapeHtml(application.name)}">
              ${escapeHtml(application.name)}
            </h2>
            <span class="application-card-version">${escapeHtml(application.version)}</span>
          </header>

          <p class="application-card-description">${escapeHtml(application.shortDescription)}</p>

          <div class="application-card-meta">
            <span class="status-badge status-${escapeHtml(application.status)}">${escapeHtml(application.statusLabel)}</span>
            <span class="application-card-category">${escapeHtml(application.category)}</span>
          </div>
        </div>
      </div>

      <footer class="application-card-actions">
        ${createOpenAction(application)}
        <button
          class="btn btn-secondary"
          type="button"
          data-action="details"
          data-application-id="${escapeHtml(application.id)}"
        >
          Detalhes
        </button>
      </footer>
    </article>
  `;
}

function getEmptyState(navigation, hasSearchOrFilters) {
  if (navigation === 'favorites' && !hasSearchOrFilters) {
    return {
      title: 'Nenhuma aplicação favorita',
      message: 'Use o botão de estrela nos cards para montar seus acessos favoritos.'
    };
  }

  if (navigation === 'recent' && !hasSearchOrFilters) {
    return {
      title: 'Nenhuma aplicação aberta recentemente',
      message: 'As aplicações acessadas aparecerão aqui automaticamente.'
    };
  }

  return {
    title: 'Nenhuma aplicação encontrada',
    message: 'Altere a pesquisa, a seção atual ou os filtros aplicados.'
  };
}

export function renderApplications(applications, elements, context) {
  elements.grid.dataset.view = context.viewMode;
  elements.resultSummary.textContent = `${applications.length} ${applications.length === 1 ? 'aplicação' : 'aplicações'}`;

  if (applications.length === 0) {
    const empty = getEmptyState(context.navigation, context.hasSearchOrFilters);
    elements.grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon" aria-hidden="true">⌕</span>
        <h2>${escapeHtml(empty.title)}</h2>
        <p>${escapeHtml(empty.message)}</p>
      </div>
    `;
    return;
  }

  elements.grid.innerHTML = applications.map((application) => createApplicationCard(application, context)).join('');
}

export function renderSelectedApplication(application, elements) {
  elements.selected.innerHTML = `
    <div class="selected-application-icon">
      ${createImage(application, '', 'selected-application-fallback')}
    </div>
    <h2 class="selected-application-name" title="${escapeHtml(application.name)}">${escapeHtml(application.name)}</h2>
    <span class="status-badge status-${escapeHtml(application.status)}">${escapeHtml(application.statusLabel)}</span>
    <p class="selected-application-description">${escapeHtml(application.shortDescription)}</p>
  `;

  const available = hasValidUrl(application);
  elements.openButton.href = available ? application.url : '#';
  elements.openButton.dataset.applicationId = application.id;
  elements.openButton.setAttribute('aria-disabled', String(!available));
  elements.openButton.tabIndex = available ? 0 : -1;
  elements.openButton.innerHTML = available
    ? 'Abrir aplicação <span aria-hidden="true">↗</span>'
    : 'Aplicação indisponível';
}

export function renderQuickList(applications, elements, selectedId) {
  elements.count.textContent = String(applications.length);

  if (applications.length === 0) {
    elements.list.innerHTML = '<p class="sidebar-empty">Nenhum atalho corresponde à pesquisa.</p>';
    return;
  }

  elements.list.innerHTML = applications
    .map(
      (application) => `
        <button
          class="quick-item${application.id === selectedId ? ' is-selected' : ''}"
          type="button"
          data-quick-id="${escapeHtml(application.id)}"
        >
          <span class="quick-item-icon">
            ${createImage(application, '', 'quick-item-fallback')}
          </span>
          <span class="quick-item-copy">
            <span class="quick-item-name">${escapeHtml(application.name)}</span>
            <span class="quick-item-category">${escapeHtml(application.category)}</span>
          </span>
          <span class="quick-item-arrow" aria-hidden="true">›</span>
        </button>
      `
    )
    .join('');
}

export function renderFilterOptions(options, elements) {
  elements.category.innerHTML = [
    '<option value="all">Todas as categorias</option>',
    ...options.categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
  ].join('');

  elements.status.innerHTML = [
    '<option value="all">Todos os status</option>',
    ...options.statuses.map(
      (status) => `<option value="${escapeHtml(status.value)}">${escapeHtml(status.label)}</option>`
    )
  ].join('');
}

export function renderDetails(application, elements) {
  elements.title.textContent = application.name;
  elements.body.innerHTML = `
    <div class="details-layout">
      <div class="details-icon">
        ${createImage(application, '', 'details-fallback')}
      </div>

      <div class="details-content">
        <div class="details-meta">
          <span class="status-badge status-${escapeHtml(application.status)}">${escapeHtml(application.statusLabel)}</span>
          <span class="meta-chip">${escapeHtml(application.category)}</span>
          <span class="meta-chip">${escapeHtml(application.version)}</span>
        </div>

        <p>${escapeHtml(application.description)}</p>

        <div>
          <span class="eyebrow">Tecnologias</span>
          <div class="details-technologies">
            ${
              application.technologies.length
                ? application.technologies
                    .map((technology) => `<span class="meta-chip">${escapeHtml(technology)}</span>`)
                    .join('')
                : '<span class="meta-chip">Não informado</span>'
            }
          </div>
        </div>
      </div>
    </div>
  `;

  const available = hasValidUrl(application);
  elements.openButton.href = available ? application.url : '#';
  elements.openButton.dataset.applicationId = application.id;
  elements.openButton.setAttribute('aria-disabled', String(!available));
  elements.openButton.tabIndex = available ? 0 : -1;
  elements.openButton.innerHTML = available
    ? 'Abrir aplicação <span aria-hidden="true">↗</span>'
    : 'Aplicação indisponível';
}
