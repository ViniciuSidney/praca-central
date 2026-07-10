# Changelog

Todas as mudanças importantes da Praça Central são registradas neste arquivo.

## [v0.2] — 10/07/2026

### Adicionado

- transformação da Praça Central em Progressive Web App;
- manifesto completo com escopo adequado ao GitHub Pages;
- ícones de 192 px, 512 px, Apple Touch e maskable;
- service worker na raiz do projeto;
- cache estático do shell principal;
- cache de execução para recursos locais;
- funcionamento offline da interface da Central;
- botões de instalação progressivos no cabeçalho e no hero;
- detecção do modo instalado;
- badge visual para aplicação instalada;
- aviso de conexão offline;
- aviso de nova versão disponível;
- atualização por confirmação do usuário;
- limpeza automática de caches antigos;
- atalho de instalação para a seção de aplicações;
- feature PWA separada em service, UI e controller;
- testes específicos de instalação, cache, offline e atualização.

### Alterado

- versão da interface e metadados para v0.2.0;
- metadado `theme-color` sincronizado com o tema atual;
- modal sobre a Central atualizado para explicar o funcionamento instalável;
- README, visão, requisitos, fluxos, arquitetura, roadmap e testes.

### Mantido

- todas as funções consolidadas da v0.1;
- independência entre Praça Central, Time Task e Note and Finish;
- links externos fora do cache da Central.

## [v0.1] — 09/07/2026

### Adicionado

- estrutura inicial baseada no Modelo de Projeto pessoal;
- identidade e nome Praça Central;
- apresentação em formato de Hub Inicial;
- galeria com Time Task e Note and Finish;
- catálogo estruturado de aplicações;
- busca por nome, descrição, categoria e tags;
- filtros de Foco e Organização;
- contador de destinos e resultados;
- cards responsivos com identidade própria;
- modal de detalhes das aplicações;
- modal explicativo sobre a Central;
- tema claro e escuro;
- persistência da preferência de tema;
- estado vazio para buscas sem correspondência;
- configuração centralizada dos links externos;
- favicon e manifesto inicial;
- documentação inicial;
- testes manuais planejados.
