# Testes Manuais — Praça Central v0.2

## Preparação

1. Abrir o projeto com Live Server ou outro servidor local.
2. Abrir Console, Application e Network no DevTools.
3. Confirmar ausência de erros JavaScript.
4. Executar testes em tema escuro e claro.
5. Limpar dados do site antes de repetir o ciclo completo da PWA.

## Aplicação base

- [ ] A página carrega corretamente.
- [ ] Os dois cards aparecem.
- [ ] O contador mostra 2 destinos.
- [ ] Busca e filtros funcionam.
- [ ] O estado vazio aparece sem resultados.
- [ ] O modal mostra os dados corretos.
- [ ] Os modais fecham por botão, clique externo e Esc.
- [ ] O tema alterna e persiste.
- [ ] Os links abrem em nova aba.

## Manifesto e instalação

- [ ] O manifesto é carregado sem erro.
- [ ] `start_url` abre a raiz da Praça Central.
- [ ] O escopo não invade outros projetos do domínio.
- [ ] Os ícones 192 e 512 são reconhecidos.
- [ ] O ícone maskable possui margem segura.
- [ ] O botão Instalar aparece quando disponível.
- [ ] O prompt nativo é aberto por ação do usuário.
- [ ] Após instalação, os botões somem.
- [ ] O badge Instalada aparece em modo standalone.

## Service worker e cache

- [ ] O worker é registrado na raiz do projeto.
- [ ] O cache estático é criado.
- [ ] O cache de execução é criado após uso.
- [ ] A aplicação recarrega offline.
- [ ] CSS, JavaScript e ícones continuam disponíveis.
- [ ] O aviso offline aparece e desaparece corretamente.
- [ ] Links externos não aparecem no Cache Storage da Praça Central.

## Atualização

- [ ] Uma nova versão do worker fica em waiting.
- [ ] O aviso de atualização aparece.
- [ ] O botão Depois oculta o aviso sem quebrar o worker.
- [ ] Atualizar agora ativa o novo worker.
- [ ] A página recarrega apenas uma vez.
- [ ] Caches da versão anterior são removidos.

## Responsividade e acessibilidade

- [ ] Sem rolagem horizontal em 390 px.
- [ ] Cabeçalho comporta Instalar e Tema no mobile.
- [ ] Avisos PWA cabem na tela pequena.
- [ ] Botões dos avisos são utilizáveis por toque.
- [ ] Foco do teclado é visível.
- [ ] Região de avisos é anunciada por leitor de tela.
- [ ] Animações respeitam `prefers-reduced-motion`.

## Resultado final

Data: ____/____/______  
Responsável: ____________________  
Status: [ ] Aprovado [ ] Reprovado [ ] Aprovado com ajustes
