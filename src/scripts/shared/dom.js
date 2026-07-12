export function query(selector, parent = document) {
  const element = parent.querySelector(selector);

  if (!element) {
    throw new Error(`Elemento não encontrado: ${selector}`);
  }

  return element;
}

export function queryAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
