// =============================
// Feature: PWA / Controller
// =============================

import {
  applyWaitingUpdate,
  getInstallMode,
  INSTALL_MODE,
  onConnectionChange,
  onInstallationStateChange,
  onInstallModeChange,
  onUpdateAvailable,
  refreshConnectionState,
  registerServiceWorker,
  requestInstall,
} from "./pwa.service.js";

import {
  closeInstallHelp,
  getPwaUIElements,
  hideUpdateAvailable,
  openInstallHelp,
  setConnectionState,
  setInstalledState,
  setInstallLoading,
  setInstallMode,
  showUpdateAvailable,
} from "./pwa.ui.js";

export function initPwaFeature() {
  const elements = getPwaUIElements();

  bindEvents(elements);
  bindStateObservers();

  registerServiceWorker()
    .then(() => refreshConnectionState())
    .catch((error) => {
      console.warn("Não foi possível registrar o service worker da Praça Central.", error);
      return refreshConnectionState();
    });
}

function bindEvents(elements) {
  elements.installButtons.forEach((button) => {
    button.addEventListener("click", handleInstallRequest);
  });

  elements.closeInstallHelpButton?.addEventListener("click", closeInstallHelp);
  elements.confirmInstallHelpButton?.addEventListener("click", closeInstallHelp);

  elements.installHelpModal?.addEventListener("click", (event) => {
    if (event.target === elements.installHelpModal) {
      closeInstallHelp();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeInstallHelp();
    }
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
  onInstallModeChange(setInstallMode);
  onInstallationStateChange(setInstalledState);
  onConnectionChange(setConnectionState);
  onUpdateAvailable((available) => {
    if (available) {
      showUpdateAvailable();
    }
  });
}

async function handleInstallRequest() {
  const mode = getInstallMode();

  if (mode === INSTALL_MODE.MANUAL) {
    openInstallHelp();
    return;
  }

  if (mode !== INSTALL_MODE.NATIVE) {
    return;
  }

  setInstallLoading(true);

  try {
    const result = await requestInstall();

    if (result.outcome !== "accepted") {
      setInstallLoading(false);
      setInstallMode(getInstallMode());
    }
  } catch (error) {
    console.warn("A instalação da Praça Central não pôde ser iniciada.", error);
    setInstallLoading(false);
    setInstallMode(getInstallMode());
  }
}
