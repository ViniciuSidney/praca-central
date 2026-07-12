export function readStorage(key, fallback = null) {
  try {
    const rawValue = localStorage.getItem(key);

    if (rawValue === null) {
      return fallback;
    }

    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Não foi possível ler o armazenamento: ${key}.`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Não foi possível salvar no armazenamento: ${key}.`, error);
  }
}
