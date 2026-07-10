// =============================
// Feature: PWA / Controller
// =============================

import {
  applyWaitingUpdate,
  onConnectionChange,
  onInstallationStateChange,
  onInstallAvailabilityChange,
  onUpdateAvailable,
  registerServiceWorker,
  requestInstall,
} from "./pwa.service.js";

import {
  getPwaUIElements,
  hideUpdateAvailable,
  setConnectionState,
  setInstalledState,
  setInstallAvailability,
  setInstallLoading,
  showUpdateAvailable,
} from "./pwa.ui.js";

export function initPwaFeature() {
  const elements = getPwaUIElements();

  bindEvents(elements);
  bindStateObservers();

  registerServiceWorker().catch((error) => {
    console.warn("Não foi possível registrar o service worker da Praça Central.", error);
  });
}

function bindEvents(elements) {
  elements.installButtons.forEach((button) => {
    button.addEventListener("click", handleInstallRequest);
  });

  elements.updateButton?.addEventListener("click", () => {
    const updateStarted = applyWaitingUpdate();

    if (updateStarted) {
      elements.updateButton.disabled = true;
      elements.updateButton.classList.add("is-loading");
      elements.updateButton.setAttribute("aria-busy", "true");
    }
  });

  elements.dismissUpdateButton?.addEventListener("click", hideUpdateAvailable);
}

function bindStateObservers() {
  onInstallAvailabilityChange(setInstallAvailability);
  onInstallationStateChange(setInstalledState);
  onConnectionChange(setConnectionState);
  onUpdateAvailable((available) => {
    if (available) {
      showUpdateAvailable();
    }
  });
}

async function handleInstallRequest() {
  setInstallLoading(true);

  try {
    const result = await requestInstall();

    if (result.outcome !== "accepted") {
      setInstallLoading(false);
    }
  } catch (error) {
    console.warn("A instalação da Praça Central não pôde ser iniciada.", error);
    setInstallLoading(false);
  }
}
