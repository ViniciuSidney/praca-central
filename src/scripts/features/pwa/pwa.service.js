// =============================
// Feature: PWA / Service
// =============================

let deferredInstallPrompt = window.__pwaInstallPrompt ?? null;
let serviceWorkerRegistration = null;
let reloadOnControllerChange = false;
let lastKnownOnlineState = navigator.onLine;

const installModeListeners = new Set();
const updateAvailabilityListeners = new Set();
const connectionListeners = new Set();
const installationStateListeners = new Set();

export const INSTALL_MODE = {
  INSTALLED: "installed",
  NATIVE: "native",
  MANUAL: "manual",
};

window.addEventListener("pwa:install-prompt-captured", () => {
  deferredInstallPrompt = window.__pwaInstallPrompt;
  notifyInstallMode();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  window.__pwaInstallPrompt = event;
  notifyInstallMode();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  window.__pwaInstallPrompt = null;
  notifyInstallMode();
  notifyInstallationState(true);
});

window.addEventListener("online", () => {
  refreshConnectionState().catch(() => notifyConnectionState(false));
});

window.addEventListener("offline", () => {
  notifyConnectionState(false);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!reloadOnControllerChange) {
      return;
    }

    reloadOnControllerChange = false;
    window.location.reload();
  });
}

export function isPwaSupported() {
  return "serviceWorker" in navigator;
}

export function isInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export function canPromptInstall() {
  return Boolean(deferredInstallPrompt) && !isInstalled();
}

export function getInstallMode() {
  if (isInstalled()) {
    return INSTALL_MODE.INSTALLED;
  }

  return canPromptInstall() ? INSTALL_MODE.NATIVE : INSTALL_MODE.MANUAL;
}

export function isOnline() {
  return lastKnownOnlineState;
}

export async function registerServiceWorker() {
  if (!isPwaSupported()) {
    return null;
  }

  const workerUrl = new URL("../../../../service-worker.js", import.meta.url);
  serviceWorkerRegistration = await navigator.serviceWorker.register(workerUrl);

  observeRegistration(serviceWorkerRegistration);
  scheduleUpdateChecks(serviceWorkerRegistration);

  return serviceWorkerRegistration;
}

export async function requestInstall() {
  if (!deferredInstallPrompt) {
    return { outcome: "unavailable" };
  }

  const promptEvent = deferredInstallPrompt;
  deferredInstallPrompt = null;
  window.__pwaInstallPrompt = null;
  notifyInstallMode();

  await promptEvent.prompt();
  const choice = await promptEvent.userChoice;

  if (choice.outcome !== "accepted") {
    notifyInstallMode();
  }

  return choice;
}

export async function refreshConnectionState() {
  const online = await detectNetworkConnection();
  notifyConnectionState(online);
  return online;
}

export function applyWaitingUpdate() {
  const waitingWorker = serviceWorkerRegistration?.waiting;

  if (!waitingWorker) {
    return false;
  }

  reloadOnControllerChange = true;
  waitingWorker.postMessage({ type: "SKIP_WAITING" });
  return true;
}

export function checkForUpdates() {
  return serviceWorkerRegistration?.update() ?? Promise.resolve();
}

export function onInstallModeChange(listener) {
  installModeListeners.add(listener);
  listener(getInstallMode());

  return () => installModeListeners.delete(listener);
}

export function onUpdateAvailable(listener) {
  updateAvailabilityListeners.add(listener);

  if (serviceWorkerRegistration?.waiting && navigator.serviceWorker.controller) {
    listener(true);
  }

  return () => updateAvailabilityListeners.delete(listener);
}

export function onConnectionChange(listener) {
  connectionListeners.add(listener);
  listener(isOnline());

  return () => connectionListeners.delete(listener);
}

export function onInstallationStateChange(listener) {
  installationStateListeners.add(listener);
  listener(isInstalled());

  return () => installationStateListeners.delete(listener);
}

async function detectNetworkConnection() {
  if (!navigator.onLine) {
    return false;
  }

  const probeUrl = new URL("../../../../public/manifest.json", import.meta.url);
  probeUrl.searchParams.set("__network_check", Date.now().toString());

  try {
    const response = await fetch(probeUrl, {
      cache: "no-store",
      credentials: "same-origin",
    });

    return response.ok;
  } catch {
    return false;
  }
}

function observeRegistration(registration) {
  if (registration.waiting && navigator.serviceWorker.controller) {
    notifyUpdateAvailability(true);
  }

  registration.addEventListener("updatefound", () => {
    const installingWorker = registration.installing;

    if (!installingWorker) {
      return;
    }

    installingWorker.addEventListener("statechange", () => {
      const isReady = installingWorker.state === "installed";
      const isUpdate = Boolean(navigator.serviceWorker.controller);

      if (isReady && isUpdate) {
        notifyUpdateAvailability(true);
      }
    });
  });
}

function scheduleUpdateChecks(registration) {
  const updateWhenVisible = () => {
    if (document.visibilityState === "visible") {
      registration.update().catch(() => {});
      refreshConnectionState().catch(() => notifyConnectionState(false));
    }
  };

  document.addEventListener("visibilitychange", updateWhenVisible);
  window.addEventListener("focus", updateWhenVisible);

  window.setInterval(() => {
    registration.update().catch(() => {});
  }, 60 * 60 * 1000);
}

function notifyInstallMode() {
  const mode = getInstallMode();
  installModeListeners.forEach((listener) => listener(mode));
}

function notifyUpdateAvailability(available) {
  updateAvailabilityListeners.forEach((listener) => listener(available));
}

function notifyConnectionState(online) {
  lastKnownOnlineState = online;
  connectionListeners.forEach((listener) => listener(online));
}

function notifyInstallationState(installed) {
  installationStateListeners.forEach((listener) => listener(installed));
}
