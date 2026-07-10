# Dados e Arquitetura

## Entidade principal: Aplicação

Campos:

- `id`: identificador único;
- `name`: nome público;
- `shortName`: sigla usada como apoio visual;
- `category`: código interno da categoria;
- `categoryLabel`: nome exibido da categoria;
- `description`: resumo da finalidade;
- `version`: versão atual conhecida;
- `status`: código interno de disponibilidade;
- `statusLabel`: texto exibido do status;
- `url`: endereço publicado;
- `accent`: identidade de cor do card;
- `icon`: caminho do ícone;
- `tags`: palavras-chave;
- `features`: lista de funcionalidades principais.

## Fonte dos dados

O catálogo é estático e fica em:

```text
src/scripts/features/apps/apps.model.js
```

Os endereços externos ficam em:

```text
src/scripts/core/config.js
```

## Persistência

A preferência de tema é salva no `localStorage`:

```text
praca-central:theme
```

Os arquivos offline são armazenados pelo navegador no **Cache Storage**, separados em:

```text
praca-central-static-v0.2.0
praca-central-runtime-v0.2.0
```

## Arquitetura JavaScript

```text
src/scripts
├── core
├── features
│   ├── apps
│   ├── pwa
│   │   ├── pwa.service.js
│   │   ├── pwa.ui.js
│   │   └── pwa.controller.js
│   └── theme
├── shared
├── app.js
└── main.js
```

### Feature PWA

- `pwa.service.js`:
  - captura o evento de instalação;
  - registra o service worker;
  - detecta modo instalado;
  - acompanha conexão;
  - detecta workers aguardando;
  - aplica atualização sob confirmação.

- `pwa.ui.js`:
  - mostra ou oculta botões de instalação;
  - exibe badge de aplicação instalada;
  - controla avisos offline e de atualização;
  - aplica estado de carregamento.

- `pwa.controller.js`:
  - liga eventos aos elementos da interface;
  - conecta observadores do serviço à UI;
  - inicia o registro do service worker.

## Service worker

Arquivo:

```text
service-worker.js
```

Ele fica na raiz para que seu escopo padrão alcance toda a Praça Central publicada.

### Ciclo

- `install`: cria o cache estático e adiciona o shell principal;
- `activate`: remove caches antigos e assume clientes abertos;
- `fetch`: intercepta apenas requisições GET da mesma origem;
- `message`: recebe `SKIP_WAITING` para atualizações confirmadas.

### Estratégias

- navegação: **network first** com fallback para o HTML armazenado;
- arquivos locais: **stale while revalidate**;
- links externos: não interceptados.

## Manifesto

Arquivo:

```text
public/manifest.json
```

Os caminhos `start_url` e `scope` são relativos ao local do manifesto e retornam à raiz do projeto. Isso mantém compatibilidade com a subpasta usada pelo GitHub Pages.

## Arquitetura visual

A página combina:

- Hub Inicial;
- Galeria de Cards;
- Modal de Ação;
- Empty State;
- avisos flutuantes PWA.

Os estilos específicos permanecem em:

```text
src/styles/pages/home.css
```
