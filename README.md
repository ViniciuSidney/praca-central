# Praça Central

Central pessoal para organizar e acessar as aplicações desenvolvidas por Vinícius Sidney.

## Estado atual

Esta base implementa a primeira versão funcional do novo layout da Praça Central:

- interface fixa em `100dvh`, sem rolagem global;
- rolagem interna na listagem e no painel de atalhos;
- cabeçalho com identidade, navegação e ações extras;
- painel lateral com aplicação selecionada e acesso rápido;
- pesquisa principal e pesquisa de atalhos;
- filtros por categoria, status e favoritos;
- visualização em grade ou lista, salva no navegador;
- favoritos e acessos recentes salvos no navegador;
- modal de detalhes;
- tema claro e escuro persistente;
- painel lateral recolhível em telas menores.

## Execução

Abra `index.html` com o Live Server. O JavaScript utiliza módulos ES, portanto o uso de servidor local é recomendado.

## Cadastro das aplicações

Edite:

```text
src/scripts/data/applications.js
```

Cada aplicação possui:

```js
{
  id: 'flashcore',
  name: 'FlashCore',
  shortDescription: 'Descrição curta para o card.',
  description: 'Descrição completa para o modal.',
  status: 'development',
  statusLabel: 'Em desenvolvimento',
  category: 'Estudos e revisão',
  version: 'Protótipo',
  url: '#',
  image: './src/assets/icons/flashcore.svg',
  initials: 'FC',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  tags: ['flashcards', 'revisão'],
  favorite: true,
  updatedAt: '2026-07-12'
}
```

Use a URL pública da aplicação quando ela estiver disponível no GitHub Pages. Mantenha `url: '#'` apenas para projetos ainda sem página publicada; nesse caso, o botão de abertura ficará desabilitado.

Os ícones das aplicações ficam em `src/assets/icons/`. Utilize caminhos relativos iniciados por `./src/assets/icons/` para manter a compatibilidade com o Live Server e o GitHub Pages.

## Arquitetura

A feature de aplicações está dividida em:

```text
features/applications/
├── applications.model.js
├── applications.service.js
├── applications.ui.js
└── applications.controller.js
```

- `model`: valida e normaliza os dados;
- `service`: pesquisa, filtros e persistência;
- `ui`: criação e atualização da interface;
- `controller`: estado e eventos.

## Estrutura principal

```text
/
├── docs/
├── public/
├── src/
│   ├── assets/
│   ├── scripts/
│   │   ├── core/
│   │   ├── data/
│   │   ├── features/
│   │   └── shared/
│   └── styles/
│       ├── base/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── themes/
│       └── utilities/
├── tests/
├── index.html
└── README.md
```


## Aplicações publicadas

- Time Task: `https://viniciusidney.github.io/time-task/`
- Note and Finish: `https://viniciusidney.github.io/note-and-finish/`
- FlashCore: `https://viniciusidney.github.io/flashcore/`
- Central de Estudos Web: `https://viniciusidney.github.io/central-de-estudos-web/`
