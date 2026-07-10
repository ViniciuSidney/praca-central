// =============================
// App
// =============================

import { initAppsFeature } from "./features/apps/apps.controller.js";
import { initThemeFeature } from "./features/theme/theme.controller.js";

export function initApp() {
  initThemeFeature();
  initAppsFeature();
  initAboutModal();
  initGlobalUI();
}

function initAboutModal() {
  const modal = document.querySelector("#aboutModal");
  const openButton = document.querySelector("#openAboutButton");
  const closeButtons = [
    document.querySelector("#closeAboutButton"),
    document.querySelector("#confirmAboutButton"),
  ];

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("has-open-modal");
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("has-open-modal");
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function initGlobalUI() {
  const yearElement = document.querySelector("#currentYear");
  yearElement.textContent = new Date().getFullYear();
}
