# Fluxos e Telas

## Tela principal — Praça Central

### Objetivo

Apresentar o ecossistema de aplicações, permitir descoberta por busca e filtros e encaminhar o usuário para o destino escolhido.

### Blocos da tela

- cabeçalho com identidade, navegação e troca de tema;
- hero de apresentação;
- resumo com quantidade de destinos;
- barra de busca e filtros;
- galeria de aplicações;
- estado vazio;
- seção de crescimento futuro;
- rodapé.

### Estados importantes

- **Estado padrão:** todas as aplicações são exibidas.
- **Estado filtrado:** apenas aplicações da categoria selecionada aparecem.
- **Estado pesquisado:** aparecem aplicações compatíveis com o termo informado.
- **Estado vazio:** uma orientação é exibida e o usuário pode limpar os filtros.
- **Link configurado:** o botão abre a aplicação em nova aba.
- **Link pendente:** o botão permanece desabilitado.

## Modal de detalhes

### Objetivo

Mostrar uma visão mais completa da aplicação sem sobrecarregar o card principal.

### Elementos

- ícone;
- categoria;
- nome;
- descrição;
- versão;
- status;
- lista de funcionalidades;
- tags;
- botão para abrir a aplicação.

## Modal sobre a Central

### Objetivo

Explicar rapidamente o papel da Praça Central e seus princípios de leveza, expansão e independência.

## Fluxos principais

### Fluxo 1 — Abrir uma aplicação

1. Usuário acessa a Praça Central.
2. Usuário encontra uma aplicação na galeria.
3. Usuário clica em **Abrir aplicação**.
4. Se o link estiver configurado, a aplicação abre em nova aba.
5. Se o link estiver pendente, o botão permanece desabilitado.

### Fluxo 2 — Pesquisar uma aplicação

1. Usuário digita no campo de busca.
2. O sistema normaliza o termo e filtra os cards.
3. O contador de resultados é atualizado.
4. Se não houver correspondência, o estado vazio é exibido.

### Fluxo 3 — Filtrar por categoria

1. Usuário escolhe uma categoria.
2. O botão selecionado recebe estado ativo.
3. A galeria mostra apenas aplicações compatíveis.
4. O usuário pode voltar para **Todas**.

### Fluxo 4 — Consultar detalhes

1. Usuário clica em **Ver detalhes**.
2. O sistema localiza a aplicação pelo identificador.
3. O modal é preenchido dinamicamente.
4. Usuário fecha o modal ou abre a aplicação.

### Fluxo 5 — Alternar tema

1. Usuário aciona o botão de tema.
2. O atributo `data-theme` é atualizado.
3. A escolha é salva no `localStorage`.
4. Ao recarregar a página, o tema é restaurado.
