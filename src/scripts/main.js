import { initApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initApp();
  } catch (error) {
    console.error('Não foi possível iniciar a Praça Central.', error);
  }
});
