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

Na v0.1, o catálogo é estático e fica em:

```text
src/scripts/features/apps/apps.model.js
```

Os endereços externos ficam separados em:

```text
src/scripts/core/config.js
```

Essa separação permite atualizar links sem alterar a lógica ou a interface.

## Persistência

A lista de aplicações não é salva no navegador. O único dado persistido na v0.1 é a preferência de tema:

```text
praca-central:theme
```

## Arquitetura JavaScript

```text
src/scripts
├── core
│   ├── config.js
│   └── constants.js
├── features
│   ├── apps
│   │   ├── apps.model.js
│   │   ├── apps.service.js
│   │   ├── apps.ui.js
│   │   └── apps.controller.js
│   └── theme
│       └── theme.controller.js
├── shared
├── app.js
└── main.js
```

### Responsabilidades

- `apps.model.js`: catálogo, categorias, regras de busca e validação de link;
- `apps.service.js`: consulta, filtro e contadores;
- `apps.ui.js`: cards, modal, estado vazio e contadores visuais;
- `apps.controller.js`: eventos, estado do filtro e coordenação da feature;
- `theme.controller.js`: tema e persistência;
- `app.js`: inicialização das features e modais globais;
- `main.js`: ponto de entrada.

## Arquitetura visual

A página combina partes dos layouts do Modelo de Projeto:

- Hub Inicial para apresentação;
- Galeria de Cards para aplicações;
- Modal de Ação para detalhes;
- Empty State para ausência de resultados.

Os estilos específicos ficam em:

```text
src/styles/pages/home.css
```

Os temas ficam em:

```text
src/styles/themes/app-theme.css
src/styles/themes/dark.css
src/styles/themes/light.css
```
