import { APP_CONFIG } from '../../core/config.js';
import { query } from '../../shared/dom.js';
import { readStorage, writeStorage } from '../../shared/storage.js';

const VALID_THEMES = new Set(['light', 'dark']);

function getInitialTheme() {
  const storedTheme = readStorage(APP_CONFIG.themeStorageKey);

  if (VALID_THEMES.has(storedTheme)) {
    return storedTheme;
  }

  return APP_CONFIG.defaultTheme;
}

function applyTheme(theme, elements) {
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;
  elements.button.setAttribute('aria-pressed', String(!isDark));
  elements.button.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  elements.button.title = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';
  elements.icon.textContent = isDark ? '☀' : '☾';
  elements.label.textContent = isDark ? 'Tema claro' : 'Tema escuro';

  writeStorage(APP_CONFIG.themeStorageKey, theme);
}

export function initTheme() {
  const elements = {
    button: query('#themeToggle'),
    icon: query('#themeToggleIcon'),
    label: query('#themeToggleLabel')
  };

  applyTheme(getInitialTheme(), elements);

  elements.button.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, elements);
  });
}
