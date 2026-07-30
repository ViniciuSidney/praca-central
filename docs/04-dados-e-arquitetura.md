# 04 — Dados e Arquitetura

## Fonte de dados
As aplicações são cadastradas em `src/scripts/data/applications.js`.

## Feature de aplicações
- `applications.model.js`: normalização e validação;
- `applications.service.js`: pesquisa, filtros e localStorage;
- `applications.ui.js`: templates e renderização;
- `applications.controller.js`: estado, eventos, overlays, acessibilidade e coordenação responsiva.

## Persistência local
Chaves utilizadas:
- `praca-central:theme`;
- `praca-central:view`;
- `praca-central:favorites`;
- `praca-central:recent`.

## Layout fixo
A estrutura principal usa CSS Grid com três linhas:

```css
grid-template-rows: auto minmax(0, 1fr) auto;
```

O uso de `min-height: 0` nas áreas internas impede que o conteúdo expanda a página e garante a rolagem apenas nos painéis previstos.

## Viewport móvel
- `viewport-fit=cover` habilita o uso correto de safe areas;
- `env(safe-area-inset-*)` protege conteúdo de notch e barras do sistema;
- `--app-viewport-height` é atualizado a partir de `visualViewport`;
- o drawer é ativado em até 900 px;
- a galeria muda para uma coluna somente em até 700 px;
- filtros usam bottom sheet em até 700 px ou em telas de toque com altura até 520 px.

## Acessibilidade de overlays
- drawer fechado utiliza `inert` e `aria-hidden`;
- drawer e bottom sheet contêm o foco quando abertos;
- Esc fecha o overlay prioritário;
- o foco retorna ao controle de abertura após o fechamento;
- modais usam o elemento nativo `dialog`.

## Normalização do repositório
O arquivo `.gitattributes` padroniza arquivos de texto em LF e marca imagens como binárias, reduzindo diffs artificiais entre sistemas operacionais.

## Integrações atuais

O cadastro inclui o Concept Compass com identificador `concept-compass`, ícone local e URL pública com rota inicial por fragmento (`#/`).
