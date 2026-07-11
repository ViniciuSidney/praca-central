// =============================
// Feature: Apps / UI
// =============================

import { $, $$, clearElement, hideElement, setText, showElement, toggleClass, toggleElement } from "../../shared/dom.js";
import { escapeHTML } from "../../shared/helpers.js";
import { formatCounter } from "../../shared/formatters.js";
import { canOpenApp } from "./apps.service.js";

const elements = {
  appsGrid: $("#appsGrid"),
  appsEmptyState: $("#appsEmptyState"),
  appSearchInput: $("#appSearchInput"),
  filterButtons: $$('[data-app-filter]'),
  clearFiltersButton: $("#clearAppFiltersButton"),
  visibleAppsBadge: $("#visibleAppsBadge"),
  totalAppsCounter: $("#totalAppsCounter"),
  availableAppsCounter: $("#availableAppsCounter"),

  detailsModal: $("#appDetailsModal"),
  detailsIcon: $("#appDetailsIcon"),
  detailsCategory: $("#appDetailsCategory"),
  detailsTitle: $("#appDetailsTitle"),
  detailsDescription: $("#appDetailsDescription"),
  detailsVersion: $("#appDetailsVersion"),
  detailsStatus: $("#appDetailsStatus"),
  detailsFeatures: $("#appDetailsFeatures"),
  detailsTags: $("#appDetailsTags"),
  openAppLink: $("#openAppFromModalLink"),
};

export function getAppsUIElements() {
  return elements;
}

export function renderApps(apps) {
  clearElement(elements.appsGrid);

  const hasResults = apps.length > 0;
  toggleElement(elements.appsGrid, hasResults);
  toggleElement(elements.appsEmptyState, !hasResults);

  if (!hasResults) {
    return;
  }

  const fragment = document.createDocumentFragment();

  apps.forEach((app, index) => {
    const isLastOddCard = apps.length % 2 === 1 && index === apps.length - 1;
    fragment.appendChild(createAppCard(app, { spanFullAtMedium: isLastOddCard }));
  });

  elements.appsGrid.appendChild(fragment);
}

export function renderCounters(counters) {
  setText(elements.totalAppsCounter, counters.total);
  setText(elements.availableAppsCounter, counters.available);
}

export function renderVisibleCounter(count) {
  setText(elements.visibleAppsBadge, formatCounter(count, "aplicação", "aplicações"));
}

export function setActiveCategory(category) {
  elements.filterButtons.forEach((button) => {
    const isActive = button.dataset.appFilter === category;
    toggleClass(button, "btn-secondary", isActive);
    toggleClass(button, "btn-outline", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export function resetSearch() {
  elements.appSearchInput.value = "";
}

export function openAppDetails(app) {
  const linkConfigured = canOpenApp(app);

  elements.detailsIcon.innerHTML = `<img src="${escapeHTML(app.icon)}" alt="" />`;
  elements.detailsIcon.dataset.accent = app.accent;

  setText(elements.detailsCategory, app.categoryLabel);
  setText(elements.detailsTitle, app.name);
  setText(elements.detailsDescription, app.description);
  setText(elements.detailsVersion, app.version);
  setText(elements.detailsStatus, app.statusLabel);

  elements.detailsFeatures.innerHTML = app.features
    .map((feature) => `<li><span aria-hidden="true">✓</span>${escapeHTML(feature)}</li>`)
    .join("");

  elements.detailsTags.innerHTML = app.tags
    .map((tag) => `<span class="badge badge-outline">${escapeHTML(tag)}</span>`)
    .join("");

  if (linkConfigured) {
    elements.openAppLink.href = app.url;
    elements.openAppLink.classList.remove("is-disabled");
    elements.openAppLink.removeAttribute("aria-disabled");
    elements.openAppLink.title = "Abrir aplicação em uma nova aba";
    elements.openAppLink.firstChild.textContent = "Abrir aplicação ";
  } else {
    elements.openAppLink.href = "#";
    elements.openAppLink.classList.add("is-disabled");
    elements.openAppLink.setAttribute("aria-disabled", "true");
    elements.openAppLink.title = "Configure o endereço em src/scripts/core/config.js";
    elements.openAppLink.firstChild.textContent = "Link pendente ";
  }

  showElement(elements.detailsModal);
  document.body.classList.add("has-open-modal");
}

export function closeAppDetails() {
  hideElement(elements.detailsModal);
  document.body.classList.remove("has-open-modal");
}

function createAppCard(app, { spanFullAtMedium = false } = {}) {
  const linkConfigured = canOpenApp(app);
  const card = document.createElement("article");

  card.className = `central-app-card central-app-card--${app.accent}`;
  card.classList.toggle("central-app-card--span-full", spanFullAtMedium);
  card.dataset.appId = app.id;

  const actionMarkup = linkConfigured
    ? `<a class="btn btn-primary" href="${escapeHTML(app.url)}" target="_blank" rel="noopener noreferrer">
         Abrir aplicação <span aria-hidden="true">↗</span>
       </a>`
    : `<button class="btn btn-primary is-disabled" type="button" disabled title="Configure o endereço em src/scripts/core/config.js">
         Link pendente
       </button>`;

  card.innerHTML = `
    <div class="central-app-card__top">
      <div class="central-app-card__icon">
        <img src="${escapeHTML(app.icon)}" alt="" />
      </div>

      <div class="central-app-card__badges">
        <span class="badge badge-success badge-dot">${escapeHTML(app.statusLabel)}</span>
        <span class="badge badge-outline">${escapeHTML(app.version)}</span>
      </div>
    </div>

    <div class="central-app-card__content">
      <span class="central-app-card__category">${escapeHTML(app.categoryLabel)}</span>
      <h3>${escapeHTML(app.name)}</h3>
      <p>${escapeHTML(app.description)}</p>
    </div>

    <div class="central-app-card__tags">
      ${app.tags.slice(0, 3).map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}
    </div>

    <footer class="central-app-card__footer">
      ${actionMarkup}
      <button class="btn btn-ghost" type="button" data-app-action="details" data-app-id="${escapeHTML(app.id)}">
        Ver detalhes
      </button>
    </footer>
  `;

  return card;
}
