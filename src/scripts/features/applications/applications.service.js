import { APP_CONFIG } from '../../core/config.js';
import { readStorage, writeStorage } from '../../shared/storage.js';

const APPLICATION_ID_ALIASES = Object.freeze({
  'agenda-escolar': 'note-and-finish',
  'central-de-estudos': 'central-de-estudos-web'
});

function migrateApplicationIds(ids) {
  return ids.map((id) => APPLICATION_ID_ALIASES[id] ?? id);
}

export function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function hasValidUrl(application) {
  return Boolean(application?.url && application.url !== '#');
}

export function loadFavoriteIds(applications) {
  const stored = readStorage(APP_CONFIG.favoritesStorageKey);

  if (Array.isArray(stored)) {
    const migrated = migrateApplicationIds(stored).filter((id) =>
      applications.some((application) => application.id === id)
    );
    const unique = [...new Set(migrated)];

    if (JSON.stringify(unique) !== JSON.stringify(stored)) {
      writeStorage(APP_CONFIG.favoritesStorageKey, unique);
    }

    return new Set(unique);
  }

  const defaults = applications.filter((application) => application.favorite).map((application) => application.id);
  writeStorage(APP_CONFIG.favoritesStorageKey, defaults);
  return new Set(defaults);
}

export function saveFavoriteIds(favoriteIds) {
  writeStorage(APP_CONFIG.favoritesStorageKey, [...favoriteIds]);
}

export function loadRecentIds(applications) {
  const stored = readStorage(APP_CONFIG.recentStorageKey, []);

  if (!Array.isArray(stored)) {
    return [];
  }

  const migrated = migrateApplicationIds(stored).filter((id) =>
    applications.some((application) => application.id === id)
  );
  const unique = [...new Set(migrated)];

  if (JSON.stringify(unique) !== JSON.stringify(stored)) {
    writeStorage(APP_CONFIG.recentStorageKey, unique);
  }

  return unique;
}

export function registerRecentApplication(applicationId, currentRecentIds) {
  const next = [applicationId, ...currentRecentIds.filter((id) => id !== applicationId)].slice(
    0,
    APP_CONFIG.maxRecentItems
  );

  writeStorage(APP_CONFIG.recentStorageKey, next);
  return next;
}

export function loadViewMode() {
  const stored = readStorage(APP_CONFIG.viewStorageKey);
  return stored === 'list' || stored === 'grid' ? stored : APP_CONFIG.defaultView;
}

export function saveViewMode(viewMode) {
  writeStorage(APP_CONFIG.viewStorageKey, viewMode);
}

export function getFilterOptions(applications) {
  const categories = [...new Set(applications.map((application) => application.category))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR')
  );

  const statusesMap = new Map();
  applications.forEach((application) => statusesMap.set(application.status, application.statusLabel));

  return {
    categories,
    statuses: [...statusesMap.entries()].map(([value, label]) => ({ value, label }))
  };
}

function matchesSearch(application, query) {
  if (!query) {
    return true;
  }

  const searchable = normalizeSearchText(
    [
      application.name,
      application.shortDescription,
      application.description,
      application.category,
      application.statusLabel,
      application.version,
      ...application.tags,
      ...application.technologies
    ].join(' ')
  );

  return searchable.includes(query);
}

function applyNavigation(applications, navigation, favoriteIds, recentIds) {
  if (navigation === 'favorites') {
    return applications.filter((application) => favoriteIds.has(application.id));
  }

  if (navigation === 'development') {
    return applications.filter((application) => ['development', 'prototype'].includes(application.status));
  }

  if (navigation === 'recent') {
    return recentIds
      .map((id) => applications.find((application) => application.id === id))
      .filter(Boolean);
  }

  return [...applications];
}

export function filterApplications(applications, state) {
  const query = normalizeSearchText(state.search);
  let result = applyNavigation(applications, state.navigation, state.favoriteIds, state.recentIds);

  result = result.filter((application) => {
    const categoryMatch = state.filters.category === 'all' || application.category === state.filters.category;
    const statusMatch = state.filters.status === 'all' || application.status === state.filters.status;
    const favoriteMatch = !state.filters.favoritesOnly || state.favoriteIds.has(application.id);

    return categoryMatch && statusMatch && favoriteMatch && matchesSearch(application, query);
  });

  return result;
}

export function filterQuickApplications(applications, search) {
  const query = normalizeSearchText(search);

  if (!query) {
    return applications;
  }

  return applications.filter((application) => matchesSearch(application, query));
}
