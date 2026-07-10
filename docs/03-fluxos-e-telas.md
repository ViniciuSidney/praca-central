# Fluxos e Telas

## Tela principal — Praça Central

### Objetivo

Apresentar o ecossistema de aplicações, permitir descoberta por busca e filtros, encaminhar o usuário para o destino escolhido e oferecer instalação progressiva da própria Central.

### Blocos da tela

- cabeçalho com identidade, navegação, instalação e troca de tema;
- hero de apresentação;
- resumo com quantidade de destinos e estado instalado;
- barra de busca e filtros;
- galeria de aplicações;
- estado vazio;
- seção de crescimento futuro;
- rodapé;
- avisos flutuantes de conexão e atualização.

### Estados importantes

- **Estado padrão:** todas as aplicações são exibidas.
- **Estado filtrado:** apenas aplicações da categoria selecionada aparecem.
- **Estado pesquisado:** aparecem aplicações compatíveis com o termo informado.
- **Estado vazio:** orientação para limpar busca e filtros.
- **Link configurado:** o botão abre a aplicação em nova aba.
- **Link pendente:** o botão permanece desabilitado.
- **Instalação disponível:** botões de instalação são exibidos.
- **Aplicação instalada:** controles de instalação são ocultados e o badge “Instalada” aparece.
- **Offline:** aviso informa a limitação dos destinos externos.
- **Atualização disponível:** aviso oferece atualização imediata ou adiamento.

## Fluxos existentes

### Fluxo 1 — Abrir uma aplicação

1. Usuário acessa a Praça Central.
2. Usuário encontra uma aplicação na galeria.
3. Usuário clica em **Abrir aplicação**.
4. Se o link estiver configurado, a aplicação abre em nova aba.
5. Se não houver conexão, o destino externo pode não abrir.

### Fluxo 2 — Pesquisar e filtrar

1. Usuário digita ou seleciona uma categoria.
2. O catálogo é filtrado.
3. O contador é atualizado.
4. O estado vazio aparece se não houver correspondência.

### Fluxo 3 — Consultar detalhes

1. Usuário clica em **Ver detalhes**.
2. O modal recebe os dados da aplicação.
3. Usuário fecha o modal ou abre o destino.

### Fluxo 4 — Alternar tema

1. Usuário aciona o botão de tema.
2. `data-theme` e a cor do navegador são atualizados.
3. A escolha é salva no `localStorage`.
4. O tema é restaurado no próximo acesso.

## Fluxos PWA

### Fluxo 5 — Instalar a Praça Central

1. O navegador verifica se a aplicação pode ser instalada.
2. O evento `beforeinstallprompt` é capturado.
3. Os botões de instalação são exibidos.
4. Usuário solicita a instalação.
5. O navegador mostra sua interface nativa.
6. Após aceitação, os botões somem e o estado instalado é refletido.

### Fluxo 6 — Usar offline

1. Usuário acessa a Central online pelo menos uma vez.
2. O service worker armazena os arquivos essenciais.
3. A conexão é interrompida.
4. O aviso offline aparece.
5. A interface continua carregando a partir do cache.
6. Links externos continuam dependentes da disponibilidade de rede ou da PWA de cada destino.

### Fluxo 7 — Atualizar a PWA

1. O navegador encontra uma nova versão de `service-worker.js`.
2. O novo worker é instalado e fica aguardando.
3. A interface mostra **Nova versão disponível**.
4. Usuário escolhe **Atualizar agora**.
5. A mensagem `SKIP_WAITING` é enviada ao worker.
6. O novo worker assume o controle.
7. A página recarrega uma única vez.
8. Caches antigos são removidos.
