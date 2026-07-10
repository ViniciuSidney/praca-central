// =============================
// Praça Central — Service Worker
// Version: v0.2.0
// =============================

const CACHE_PREFIX = "praca-central";
const CACHE_VERSION = "v0.2.0";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./public/manifest.json",
  "./public/favicon.svg",
  "./public/icons/apple-touch-icon.png",
  "./public/icons/icon-192.png",
  "./public/icons/icon-512.png",
  "./public/icons/icon-maskable-512.png",
  "./src/assets/icons/time-task.svg",
  "./src/assets/icons/note-and-finish.svg",
  "./src/styles/main.css",
  "./src/styles/base/reset.css",
  "./src/styles/base/tokens.css",
  "./src/styles/base/typography.css",
  "./src/styles/themes/app-theme.css",
  "./src/styles/themes/light.css",
  "./src/styles/themes/dark.css",
  "./src/styles/base-layout/grid.css",
  "./src/styles/base-layout/header.css",
  "./src/styles/base-layout/sidebar.css",
  "./src/styles/base-layout/footer.css",
  "./src/styles/components/buttons.css",
  "./src/styles/components/inputs.css",
  "./src/styles/components/forms.css",
  "./src/styles/components/toggles.css",
  "./src/styles/components/panels.css",
  "./src/styles/components/cards.css",
  "./src/styles/components/modals.css",
  "./src/styles/components/alerts.css",
  "./src/styles/components/badges.css",
  "./src/styles/components/tables.css",
  "./src/styles/components/visual-variants.css",
  "./src/styles/layouts/layout-hub.css",
  "./src/styles/layouts/layout-shell.css",
  "./src/styles/layouts/layout-dashboard.css",
  "./src/styles/layouts/layout-form.css",
  "./src/styles/layouts/layout-wizard.css",
  "./src/styles/layouts/layout-master-detail.css",
  "./src/styles/layouts/layout-crud.css",
  "./src/styles/layouts/layout-gallery.css",
  "./src/styles/layouts/layout-focus.css",
  "./src/styles/layouts/layout-settings.css",
  "./src/styles/layouts/layout-report.css",
  "./src/styles/layouts/layout-search.css",
  "./src/styles/layouts/layout-empty-state.css",
  "./src/styles/pages/home.css",
  "./src/styles/pages/layout-preview.css",
  "./src/styles/utilities/spacing.css",
  "./src/styles/utilities/scrollbar.css",
  "./src/styles/utilities/states.css",
  "./src/styles/utilities/responsive.css",
  "./src/styles/utilities/helpers.css",
  "./src/scripts/main.js",
  "./src/scripts/app.js",
  "./src/scripts/core/config.js",
  "./src/scripts/core/constants.js",
  "./src/scripts/features/apps/apps.model.js",
  "./src/scripts/features/apps/apps.service.js",
  "./src/scripts/features/apps/apps.ui.js",
  "./src/scripts/features/apps/apps.controller.js",
  "./src/scripts/features/theme/theme.controller.js",
  "./src/scripts/features/pwa/pwa.service.js",
  "./src/scripts/features/pwa/pwa.ui.js",
  "./src/scripts/features/pwa/pwa.controller.js",
  "./src/scripts/shared/dom.js",
  "./src/scripts/shared/formatters.js",
  "./src/scripts/shared/helpers.js",
  "./src/scripts/shared/storage.js"
];

const APP_SHELL_URLS = APP_SHELL.map((path) => new URL(path, self.location.href).href);
const INDEX_URL = new URL("./index.html", self.location.href).href;
const ROOT_URL = new URL("./", self.location.href).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      removeOldCaches(),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    return (
      (await caches.match(request)) ||
      (await caches.match(INDEX_URL)) ||
      (await caches.match(ROOT_URL))
    );
  }
}

async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  const networkResponsePromise = fetch(request)
    .then(async (response) => {
      if (response.ok && response.type === "basic") {
        const cache = await caches.open(RUNTIME_CACHE);
        await cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await networkResponsePromise;

  if (networkResponse) {
    return networkResponse;
  }

  return new Response("Recurso indisponível offline.", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

async function removeOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = new Set([STATIC_CACHE, RUNTIME_CACHE]);

  await Promise.all(
    cacheNames
      .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && !currentCaches.has(cacheName))
      .map((cacheName) => caches.delete(cacheName))
  );
}
