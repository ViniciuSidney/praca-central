// =============================
// Feature: PWA / UI
// =============================

import { $, $$, hideElement, showElement, toggleElement } from "../../shared/dom.js";

const elements = {
  installButtons: $$('[data-pwa-install]'),
  installedBadge: $("#pwaInstalledBadge"),
  offlineBanner: $("#pwaOfflineBanner"),
  updateBanner: $("#pwaUpdateBanner"),
  updateButton: $("#pwaUpdateButton"),
  dismissUpdateButton: $("#pwaDismissUpdateButton"),
};

export function getPwaUIElements() {
  return elements;
}

export function setInstallAvailability(available) {
  elements.installButtons.forEach((button) => {
    toggleElement(button, available);
    button.disabled = !available;
  });
}

export function setInstallLoading(isLoading) {
  elements.installButtons.forEach((button) => {
    button.classList.toggle("is-loading", isLoading);
    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));
  });
}

export function setInstalledState(installed) {
  toggleElement(elements.installedBadge, installed);

  if (installed) {
    setInstallAvailability(false);
  }
}

export function setConnectionState(online) {
  toggleElement(elements.offlineBanner, !online);
  document.documentElement.dataset.connection = online ? "online" : "offline";
}

export function showUpdateAvailable() {
  showElement(elements.updateBanner);
}

export function hideUpdateAvailable() {
  hideElement(elements.updateBanner);
}
