# Praça Central

Central pessoal de aplicações web criada para reunir, apresentar e facilitar o acesso a ferramentas independentes publicadas no GitHub Pages.

A **Praça Central** funciona como uma porta de entrada: cada aplicação continua existindo e evoluindo em seu próprio projeto, enquanto a Central organiza os caminhos em uma experiência única, clara e responsiva.

## Versão atual

**v0.1 — Fundação da Praça**

A primeira versão apresenta duas aplicações:

- **Time Task** — foco imediato com timer, missão e microtarefas;
- **Note and Finish** — organização de atividades, prazos e etapas.

## Funcionalidades

- apresentação visual da Central;
- galeria de aplicações;
- busca por nome, descrição, categoria ou tag;
- filtros por categoria;
- modal com detalhes de cada aplicação;
- contador de aplicações disponíveis;
- tema claro e escuro com preferência salva no navegador;
- interface responsiva;
- estado vazio para buscas sem resultado;
- estrutura preparada para adicionar novas aplicações.

## Configuração dos links

Os endereços das aplicações ficam centralizados em:

```text
src/scripts/core/config.js
```

Preencha os campos abaixo com os links reais do GitHub Pages:

```js
export const APP_URLS = {
  timeTask: "https://...",
  noteAndFinish: "https://...",
};
```

Enquanto um endereço estiver vazio, o botão correspondente aparecerá como **Link pendente** para evitar navegação quebrada.

## Tecnologias

- HTML;
- CSS;
- JavaScript ES Modules;
- LocalStorage para preferência de tema;
- GitHub Pages como hospedagem planejada.

## Estrutura principal

```text
praca-central
├── docs
├── public
├── src
│   ├── assets
│   ├── scripts
│   │   ├── core
│   │   ├── features
│   │   │   ├── apps
│   │   │   └── theme
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
├── tests
├── index.html
├── layout-preview.html
└── README.md
```

## Arquitetura da feature de aplicações

```text
src/scripts/features/apps
├── apps.model.js
├── apps.service.js
├── apps.ui.js
└── apps.controller.js
```

- `model`: catálogo, regras de busca, categorias e validação dos links;
- `service`: consulta e filtragem das aplicações;
- `ui`: renderização dos cards, estado vazio e modal de detalhes;
- `controller`: eventos, filtros, pesquisa e coordenação da tela.

## Como executar localmente

Por usar módulos JavaScript, execute o projeto com um servidor local, como a extensão **Live Server** do VS Code.

1. Abra a pasta do projeto no VS Code.
2. Abra `index.html` com o Live Server.
3. Teste busca, filtros, modal e alternância de tema.
4. Configure os links em `src/scripts/core/config.js`.

## Identidade da v0.1

A interface usa a metáfora de uma praça com caminhos e destinos. A proposta visual combina:

- fundo profundo com linhas de mapa;
- tons dourados, violetas e verde-água;
- cards grandes para cada aplicação;
- animação orbital leve no destaque principal;
- contraste entre navegação central e destinos independentes.

## Autor

Desenvolvido por **Vinícius Sidney**.
