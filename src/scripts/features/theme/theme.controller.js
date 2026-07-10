// =============================
// Feature: Theme / Controller
// =============================

import { APP_META } from "../../core/config.js";
import { STORAGE_KEYS } from "../../core/constants.js";
import { getStorageItem, setStorageItem, storageKey } from "../../shared/storage.js";

const THEME_STORAGE_KEY = storageKey(APP_META.storageNamespace, STORAGE_KEYS.THEME);
const THEMES = ["dark", "light"];

export function initThemeFeature() {
  const button = document.querySelector("#themeToggleButton");
  const label = document.querySelector("#themeToggleLabel");
  const icon = document.querySelector("#themeToggleIcon");

  if (!button || !label || !icon) {
    return;
  }

  const savedTheme = getStorageItem(THEME_STORAGE_KEY, "dark");
  const initialTheme = THEMES.includes(savedTheme) ? savedTheme : "dark";

  applyTheme(initialTheme, { button, label, icon });

  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme, { button, label, icon });
    setStorageItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme, elements) {
  const isLight = theme === "light";

  document.documentElement.dataset.theme = theme;
  elements.button.setAttribute("aria-pressed", String(isLight));
  elements.label.textContent = isLight ? "Tema escuro" : "Tema claro";
  elements.icon.textContent = isLight ? "☾" : "☀";
}
