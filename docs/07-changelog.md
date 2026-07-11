# Changelog

Todas as mudanças importantes da Praça Central são registradas neste arquivo.

## [v0.3] — 11/07/2026

### Adicionado

- FlashCore como terceiro destino da Praça Central;
- categoria **Estudos e revisão**;
- filtro **Estudos** na galeria;
- ícone próprio do FlashCore;
- descrição, tags e lista de recursos no catálogo;
- testes específicos para o novo destino.

### Ajustado

- grade de aplicações para três colunas em telas amplas;
- adaptação do card isolado em larguras intermediárias;
- contadores e textos iniciais para três aplicações;
- seção de crescimento da Praça;
- versão da interface, metadados e cache para v0.3.0;
- documentação geral do projeto.

### Mantido

- experiência PWA consolidada na v0.2;
- funcionamento offline da interface principal;
- independência entre os projetos externos.

## [v0.2] — 10/07/2026

### Adicionado

- Manifesto completo da aplicação.
- Service worker com cache estático e dinâmico.
- Funcionamento offline da Praça Central.
- Instalação como aplicação em navegadores compatíveis.
- Ícones próprios para instalação.
- Botão e fluxo de instalação.
- Aviso de estado offline.
- Detecção e aplicação de novas versões.
- Limpeza automática de caches antigos.
- Feature PWA separada em service, UI e controller.

### Ajustado

- Persistência e sincronização do tema com a cor do navegador.
- Documentação e testes da aplicação.
- Experiência da Central em modo standalone.

### Observações

- A instalação foi validada no Google Chrome.
- O Opera GX foi mantido como navegador compatível para acesso web, mas não ofereceu instalação da PWA.

### Alterado

- versão da interface e metadados para v0.2.0;
- metadado `theme-color` sincronizado com o tema atual;
- modal sobre a Central atualizado para explicar o funcionamento instalável;
- README, visão, requisitos, fluxos, arquitetura, roadmap e testes.

### Mantido

- todas as funções consolidadas da v0.1;
- independência entre Praça Central, Time Task e Note and Finish;
- links externos fora do cache da Central.

## [v0.1] — 09/07/2026

### Adicionado

- estrutura inicial baseada no Modelo de Projeto pessoal;
- identidade e nome Praça Central;
- apresentação em formato de Hub Inicial;
- galeria com Time Task e Note and Finish;
- catálogo estruturado de aplicações;
- busca por nome, descrição, categoria e tags;
- filtros de Foco e Organização;
- contador de destinos e resultados;
- cards responsivos com identidade própria;
- modal de detalhes das aplicações;
- modal explicativo sobre a Central;
- tema claro e escuro;
- persistência da preferência de tema;
- estado vazio para buscas sem correspondência;
- configuração centralizada dos links externos;
- favicon e manifesto inicial;
- documentação inicial;
- testes manuais planejados.


### Correções de teste da PWA

- adicionado fallback de instalação manual para navegadores sem `beforeinstallprompt`;
- captura antecipada do evento de instalação;
- verificação real de conectividade após recarregamento;
- correção do banner offline em recargas com a rede indisponível;
- identidade estável adicionada ao manifesto por meio do campo `id`.
