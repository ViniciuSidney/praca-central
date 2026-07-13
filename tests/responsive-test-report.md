# Relatório de Testes Responsivos — 13/07/2026

## Resultado geral

**Aprovado nos testes automatizados de estrutura e comportamento.**

A auditoria foi executada em navegador Chromium com emulação de toque e das seguintes viewports:

| Viewport | Resultado | Grade | Filtros | Rodapé |
|---|---|---|---|---|
| 360 × 640 | OK | 1 coluna | Bottom sheet | Visível |
| 390 × 844 | OK | 1 coluna | Bottom sheet | Visível |
| 412 × 915 | OK | 1 coluna | Bottom sheet | Visível |
| 768 × 1024 | OK | 2 colunas | Dropdown | Visível |
| 844 × 390, paisagem | OK | 2 colunas | Bottom sheet | Oculto para ampliar a área útil |

## Verificações aprovadas

- ausência de rolagem global horizontal e vertical;
- altura da aplicação sincronizada com a viewport;
- alvos de toque visíveis com pelo menos 44 px;
- drawer lateral inerte e oculto para tecnologias assistivas quando fechado;
- duas colunas preservadas em tablet;
- uma coluna utilizada em celulares estreitos;
- filtros mantidos dentro da viewport;
- cards abrindo detalhes quando o painel lateral está em modo drawer;
- rodapé removido no modo paisagem de pouca altura;
- nenhuma exceção JavaScript durante os cenários testados.

## Validação ainda recomendada em aparelho físico

A emulação não reproduz perfeitamente todos os comportamentos do Safari/iOS, recortes físicos de tela e teclados de fabricantes. Antes do lançamento, validar em pelo menos um celular real:

- abertura e fechamento do teclado virtual;
- safe areas em aparelho com notch ou barra inferior;
- rolagem por toque na galeria, drawer, filtros e modais;
- abertura dos links do GitHub Pages em nova guia;
- orientação retrato e paisagem.

Os resultados estruturados também estão em `tests/responsive-test-results.json`.
