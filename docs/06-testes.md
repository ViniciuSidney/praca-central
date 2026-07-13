# 06 — Testes

Os testes manuais oficiais estão em `tests/manual-tests.md`.
O resultado da auditoria responsiva automatizada está em `tests/responsive-test-report.md`.

## Ambientes prioritários

- desktop: 1920 × 1080, 1440 × 900 e 1366 × 768;
- tablet: 1024 × 768 e 768 × 1024;
- celular: 360 × 640, 390 × 844 e 412 × 915;
- celular em paisagem: 844 × 390;
- Chrome, Edge, Opera e navegador móvel real.

## Critérios centrais

- ausência de erros no console;
- ausência de rolagem global;
- rolagens internas funcionais;
- nenhum conteúdo extrapolando os painéis;
- alvos de toque com pelo menos 44 px;
- filtros e pesquisas combináveis;
- preferências persistidas;
- navegação completa por teclado;
- drawer, filtros e modais acessíveis;
- safe areas e teclado virtual sem ocultar controles essenciais.

## Auditoria responsiva atual

Os cenários 360 × 640, 390 × 844, 412 × 915, 768 × 1024 e 844 × 390 foram aprovados em emulação Chromium em 13/07/2026. A validação final em aparelho físico continua necessária para teclado virtual, notch e particularidades do navegador móvel.
