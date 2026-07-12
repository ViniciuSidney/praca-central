# Modelo de Projeto

Modelo base para criação de aplicações web com organização estrutural, documentação, Design System, componentes reutilizáveis, templates HTML, layouts prontos e uma aplicação exemplo funcional.

Este projeto funciona como um **starter kit pessoal**: uma base para copiar, adaptar e iniciar novas aplicações com mais consistência, velocidade e clareza.

---

## Objetivo

O objetivo deste modelo é evitar que cada nova aplicação comece do zero.

Ele reúne:

- estrutura de pastas organizada;
- documentação inicial;
- Design System com tokens e temas;
- componentes CSS reutilizáveis;
- estados e variações visuais de componentes;
- layouts CSS reutilizáveis;
- templates HTML de componentes e layouts;
- página de preview visual;
- aplicação exemplo funcional;
- arquitetura JavaScript por feature;
- utilitários compartilhados para DOM, storage, validação e formatação.

---

## Como usar este modelo

Ao iniciar uma aplicação real:

1. Copie a pasta deste modelo.
2. Renomeie a pasta para o nome do novo projeto.
3. Atualize este `README.md` para descrever a aplicação real.
4. Atualize `src/styles/themes/app-theme.css` com a identidade visual do projeto.
5. Substitua o conteúdo do `index.html` pela tela inicial real da aplicação.
6. Use `layout-preview.html` para testar componentes, layouts e temas.
7. Use `src/templates` como biblioteca de moldes HTML copiáveis.
8. Remova, renomeie ou adapte a feature `example`.
9. Crie as features reais dentro de `src/scripts/features`.
10. Atualize a documentação em `docs` conforme o projeto evoluir.

---

## Estrutura principal

```text
modelo-de-projeto
├── docs
├── public
├── src
│   ├── assets
│   ├── scripts
│   │   ├── core
│   │   ├── features
│   │   ├── shared
│   │   ├── app.js
│   │   └── main.js
│   ├── styles
│   │   ├── base
│   │   ├── base-layout
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── themes
│   │   ├── utilities
│   │   └── main.css
│   └── templates
│       ├── components
│       ├── layouts
│       └── README.md
├── tests
├── index.html
├── layout-preview.html
├── .gitignore
└── README.md
```

---

## Pastas importantes

### `docs`

Guarda a documentação do projeto, como visão geral, requisitos, arquitetura, roadmap, testes, changelog, guia de layouts, Design System e guia de criação de features.

### `public`

Guarda arquivos públicos do projeto, como `favicon.svg` e `manifest.json`.

### `src/assets`

Guarda recursos estáticos, como imagens, ícones e fontes.

### `src/styles`

Guarda toda a base visual do projeto.

Principais divisões:

- `base`: reset, tokens e tipografia;
- `base-layout`: estruturas globais como header, footer, sidebar e grid;
- `components`: estilos de componentes reutilizáveis;
- `layouts`: estilos de layouts completos de tela;
- `pages`: estilos específicos de páginas reais;
- `themes`: identidade visual e temas claro/escuro;
- `utilities`: classes utilitárias, estados, responsividade e scrollbar.

### `src/templates`

Guarda templates HTML copiáveis.

- `templates/components`: moldes de componentes menores;
- `templates/layouts`: moldes de telas completas.

Esses arquivos não são páginas finais. Eles servem como referência para copiar e adaptar em telas reais.

### `src/scripts`

Guarda a lógica JavaScript da aplicação.

- `core`: base global da aplicação;
- `shared`: funções reutilizáveis;
- `features`: funcionalidades específicas;
- `app.js`: inicialização da aplicação;
- `main.js`: ponto de entrada.

---

## Aplicação exemplo

O arquivo `index.html` contém uma aplicação exemplo: **Gerenciador de Itens**.

Ela demonstra:

- criação de itens;
- listagem em cards;
- edição;
- duplicação;
- exclusão com confirmação;
- busca;
- filtros por status;
- contadores;
- estado vazio;
- feedback visual;
- persistência com `localStorage`;
- arquitetura JavaScript usando `model`, `service`, `ui` e `controller`.

Em uma aplicação real, o conteúdo do `index.html` pode ser substituído pela tela inicial verdadeira do projeto.

---

## Preview visual

O arquivo `layout-preview.html` funciona como vitrine visual da biblioteca.

Ele permite visualizar:

- componentes base;
- estados de componentes;
- variações visuais;
- layouts disponíveis;
- filtros e busca de layouts;
- tema claro/escuro;
- exemplos de uso da base visual.

Recomendação: mantenha o `layout-preview.html` durante o desenvolvimento da aplicação real para testar rapidamente mudanças visuais.

---

## Design System

A base visual é organizada com variáveis CSS e arquivos separados por responsabilidade.

