// =============================
// Feature: Apps / Model
// =============================

import { APP_URLS } from "../../core/config.js";
import { APP_CATEGORIES, APP_STATUS } from "../../core/constants.js";
import { normalizeSearch } from "../../shared/helpers.js";

const APP_CATALOG = [
  {
    id: "time-task",
    name: "Time Task",
    shortName: "TT",
    category: APP_CATEGORIES.FOCUS,
    categoryLabel: "Foco e produtividade",
    description:
      "Transforme uma intenção ampla em uma missão clara, com tempo definido, microtarefas e acompanhamento do progresso.",
    version: "v0.1",
    status: APP_STATUS.AVAILABLE,
    statusLabel: "Disponível",
    url: APP_URLS.timeTask,
    accent: "teal",
    icon: "./src/assets/icons/time-task.svg",
    tags: ["Timer", "Microtarefas", "Foco", "LocalStorage"],
    features: [
      "Timer regressivo com pausa, retomada e finalização.",
      "Missões organizadas em microtarefas curtas.",
      "Histórico de sessões finalizadas.",
      "Modelos reutilizáveis para missões frequentes.",
    ],
  },
  {
    id: "note-and-finish",
    name: "Note and Finish",
    shortName: "NF",
    category: APP_CATEGORIES.ORGANIZATION,
    categoryLabel: "Organização e planejamento",
    description:
      "Organize atividades, trabalhos, avaliações e etapas em uma agenda prática voltada para concluir o que importa.",
    version: "v0.2",
    status: APP_STATUS.AVAILABLE,
    statusLabel: "Disponível",
    url: APP_URLS.noteAndFinish,
    accent: "violet",
    icon: "./src/assets/icons/note-and-finish.svg",
    tags: ["Atividades", "Prazos", "Etapas", "Planejamento"],
    features: [
      "Cadastro e acompanhamento de atividades.",
      "Organização por prazos, prioridades e status.",
      "Etapas internas para dividir tarefas maiores.",
      "Foco de hoje e ações rápidas para o dia a dia.",
    ],
  },
];

export function getAppCatalog() {
  return APP_CATALOG.map((app) => ({ ...app, tags: [...app.tags], features: [...app.features] }));
}

export function findAppById(appId) {
  return APP_CATALOG.find((app) => app.id === appId) || null;
}

export function appMatchesSearch(app, searchTerm) {
  const normalizedTerm = normalizeSearch(searchTerm);

  if (!normalizedTerm) {
    return true;
  }

  const searchableContent = normalizeSearch(
    [app.name, app.categoryLabel, app.description, ...app.tags].join(" ")
  );

  return searchableContent.includes(normalizedTerm);
}

export function appMatchesCategory(app, category) {
  return category === "all" || app.category === category;
}

export function isAppLinkConfigured(app) {
  return typeof app.url === "string" && /^https?:\/\//i.test(app.url.trim());
}
