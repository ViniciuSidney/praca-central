import { initApplications } from './features/applications/applications.controller.js';
import { initTheme } from './features/theme/theme.controller.js';

export function initApp() {
  initTheme();
  initApplications();
}
