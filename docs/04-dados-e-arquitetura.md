# 04 — Dados e Arquitetura

## Fonte de dados
As aplicações são cadastradas em `src/scripts/data/applications.js`.

## Feature de aplicações
- `applications.model.js`: normalização e validação;
- `applications.service.js`: pesquisa, filtros e localStorage;
- `applications.ui.js`: templates e renderização;
- `applications.controller.js`: estado, eventos e coordenação.

## Persistência local
Chaves utilizadas:
- `praca-central:theme`;
- `praca-central:view`;
- `praca-central:favorites`;
- `praca-central:recent`.

## Layout
A estrutura principal usa CSS Grid com três linhas:

```css
grid-template-rows: auto minmax(0, 1fr) auto;
```

O uso de `min-height: 0` nas áreas internas impede que o conteúdo expanda a página e garante a rolagem apenas nos painéis previstos.
