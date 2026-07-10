# Testes

## Informações

Projeto: Praça Central  
Versão testada: v0.1  
Data inicial: 09/07/2026

## Testes funcionais

| Código | Teste | Resultado esperado | Status inicial |
|---|---|---|---|
| T01 | Abrir a página | Hero, galeria e rodapé são exibidos sem erro | Pendente |
| T02 | Pesquisar por “Time” | Apenas Time Task permanece visível | Pendente |
| T03 | Pesquisar por “prazos” | Apenas Note and Finish permanece visível | Pendente |
| T04 | Filtrar por Foco | Apenas Time Task é exibido | Pendente |
| T05 | Filtrar por Organização | Apenas Note and Finish é exibido | Pendente |
| T06 | Pesquisa sem resultado | Estado vazio é exibido | Pendente |
| T07 | Limpar busca e filtros | Todos os cards voltam a aparecer | Pendente |
| T08 | Abrir detalhes | Modal recebe dados corretos do card | Pendente |
| T09 | Fechar modal por botão | Modal é ocultado | Pendente |
| T10 | Fechar modal por clique externo | Modal é ocultado | Pendente |
| T11 | Fechar modal por Esc | Modal é ocultado | Pendente |
| T12 | Alternar tema | Tema muda entre claro e escuro | Pendente |
| T13 | Recarregar após trocar tema | Tema escolhido é restaurado | Pendente |
| T14 | Link não configurado | Botão aparece desabilitado | Pendente |
| T15 | Link configurado | Aplicação abre em nova aba | Pendente |

## Testes responsivos

| Código | Largura | Resultado esperado | Status inicial |
|---|---:|---|---|
| R01 | 1440 px | Hero em duas colunas e cards lado a lado | Pendente |
| R02 | 1024 px | Hero e conteúdo sem corte ou rolagem horizontal | Pendente |
| R03 | 768 px | Galeria em uma coluna e toolbar adaptada | Pendente |
| R04 | 390 px | Botões, cards e modais utilizáveis por toque | Pendente |

## Testes de acessibilidade básica

- navegação por Tab;
- foco visível em links e botões;
- `aria-label` nos controles sem texto suficiente;
- fechamento dos modais com Esc;
- contraste em tema claro e escuro;
- respeito a `prefers-reduced-motion`.

## Observações

Os links externos não podem ser validados até que os endereços reais sejam inseridos em `src/scripts/core/config.js`.
