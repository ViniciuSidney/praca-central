// =============================
// Feature: Apps / Service
// =============================

import {
  appMatchesCategory,
  appMatchesSearch,
  findAppById,
  getAppCatalog,
  isAppLinkConfigured,
} from "./apps.model.js";

export function getApps({ searchTerm = "", category = "all" } = {}) {
  return getAppCatalog().filter((app) => {
    return appMatchesSearch(app, searchTerm) && appMatchesCategory(app, category);
  });
}

export function getAppById(appId) {
  return findAppById(appId);
}

export function getAppCounters() {
  const apps = getAppCatalog();

  return {
    total: apps.length,
    available: apps.filter((app) => app.status === "available").length,
    linksConfigured: apps.filter(isAppLinkConfigured).length,
  };
}

export function canOpenApp(app) {
  return Boolean(app && isAppLinkConfigured(app));
}
