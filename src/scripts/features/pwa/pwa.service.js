// =============================
// Feature: PWA / Service
// =============================

let deferredInstallPrompt = null;
let serviceWorkerRegistration = null;
let reloadOnControllerChange = false;

const installAvailabilityListeners = new Set();
const updateAvailabilityListeners = new Set();
const connectionListeners = new Set();
const installationStateListeners = new Set();

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  notifyInstallAvailability();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  notifyInstallAvailability();
  notifyInstallationState(true);
});

window.addEventListener("online", notifyConnectionState);
window.addEventListener("offline", notifyConnectionState);

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

export function isOnline() {
  return navigator.onLine;
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
  notifyInstallAvailability();

  await promptEvent.prompt();
  const choice = await promptEvent.userChoice;

  return choice;
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

export function onInstallAvailabilityChange(listener) {
  installAvailabilityListeners.add(listener);
  listener(canPromptInstall());

  return () => installAvailabilityListeners.delete(listener);
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
    }
  };

  document.addEventListener("visibilitychange", updateWhenVisible);
  window.addEventListener("focus", updateWhenVisible);

  window.setInterval(() => {
    registration.update().catch(() => {});
  }, 60 * 60 * 1000);
}

function notifyInstallAvailability() {
  const available = canPromptInstall();
  installAvailabilityListeners.forEach((listener) => listener(available));
}

function notifyUpdateAvailability(available) {
  updateAvailabilityListeners.forEach((listener) => listener(available));
}

function notifyConnectionState() {
  const online = isOnline();
  connectionListeners.forEach((listener) => listener(online));
}

function notifyInstallationState(installed) {
  installationStateListeners.forEach((listener) => listener(installed));
}
