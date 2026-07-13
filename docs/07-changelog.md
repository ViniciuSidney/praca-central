# 07 — Changelog

## Em desenvolvimento — v0.1.0

### Adicionado
- novo layout fixo da Praça Central;
- navegação por seções;
- painel lateral com aplicação selecionada;
- pesquisa principal e pesquisa de atalhos;
- filtros por categoria, status e favoritos;
- visualização em grade e lista;
- favoritos e recentes com persistência local;
- modal de detalhes;
- tema claro e escuro;
- painel lateral móvel;
- documentação e testes atualizados;
- ícones fornecidos para três aplicações integrados aos cards, atalhos e detalhes;
- identidade da Praça Central no hero, favicon e manifesto;
- links públicos do GitHub Pages para Time Task, Note and Finish, FlashCore e Central de Estudos Web;
- migração dos identificadores antigos salvos em favoritos e acessos recentes;
- refinamento responsivo completo para celulares, tablets e modo paisagem;
- normalização de finais de linha por `.gitattributes`;
- suporte a safe areas com `viewport-fit=cover`;
- sincronização com `visualViewport` para teclado virtual;
- filtros em bottom sheet em celulares e paisagem de pouca altura;
- alvos de toque com pelo menos 44 px;
- contenção de foco e estado inerte no drawer móvel;
- relatório de testes responsivos em cinco viewports.

### Alterado
- identidade visual migrada para tons de preto e roxo;
- arquitetura de aplicações dividida em model, service, UI e controller;
- aplicação "Agenda Escolar" renomeada para "Note and Finish";
- aplicação "Central de Estudos" renomeada para "Central de Estudos Web";
- breakpoint do drawer separado do breakpoint da galeria;
- cards passam a abrir detalhes quando o painel lateral está em modo drawer;
- ícones usam `object-fit: contain` para evitar cortes;
- cabeçalho, navegação, rodapé, modais e drawer refinados para toque e telas baixas.

### Removido
- hero vertical da base anterior;
- arquivos demonstrativos e estilos não utilizados do Modelo de Projeto.
