# Praça Central

Central pessoal de aplicações web criada para reunir, apresentar e facilitar o acesso a ferramentas independentes publicadas no GitHub Pages.

A **Praça Central** funciona como uma porta de entrada para o ecossistema de aplicações: cada projeto continua existindo e evoluindo de forma independente, enquanto a Central organiza os caminhos em uma experiência única, responsiva e agora instalável.

## Versão atual

**v0.3 — FlashCore na Praça**

A versão atual mantém a experiência PWA consolidada e amplia a Praça com o **FlashCore**, o terceiro destino disponível. A Central continua instalável, responsiva e acessível offline em sua interface principal.

As aplicações apresentadas são:

- **Time Task** — foco imediato com timer, missão e microtarefas;
- **Note and Finish** — organização de atividades, prazos e etapas;
- **FlashCore** — criação, importação e revisão de flashcards.

## Funcionalidades

- apresentação visual da Central;
- galeria de aplicações;
- busca por nome, descrição, categoria ou tag;
- filtros por categoria;
- modal com detalhes de cada aplicação;
- contador de aplicações disponíveis;
- tema claro e escuro com preferência salva;
- interface responsiva;
- estado vazio para buscas sem resultado;
- instalação como PWA em navegadores compatíveis;
- cache dos arquivos essenciais da própria Central;
- funcionamento offline da interface principal;
- aviso de conexão offline;
- aviso quando uma nova versão estiver disponível;
- atualização controlada do service worker;
- ícones comuns, Apple Touch e maskable.

## Limite do modo offline

O modo offline mantém a **Praça Central** acessível, incluindo sua interface, os cards e as informações das aplicações.

Os links para Time Task, Note and Finish e FlashCore apontam para projetos externos. Abrir esses destinos sem internet depende de cada aplicação possuir sua própria estratégia PWA e cache offline.

## Configuração dos links

Os endereços das aplicações ficam centralizados em:

```text
src/scripts/core/config.js
```

```js
export const APP_URLS = {
  timeTask: "https://...",
  noteAndFinish: "https://...",
  flashCore: "https://...",
};
```

## Arquivos da PWA

```text
service-worker.js
public/manifest.json
public/icons/
src/scripts/features/pwa/
```

A feature PWA segue a separação do projeto:

- `pwa.service.js`: instalação, registro do service worker, conexão e atualizações;
- `pwa.ui.js`: botões de instalação, aviso offline e aviso de atualização;
- `pwa.controller.js`: eventos e integração entre serviço e interface.

## Estratégia de cache

- **Navegações da Central:** rede primeiro, cache como alternativa;
- **Arquivos locais:** cache com atualização em segundo plano;
- **Links externos:** não são interceptados pelo service worker;
- **Atualizações:** um novo service worker aguarda confirmação do usuário antes de assumir o controle.

O cache é versionado em `service-worker.js`. Em alterações relevantes, atualize:

```js
const CACHE_VERSION = "v0.3.0";
```

## Tecnologias

- HTML;
- CSS;
- JavaScript ES Modules;
- Web App Manifest;
- Service Worker;
- Cache Storage;
- LocalStorage para preferência de tema;
- GitHub Pages.

## Estrutura principal

```text
praca-central
├── docs
├── public
│   ├── icons
│   ├── favicon.svg
│   └── manifest.json
├── src
│   ├── assets
│   ├── scripts
│   │   ├── core
│   │   ├── features
│   │   │   ├── apps
│   │   │   ├── pwa
│   │   │   └── theme
│   │   ├── shared
│   │   ├── app.js
│   │   └── main.js
│   ├── styles
│   └── templates
├── tests
├── index.html
├── layout-preview.html
├── service-worker.js
└── README.md
```

## Como executar localmente

A aplicação deve ser aberta por um servidor local. O service worker não funciona abrindo o `index.html` diretamente pelo protocolo `file://`.

1. Abra a pasta no VS Code.
2. Inicie o projeto com Live Server ou outro servidor local.
3. Acesse a aplicação por `http://localhost` ou endereço equivalente.
4. Abra as ferramentas do navegador para testar Manifest, Service Worker e Cache Storage.

## Como testar a instalação

1. Publique ou execute em `localhost`.
2. Abra em um navegador compatível.
3. Aguarde o botão **Instalar** aparecer.
4. Instale a aplicação.
5. Confirme que ela abre em modo `standalone`.

O botão customizado depende do evento `beforeinstallprompt`, que não é oferecido por todos os navegadores. A ausência do botão não impede que o navegador disponibilize instalação por seu próprio menu.

## Instalação como PWA

A Praça Central pode ser instalada como aplicação em navegadores compatíveis, como o Google Chrome.

Depois de abrir a página publicada, utilize a opção de instalação exibida pelo navegador ou pela própria interface da Central.

A interface principal pode ser carregada offline. A abertura de aplicações externas depende de conexão ou do suporte offline de cada aplicação.

## Publicação no GitHub Pages

O service worker fica na raiz para controlar todo o escopo da aplicação. O manifesto usa caminhos relativos compatíveis com projetos publicados em subpastas do GitHub Pages.

Depois de publicar, faça uma atualização completa da página e confirme no DevTools:

- manifesto carregado;
- ícones reconhecidos;
- service worker ativado;
- recursos essenciais presentes no cache;
- ausência de erros no Console.

## Autor

Desenvolvido por **Vinícius Sidney**.
