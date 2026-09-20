# 07 — Changelog

## v0.1.0 — Base pública atual

### Adicionado

- layout fixo da Praça Central;
- navegação por Aplicações, Favoritos, Em desenvolvimento e Recentes;
- painel lateral com aplicação selecionada;
- pesquisa principal e pesquisa de atalhos;
- filtros por categoria, status e favoritos;
- visualização em grade e lista;
- favoritos e recentes com persistência local;
- modal de detalhes;
- tema claro e escuro persistente;
- drawer lateral para telas menores;
- identidade própria da Praça Central no cabeçalho, favicon e manifesto;
- publicação da Praça Central no GitHub Pages;
- screenshot oficial da interface para apresentação do repositório;
- README reformulado com foco em portfólio e documentação técnica;
- suporte a safe areas com `viewport-fit=cover`;
- adaptação ao teclado virtual com `visualViewport`;
- filtros em bottom sheet no mobile;
- alvos de toque com pelo menos 44 px;
- contenção de foco e estado inerte no drawer;
- relatório de testes responsivos em cinco viewports;
- Study Stack no catálogo;
- Trilha de Estudo no catálogo;
- Merge Clicker no catálogo.

### Atualizado

- catálogo ampliado para nove aplicações;
- Concept Compass atualizado para `v0.2.0`;
- Study Stack registrado como `v0.3.0`;
- Test Quest atualizado para `v0.6.1`;
- FlashCore atualizado para `v0.1.0`;
- Trilha de Estudo registrada como `v0.1.0`;
- Note and Finish atualizado para `v0.2`;
- Time Task mantido como `v0.1`;
- Central de Estudos Web registrada como projeto legado em `v1.0`;
- descrições, categorias, tags e status das aplicações;
- links públicos disponíveis no GitHub Pages;
- documentação do projeto alinhada ao estado público atual.

### Alterado

- identidade visual migrada para tons de preto e roxo;
- arquitetura de aplicações dividida em model, service, UI e controller;
- aplicação "Agenda Escolar" renomeada para "Note and Finish";
- aplicação "Central de Estudos" renomeada para "Central de Estudos Web";
- Test Quest substitui o antigo identificador "Resoluções";
- breakpoint do drawer separado do breakpoint da galeria;
- cards passam a abrir detalhes quando o painel lateral está em modo drawer;
- ícones usam `object-fit: contain` para evitar cortes;
- cabeçalho, navegação, rodapé, modais e drawer refinados para toque e telas baixas;
- Praça Central passa de central pessoal interna para hub público de aplicações e portfólio.

### Validado

- carregamento das nove aplicações;
- pesquisa por conteúdo do catálogo;
- filtros por categoria e status;
- navegação da seção Em desenvolvimento;
- abertura das aplicações publicadas;
- comportamento de aplicações sem URL pública;
- registro e persistência de Recentes;
- adição, remoção e persistência de Favoritos;
- exibição dos detalhes dos cards;
- publicação da Praça Central no GitHub Pages;
- funcionamento geral após atualização do catálogo.

### Removido

- hero vertical da base anterior;
- arquivos demonstrativos e estilos não utilizados do Modelo de Projeto.

## Observações

Algumas aplicações ainda utilizam iniciais como fallback visual enquanto não possuem ícone próprio na Praça Central.

Trilha de Estudo e Merge Clicker permanecem com acesso desabilitado enquanto uma URL pública não for confirmada no catálogo.
