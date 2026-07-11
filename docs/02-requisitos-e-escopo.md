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
- **RF12** — Registrar um service worker para a Praça Central.
- **RF13** — Disponibilizar instalação quando o navegador emitir o evento compatível.
- **RF14** — Ocultar os controles de instalação quando a Central já estiver instalada.
- **RF15** — Manter a interface principal utilizável sem conexão após o primeiro carregamento completo.
- **RF16** — Informar quando o dispositivo estiver offline.
- **RF17** — Avisar quando existir uma nova versão do service worker aguardando ativação.
- **RF18** — Permitir ao usuário aplicar a atualização e recarregar a aplicação.
- **RF19** — Remover caches antigos após a ativação de uma nova versão.

## Requisitos não funcionais

- **RNF01** — A aplicação deve ser responsiva em desktop, tablet e celular.
- **RNF02** — A interface deve ser clara, consistente e acessível por teclado.
- **RNF03** — A aplicação deve funcionar sem frameworks ou dependências externas obrigatórias.
- **RNF04** — O carregamento deve ser rápido e adequado ao GitHub Pages.
- **RNF05** — Os links das aplicações devem ficar centralizados em um arquivo de configuração.
- **RNF06** — A arquitetura JavaScript deve manter separação entre model, service, UI e controller.
- **RNF07** — O usuário não deve ser enviado para links vazios ou quebrados de forma intencional.
- **RNF08** — O service worker deve controlar apenas requisições da mesma origem e dentro do escopo da Central.
- **RNF09** — Requisições externas não devem ser armazenadas pelo cache da Central.
- **RNF10** — A implementação deve funcionar em HTTPS e em `localhost`.
- **RNF11** — A ausência de suporte a instalação customizada não deve impedir o uso normal do site.
- **RNF12** — Atualizações não devem substituir silenciosamente uma versão em uso.

## Escopo consolidado até a v0.3

### Entra nesta versão

- todos os recursos consolidados da v0.1;
- Web App Manifest completo;
- ícones de 192 px, 512 px, Apple Touch e maskable;
- service worker na raiz do projeto;
- cache do shell principal;
- funcionamento offline da interface da Central;
- botão de instalação progressivo;
- detecção de modo instalado;
- aviso offline;
- detecção de nova versão;
- atualização por confirmação do usuário;
- limpeza de caches antigos;
- documentação e testes PWA;
- FlashCore como terceiro destino disponível;
- categoria **Estudos e revisão**;
- filtro específico para aplicações de estudo;
- ícone e identidade visual próprios do FlashCore;
- grade adaptada para três cards em telas amplas;
- cache PWA atualizado para incluir o novo recurso visual.

### Fica para versões futuras

- capturas de tela no manifesto;
- interface de instalação específica para iOS;
- histórico local de acessos;
- favoritos;
- sincronização ou integração entre aplicações;
- notificações push;
- sincronização em segundo plano;
- atalhos adicionais no ícone instalado.

### Fora do escopo

- instalar automaticamente as aplicações externas ligadas à Central;
- armazenar offline conteúdo de outros domínios;
- login e contas de usuário;
- banco de dados;
- painel administrativo remoto;
- compartilhamento de dados entre aplicações.
