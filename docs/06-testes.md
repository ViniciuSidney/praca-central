# Testes

## Informações

Projeto: Praça Central  
Versão testada: v0.3  
Data inicial: 10/07/2026

## Testes funcionais existentes

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
| T09 | Fechar modal por botão, fundo e Esc | Modal é ocultado | Pendente |
| T10 | Alternar e restaurar tema | Tema muda e persiste | Pendente |
| T11 | Link configurado | Aplicação abre em nova aba | Pendente |

## Testes PWA

| Código | Teste | Resultado esperado | Status inicial |
|---|---|---|---|
| P01 | Carregar manifesto | Manifesto é reconhecido sem erros | Pendente |
| P02 | Validar ícones | Ícones 192, 512 e maskable são reconhecidos | Pendente |
| P03 | Registrar service worker | Worker fica ativo no escopo do projeto | Pendente |
| P04 | Verificar precache | Cache estático contém o shell principal | Pendente |
| P05 | Instalação disponível | Botões aparecem quando o navegador permite | Pendente |
| P06 | Aceitar instalação | PWA é instalada e abre como standalone | Pendente |
| P07 | PWA já instalada | Botões somem e badge “Instalada” aparece | Pendente |
| P08 | Recarregar offline | Interface principal continua carregando | Pendente |
| P09 | Perder conexão | Aviso offline é exibido | Pendente |
| P10 | Recuperar conexão | Aviso offline desaparece | Pendente |
| P11 | Nova versão do worker | Aviso de atualização aparece | Pendente |
| P12 | Atualizar agora | Novo worker assume e a página recarrega uma vez | Pendente |
| P13 | Ativar nova versão | Caches antigos são removidos | Pendente |
| P14 | Abrir destino offline | Central não promete acesso ao conteúdo externo | Pendente |
| P15 | Navegação externa | Requisição externa não é armazenada pelo worker | Pendente |

## Testes responsivos

| Código | Largura | Resultado esperado | Status inicial |
|---|---:|---|---|
| R01 | 1440 px | Hero em duas colunas e cards lado a lado | Pendente |
| R02 | 1024 px | Conteúdo sem corte ou rolagem horizontal | Pendente |
| R03 | 768 px | Galeria e cabeçalho adaptados | Pendente |
| R04 | 390 px | Controles PWA, cards e modais utilizáveis por toque | Pendente |

## Como simular offline

1. Carregar a aplicação online.
2. Confirmar o worker ativo.
3. DevTools → Network → Offline.
4. Recarregar a página.
5. Confirmar interface e aviso offline.
6. Voltar para Online e confirmar remoção do aviso.

## Como testar uma atualização

1. Publicar ou executar a v0.2 com o worker ativo.
2. Alterar `CACHE_VERSION` no `service-worker.js`.
3. Modificar um arquivo visual pequeno.
4. Recarregar ou voltar à aba.
5. Confirmar o aviso de nova versão.
6. Clicar em **Atualizar agora**.
7. Confirmar recarga única e remoção do cache anterior.

## Acessibilidade básica

- navegação por Tab;
- foco visível;
- botões de instalação e atualização com texto claro;
- avisos com região `aria-live`;
- modais fechando com Esc;
- contraste em temas claro e escuro;
- respeito a `prefers-reduced-motion`.


## Ajuste de compatibilidade do prompt de instalação

- O botão deve aparecer como **Instalar** quando `beforeinstallprompt` estiver disponível.
- Caso o navegador não ofereça esse evento, o botão deve aparecer como **Como instalar** e abrir orientações manuais.
- Para testar o prompt nativo no Chrome ou Edge, interaja com a página e aguarde cerca de 30 segundos antes de recarregar.
- Ao recarregar em modo offline pelo DevTools, o banner deve reaparecer após a verificação de conectividade.


## Resultado dos testes da v0.2

- Manifesto PWA: aprovado
- Registro do service worker: aprovado
- Cache estático: aprovado
- Carregamento offline: aprovado
- Instalação no Google Chrome: aprovada
- Execução em modo standalone: aprovada
- Atualização da PWA: aprovada
- Limpeza de caches antigos: aprovada
- Tema e preferências: aprovados
- Responsividade: aprovada

### Compatibilidade observada

- Google Chrome: instalação e execução PWA aprovadas.
- Opera GX: navegação normal aprovada; o navegador não disponibilizou instalação da PWA.
## Testes de regressão da v0.3 — FlashCore

| Código | Teste | Resultado esperado | Status inicial |
|---|---|---|---|
| F01 | Carregar a galeria | Três aplicações são exibidas | Pendente |
| F02 | Pesquisar por “Flash” | Apenas FlashCore permanece visível | Pendente |
| F03 | Pesquisar por “baralhos” | Apenas FlashCore permanece visível | Pendente |
| F04 | Filtrar por Estudos | Apenas FlashCore é exibido | Pendente |
| F05 | Abrir detalhes do FlashCore | Modal mostra dados, tags e recursos corretos | Pendente |
| F06 | Abrir aplicação | Link abre `https://viniciusidney.github.io/flashcore/` em nova aba | Pendente |
| F07 | Recarregar offline | Ícone e card do FlashCore continuam disponíveis | Pendente |
| F08 | Atualizar da v0.2 para v0.3 | Novo worker ativa e remove caches antigos | Pendente |
