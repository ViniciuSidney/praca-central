function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeUrl(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : '#';
}

export function createApplication(source) {
  if (!source || typeof source !== 'object') {
    throw new TypeError('Aplicação inválida: era esperado um objeto.');
  }

  const id = String(source.id ?? '').trim();
  const name = String(source.name ?? '').trim();

  if (!id || !name) {
    throw new Error('Toda aplicação precisa possuir id e nome.');
  }

  return Object.freeze({
    id,
    name,
    shortDescription: String(source.shortDescription ?? source.description ?? '').trim(),
    description: String(source.description ?? source.shortDescription ?? '').trim(),
    status: String(source.status ?? 'development').trim(),
    statusLabel: String(source.statusLabel ?? source.status ?? 'Em desenvolvimento').trim(),
    category: String(source.category ?? 'Sem categoria').trim(),
    version: String(source.version ?? 'Sem versão').trim(),
    url: normalizeUrl(source.url),
    image: typeof source.image === 'string' && source.image.trim() ? source.image.trim() : null,
    initials: String(source.initials ?? name.slice(0, 2)).trim().slice(0, 3),
    technologies: normalizeStringArray(source.technologies),
    tags: normalizeStringArray(source.tags),
    favorite: Boolean(source.favorite),
    updatedAt: String(source.updatedAt ?? '').trim()
  });
}

export function createApplicationsCollection(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('A lista de aplicações precisa ser um array.');
  }

  const ids = new Set();

  return data.map((item) => {
    const application = createApplication(item);

    if (ids.has(application.id)) {
      throw new Error(`ID de aplicação duplicado: ${application.id}`);
    }

    ids.add(application.id);
    return application;
  });
}
