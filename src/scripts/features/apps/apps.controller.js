// =============================
// Feature: Apps / Controller
// =============================

import { debounce } from "../../shared/helpers.js";
import { getAppById, getAppCounters, getApps } from "./apps.service.js";
import {
  closeAppDetails,
  getAppsUIElements,
  openAppDetails,
  renderApps,
  renderCounters,
  renderVisibleCounter,
  resetSearch,
  setActiveCategory,
} from "./apps.ui.js";

const state = {
  searchTerm: "",
  category: "all",
};

export function initAppsFeature() {
  const elements = getAppsUIElements();

  bindEvents(elements);
  updateView();
}

function bindEvents(elements) {
  elements.appSearchInput.addEventListener(
    "input",
    debounce((event) => {
      state.searchTerm = event.target.value;
      updateView();
    }, 180)
  );

  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.appFilter;
      updateView();
    });
  });

  elements.clearFiltersButton.addEventListener("click", () => {
    state.searchTerm = "";
    state.category = "all";
    resetSearch();
    updateView();
    elements.appSearchInput.focus();
  });

  elements.appsGrid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest('[data-app-action="details"]');

    if (!detailsButton) {
      return;
    }

    const app = getAppById(detailsButton.dataset.appId);
    if (app) {
      openAppDetails(app);
    }
  });

  document.querySelector("#closeAppDetailsButton").addEventListener("click", closeAppDetails);
  document.querySelector("#cancelAppDetailsButton").addEventListener("click", closeAppDetails);

  elements.detailsModal.addEventListener("click", (event) => {
    if (event.target === elements.detailsModal) {
      closeAppDetails();
    }
  });

  elements.openAppLink.addEventListener("click", (event) => {
    if (elements.openAppLink.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAppDetails();
    }
  });
}

function updateView() {
  const apps = getApps({
    searchTerm: state.searchTerm,
    category: state.category,
  });

  renderApps(apps);
  renderVisibleCounter(apps.length);
  renderCounters(getAppCounters());
  setActiveCategory(state.category);
}
