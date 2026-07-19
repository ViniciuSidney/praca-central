# Testes Manuais — Praça Central v0.1

## Ambiente
- Navegador:
- Resolução:
- Data:
- Commit:

## T01 — Inicialização
- Abrir pelo Live Server.
- Confirmar ausência de erros no console.
- Confirmar cabeçalho, painel lateral, listagem e rodapé.

Status: Pendente

## T02 — Viewport fixa
- Testar em 1920×1080, 1366×768, 1024×768 e 390×844.
- Confirmar que `body` não possui rolagem vertical ou horizontal.
- Confirmar rolagem interna da listagem quando necessária.

Status: Pendente

## T03 — Pesquisa principal
- Pesquisar por nome, categoria, tag e tecnologia.
- Confirmar atualização instantânea.
- Confirmar estado vazio quando não houver resultado.

Status: Pendente

## T04 — Pesquisa lateral
- Pesquisar pelo nome de uma aplicação.
- Confirmar que apenas os atalhos correspondentes permanecem.

Status: Pendente

## T05 — Navegação
- Testar Aplicações, Favoritos, Em desenvolvimento e Recentes.
- Confirmar apenas um item ativo por vez.

Status: Pendente

## T06 — Filtros combinados
- Combinar categoria, status e favoritos.
- Confirmar contador de filtros ativos.
- Limpar os filtros.

Status: Pendente

## T07 — Favoritos
- Adicionar e remover um favorito.
- Recarregar a página.
- Confirmar persistência.

Status: Pendente

## T08 — Visualização
- Alternar entre grade e lista.
- Recarregar a página.
- Confirmar persistência.

Status: Pendente

## T09 — Seleção e detalhes
- Selecionar cards e atalhos.
- Confirmar atualização do painel lateral.
- Abrir e fechar o modal de detalhes sem perder filtros.

Status: Pendente

## T10 — Aplicação indisponível
- Usar uma aplicação com `url: '#'`.
- Confirmar controles desabilitados e ausência de navegação.

Status: Pendente

## T11 — Aplicação disponível
- Informar temporariamente uma URL válida.
- Abrir a aplicação.
- Confirmar nova aba e registro em Recentes.

Status: Pendente

## T12 — Tema
- Alternar claro/escuro.
- Recarregar a página.
- Confirmar persistência.

Status: Pendente

## T13 — Painel móvel
- Em largura até 900 px, abrir e fechar pelo cabeçalho, botão interno, backdrop e Esc.
- Confirmar que a listagem permanece fixa ao fundo.

Status: Pendente

## T14 — Teclado
- Navegar com Tab e Shift+Tab.
- Selecionar cards com Enter e Espaço.
- Confirmar foco visível.

Status: Pendente

## T15 — Ícones e identidade
- Confirmar os ícones fornecidos nos cards, atalhos, painel lateral e modal correspondentes, incluindo o Test Quest.
- Confirmar o ícone da Praça Central no hero e na guia do navegador.
- Confirmar que nenhuma imagem fica distorcida, cortada indevidamente ou causa deslocamento no layout.

Status: Pendente


## Links públicos

- [ ] O botão Abrir do Time Task abre `https://viniciusidney.github.io/time-task/`.
- [ ] O botão Abrir do Note and Finish abre `https://viniciusidney.github.io/note-and-finish/`.
- [ ] O botão Abrir do FlashCore abre `https://viniciusidney.github.io/flashcore/`.
- [ ] O botão Abrir do Test Quest abre `https://viniciusidney.github.io/test-quest/`.
- [ ] O botão Abrir da Central de Estudos Web abre `https://viniciusidney.github.io/central-de-estudos-web/`.
- [ ] Favoritos e recentes antigos de Agenda Escolar, Central de Estudos e Resoluções são migrados sem erro.

## T16 — Breakpoints independentes
- Em 768 × 1024, confirmar drawer lateral e galeria com duas colunas.
- Em 700 px ou menos, confirmar galeria com uma coluna.

Status: Automatizado — OK em 13/07/2026

## T17 — Áreas de toque
- Confirmar altura mínima de 44 px nos botões, campos, navegação e controles dos cards.
- Verificar se ações vizinhas não são acionadas por engano.

Status: Automatizado — OK em 13/07/2026

## T18 — Safe areas
- Testar em aparelho com notch ou barra inferior.
- Confirmar que cabeçalho, drawer, filtros, modais e rodapé não ficam sob áreas físicas da tela.

Status: Pendente em aparelho físico

## T19 — Filtros móveis
- Em 360 × 640, 390 × 844 e 412 × 915, abrir os filtros.
- Confirmar bottom sheet, backdrop, fechamento por botão, backdrop e Esc.
- Confirmar foco contido no painel pelo teclado.

Status: Automatizado — OK em 13/07/2026

## T20 — Comportamento dos cards móveis
- Em largura até 900 px, tocar no corpo do card.
- Confirmar abertura dos detalhes.
- Confirmar que Abrir, Detalhes e Favorito continuam independentes.

Status: Automatizado — OK em 13/07/2026

## T21 — Teclado virtual
- Focar as pesquisas principal e lateral em aparelho físico.
- Confirmar ajuste da altura visual, ocultação temporária do rodapé e manutenção do campo visível.

Status: Pendente em aparelho físico

## T22 — Paisagem móvel
- Testar em 844 × 390.
- Confirmar rodapé oculto, filtros dentro da viewport, duas colunas e rolagem interna.

Status: Automatizado — OK em 13/07/2026

## T23 — Drawer e acessibilidade
- Confirmar que o drawer fechado não recebe foco.
- Abrir o drawer e navegar por Tab e Shift+Tab.
- Fechar por botão, backdrop e Esc, verificando a devolução do foco.

Status: Automatizado estruturalmente — OK em 13/07/2026

## T24 — Modais móveis
- Abrir detalhes e informações nas três larguras de celular.
- Confirmar conteúdo rolável, botões alcançáveis e fechamento por botão, backdrop e Esc.

Status: Automatizado estruturalmente — OK em 13/07/2026
