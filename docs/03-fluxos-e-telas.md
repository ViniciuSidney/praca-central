# 03 — Fluxos e Telas

## Tela inicial
1. O usuário entra na Praça Central.
2. A seção “Aplicações” é exibida.
3. A primeira aplicação fica selecionada no painel lateral em telas grandes.
4. O usuário pode pesquisar, filtrar, alterar a visualização ou trocar de seção.

## Seleção em desktop
1. O usuário clica no corpo de um card ou em um atalho lateral.
2. A aplicação selecionada recebe destaque.
3. O painel lateral é atualizado.

## Interação em tablet e celular
1. Em até 900 px, o painel lateral se transforma em drawer.
2. Tocar no corpo de um card abre diretamente os detalhes, pois o painel lateral não está visível.
3. O drawer pode ser aberto pelo cabeçalho para acessar a aplicação selecionada e os atalhos.
4. Em tablet, a galeria mantém duas colunas até 700 px.

## Detalhes
1. O usuário aciona “Detalhes” ou toca no corpo do card em modo drawer.
2. Um modal exibe descrição, versão, status, categoria e tecnologias.
3. Ao fechar, pesquisa e filtros permanecem inalterados.

## Abertura
1. O usuário aciona “Abrir”.
2. Se houver URL válida, o sistema abre a aplicação em nova aba e registra o acesso recente.
3. Sem URL válida, o controle permanece desabilitado.

## Filtros
- Desktop e tablet largo: menu suspenso alinhado à barra de ferramentas.
- Celular ou paisagem de pouca altura: bottom sheet com backdrop, rolagem própria e contenção de foco.

## Teclado virtual
1. O sistema acompanha a altura de `visualViewport` quando disponível.
2. Ao detectar o teclado, reduz a altura da aplicação e oculta temporariamente navegação secundária e rodapé em telas menores.
3. O campo focado permanece dentro da área visível.