Principais arquivos:

```text
src/styles/base/tokens.css
src/styles/themes/app-theme.css
src/styles/themes/light.css
src/styles/themes/dark.css
src/styles/components
src/styles/layouts
src/styles/utilities
```

Regra principal:

```text
Tokens definem valores base.
Tema define identidade visual.
Componentes usam variáveis.
Layouts organizam a tela.
Páginas adaptam casos específicos.
```

---

## Componentes

Componentes principais disponíveis:

- buttons;
- inputs;
- forms;
- toggles;
- panels;
- cards;
- modals;
- alerts;
- badges;
- tables.

Também existem:

- estados reutilizáveis em `utilities/states.css`;
- variações visuais em `components/visual-variants.css`.

Exemplo:

```html
<button class="btn btn-primary btn-glass is-loading">
  Salvando
</button>
```

Neste exemplo:

- `btn`: componente;
- `btn-primary`: variante semântica;
- `btn-glass`: visual;
- `is-loading`: estado.

---

## Layouts disponíveis

Templates HTML de layouts disponíveis em `src/templates/layouts`:

| Código | Layout | Uso principal |
|---|---|---|
| L01 | Hub Inicial | Tela inicial e atalhos |
| L02 | Shell Modular | Tela de trabalho com painéis |
| L03 | Dashboard Analítico | Indicadores e dados |
| L04 | Formulário Guiado | Cadastro e edição |
| L05 | Wizard | Processo em etapas |
| L06 | Mestre-Detalhe | Lista com detalhe |
| L07 | Gerenciador CRUD | Gestão de registros |
| L09 | Galeria de Cards | Listagem visual |
| L13 | Focus Mode | Foco em uma ação |
| L19 | Settings | Configurações |
| L20 | Report | Relatórios e resultados |
| L23 | Search | Busca e filtros |
| L25 | Empty State | Tela sem dados |

---

## Arquitetura JavaScript por feature

Cada feature deve seguir este padrão:

```text
src/scripts/features/nome-da-feature
├── nome-da-feature.model.js
├── nome-da-feature.service.js
├── nome-da-feature.ui.js
└── nome-da-feature.controller.js
```

Função de cada arquivo:

- `model`: regras de dados, validações e normalizações;
- `service`: persistência e operações de dados;
- `ui`: renderização, DOM, modais e feedback visual;
- `controller`: eventos, fluxo e integração da feature.

A pasta `src/scripts/shared` contém utilitários reutilizáveis para várias features.

---

## Camada shared

Arquivos compartilhados disponíveis:

```text
src/scripts/shared/dom.js
src/scripts/shared/storage.js
src/scripts/shared/formatters.js
src/scripts/shared/validators.js
src/scripts/shared/helpers.js
```

Uso recomendado:

- `dom.js`: manipulação de DOM;
- `storage.js`: localStorage;
- `formatters.js`: datas, contadores e textos;
- `validators.js`: validações genéricas;
- `helpers.js`: IDs, sanitização, escape HTML, debounce e busca normalizada.

---

## Documentação recomendada

Documentos principais:

```text
docs/00-guia-de-documentacao-e-arquitetura.md
docs/01-visao-do-projeto.md
docs/02-requisitos-e-escopo.md
docs/03-fluxos-e-telas.md
docs/04-dados-e-arquitetura.md
docs/05-roadmap.md
docs/06-testes.md
docs/07-changelog.md
docs/08-guia-de-layouts.md
docs/09-mapa-componentes-classes-css.md
docs/10-design-system.md
docs/11-guia-de-criacao-de-feature.md
docs/12-checklist-novo-projeto.md
```

---

## Testes manuais básicos

Antes de considerar uma versão pronta, testar:

- abrir `index.html` com Live Server;
- criar item;
- editar item;
- duplicar item;
- excluir item;
- pesquisar item;
- filtrar por status;
- recarregar e verificar persistência;
- abrir `layout-preview.html`;
- testar filtros de layouts;
- testar tema claro/escuro;
- verificar responsividade básica;
- abrir templates principais.

---

## Quando criar uma aplicação real

Ao copiar este modelo para um novo projeto, normalmente você deve:

- substituir o conteúdo do `index.html`;
- alterar nome, descrição e identidade visual;
- atualizar `README.md`;
- adaptar ou remover a feature `example`;
- manter `layout-preview.html` como ferramenta de teste visual;
- manter `src/templates` como biblioteca de moldes;
- criar features reais usando o padrão `model/service/ui/controller`.

---

## Status

```text
Versão atual: v0.1
Status: modelo base concluído
Tipo: starter kit web pessoal
```

---

## Observação final

Este projeto não é apenas uma estrutura de pastas. Ele é uma base reutilizável para acelerar a criação de aplicações web com mais organização, consistência visual e clareza arquitetural.
