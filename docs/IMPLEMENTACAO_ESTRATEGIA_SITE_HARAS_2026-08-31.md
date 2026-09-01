# Implementação da nova estratégia do site e Haras SOBI

> **Registro histórico de implementação (31/08/2026).** Para o estado atual, incluindo as fotografias reais, a jornada de consultoria, o hero da fachada e a publicação, consulte [ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md](ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md).

**Data:** 31 de agosto de 2026  
**Branch:** `feat/integracao-manus-2026-08-31`

## Decisão implantada

O site foi reorganizado para apresentar a AR1 como uma empresa de capacidade de mídia, produção e locação. O Haras SOBI passou a ser uma oferta principal integrada à AR1, por atualização expressa do proprietário.

## Arquitetura pública

- `/` — home institucional e comercial;
- `/solucoes` — três famílias de solução;
- `/haras-sobi` — oferta principal de locação e produção;
- `/metodo` — processo e princípios de decisão;
- `/sobre` — posicionamento institucional;
- `/leilao-360` — produto preservado;
- `/filme-de-legado` — produto preservado.

As sete URLs históricas em `/servicos/` continuam funcionando, mas deixaram a navegação e o sitemap. Cada uma foi adaptada à nova arquitetura para preservar links antigos durante a transição.

## Haras SOBI

O site comunica as capacidades autorizadas:

- mais de 20 cenários;
- pista de laço para shows e gravações de DVD;
- espaço coberto para até 4 mil pessoas;
- aplicações em shows, DVDs, clipes, campanhas, filmes, podcasts, entrevistas, transmissões e eventos.

Agenda, áreas, responsabilidades e viabilidade são confirmadas em briefing e proposta.

## Conversão

O formulário foi ampliado para registrar empresa, função, interesse e descrição da necessidade. A opção Haras SOBI é pré-selecionada na página própria.

O envio ainda utiliza `mailto:` porque `siteConfig.whatsappNumber` permanece vazio. Confirmar o e-mail `contato@ar1studios.com.br` e fornecer o WhatsApp comercial antes de campanhas.

## Base técnica

- React 19, TypeScript e Vite preservados;
- nenhuma dependência nova;
- rotas diretas preservadas pelo rewrite da Vercel;
- metadados e sitemap atualizados;
- nova imagem Open Graph em `public/og.png`;
- layout revisado em desktop e mobile;
- menu mobile e tecla Escape verificados;
- build e lint aprovados.

## Integração futura

A fundação Supabase não foi conectada nesta implantação. O formulário só deve gravar solicitações por endpoint seguro com validação, proteção contra abuso e segredos fora do navegador.
