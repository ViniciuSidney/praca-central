# Requisitos e Escopo

## Requisitos funcionais

- **RF01** — Exibir as aplicações cadastradas em uma galeria de cards.
- **RF02** — Mostrar nome, descrição, categoria, versão, status e tags de cada aplicação.
- **RF03** — Permitir pesquisar aplicações por nome, descrição, categoria ou tag.
- **RF04** — Permitir filtrar aplicações por categoria.
- **RF05** — Exibir um modal com informações detalhadas da aplicação selecionada.
- **RF06** — Direcionar o usuário ao endereço publicado da aplicação.
- **RF07** — Desabilitar a navegação quando o endereço ainda não estiver configurado.
- **RF08** — Alternar entre tema claro e escuro.
- **RF09** — Salvar a preferência de tema no navegador.
- **RF10** — Exibir estado vazio quando a busca ou o filtro não retornar resultados.
- **RF11** — Atualizar contadores e quantidade de resultados dinamicamente.

## Requisitos não funcionais

- **RNF01** — A aplicação deve ser responsiva em desktop, tablet e celular.
- **RNF02** — A interface deve ser clara, consistente e acessível por teclado.
- **RNF03** — A aplicação deve funcionar sem frameworks ou dependências externas.
- **RNF04** — O carregamento deve ser rápido e adequado ao GitHub Pages.
- **RNF05** — Os links das aplicações devem ficar centralizados em um arquivo de configuração.
- **RNF06** — A arquitetura JavaScript deve manter separação entre model, service, UI e controller.
- **RNF07** — O usuário não deve ser enviado para links vazios ou quebrados de forma intencional.

## Escopo da v0.1

### Entra nesta versão

- identidade visual da Praça Central;
- cards do Time Task e Note and Finish;
- busca;
- filtros de categoria;
- modal de detalhes;
- tema claro e escuro;
- preferência de tema salva;
- responsividade;
- documentos iniciais;
- estrutura pronta para novas aplicações.

### Fica para versões futuras

- imagens reais ou capturas de tela das aplicações;
- favoritos e histórico de acessos;
- categorias adicionais;
- ordenação dos cards;
- painel de aplicações em desenvolvimento;
- atualização automática de versão por integração externa;
- modo PWA.

### Fora do escopo

- login e contas de usuário;
- banco de dados;
- edição das aplicações pela própria Central;
- compartilhamento de dados entre Time Task e Note and Finish;
- incorporação das aplicações por iframe;
- painel administrativo remoto.
