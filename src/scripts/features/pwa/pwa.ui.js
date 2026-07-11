// =============================
// Feature: PWA / UI
// =============================

import { $, $$, hideElement, showElement, toggleElement } from "../../shared/dom.js";
import { INSTALL_MODE } from "./pwa.service.js";

const elements = {
  installButtons: $$('[data-pwa-install]'),
  installedBadge: $("#pwaInstalledBadge"),
  installHelpModal: $("#pwaInstallHelpModal"),
  closeInstallHelpButton: $("#closePwaInstallHelpButton"),
  confirmInstallHelpButton: $("#confirmPwaInstallHelpButton"),
  offlineBanner: $("#pwaOfflineBanner"),
  updateBanner: $("#pwaUpdateBanner"),
  updateButton: $("#pwaUpdateButton"),
  dismissUpdateButton: $("#pwaDismissUpdateButton"),
};

export function getPwaUIElements() {
  return elements;
}

export function setInstallMode(mode) {
  const installed = mode === INSTALL_MODE.INSTALLED;
  const nativePrompt = mode === INSTALL_MODE.NATIVE;

  elements.installButtons.forEach((button) => {
    toggleElement(button, !installed);
    button.disabled = installed;
    button.dataset.installMode = mode;

    const label = button.querySelector("[data-pwa-install-label]");
    const icon = button.querySelector("[data-pwa-install-icon]");

    if (label) {
      label.textContent = nativePrompt
        ? button.dataset.nativeLabel || "Instalar"
        : button.dataset.manualLabel || "Como instalar";
    }

    if (icon) {
      icon.textContent = nativePrompt ? "⇩" : "?";
    }
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
    setInstallMode(INSTALL_MODE.INSTALLED);
  }
}

export function openInstallHelp() {
  showElement(elements.installHelpModal);
  document.body.classList.add("has-open-modal");
  elements.closeInstallHelpButton?.focus();
}

export function closeInstallHelp() {
  hideElement(elements.installHelpModal);
  document.body.classList.remove("has-open-modal");
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
