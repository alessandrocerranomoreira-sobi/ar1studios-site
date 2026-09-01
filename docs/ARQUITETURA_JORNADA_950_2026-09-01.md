# Arquitetura de jornada AR1 Studios — ciclo 950

Data da implementação: 1º de setembro de 2026. A referência desta entrega é o commit `08e4af5`, enviado para a branch `main` e publicado pela integração GitHub → Vercel. Domínio próprio, contatos e ferramentas externas continuam sujeitos a confirmação.

## Objetivo

Transformar o site em uma jornada comercial orientada por necessidade, mantendo o Haras SOBI como oferta principal e a solicitação de proposta como conversão central.

## Mudanças implementadas

- roteador de intenção na Home com cinco objetivos: conteúdo, estúdio, evento, grande locação e memória;
- CTA secundário do hero direcionado ao roteador de intenção;
- Haras SOBI preservado como destaque principal, com mais de 20 cenários, pista para shows e DVDs e área coberta para até 4 mil pessoas;
- breadcrumbs nas páginas internas;
- três próximos caminhos contextuais em páginas de solução, produto, Haras, método, sobre e capacidades;
- índice de capacidades complementares dentro de Soluções, eliminando páginas órfãs sem ampliar o menu;
- redirecionamento da página antiga de consultoria para `/consultoria-podcast`;
- eventos de mensuração preparados em `dataLayer`, sem envio de dados pessoais;
- preservação de origem UTM no briefing aberto por e-mail ou WhatsApp;
- metadados, URL canônica e JSON-LD específicos gerados no build para 13 rotas internas, além da Home;
- sitemap ampliado com as capacidades agora encontráveis;
- dois mapas de treinamento: visão executiva e mapa detalhado de cliques.

## Fotografias reais do Haras SOBI

- 31 arquivos fornecidos foram inventariados e comparados;
- nove fotografias foram selecionadas para comunicar escala, pista, shows, paisagismo, lago, área coberta, palco e ambientes de recepção;
- cada fotografia ganhou uma versão WebP de até 1600 px e uma versão reduzida de até 900 px;
- o hero do Haras recebeu recorte vertical exclusivo para celular;
- a galeria do Haras usa oito fotografias reais, carregamento tardio e seleção responsiva;
- fotos reais também substituíram referências genéricas nos destaques do Haras, na Home e em produção externa;
- os arquivos originais permanecem preservados fora da pasta pública do site.

## Fachada AR1 Studios

- a fachada fornecida foi convertida para WebP em uma versão de 1600 px e outra vertical para celular;
- ela agora é a imagem principal da Home, para apresentar a marca e seu território já no primeiro contato;
- a hero preserva contraste para leitura, usa o enquadramento vertical correto em telas menores e desloca a fachada no desktop para manter a marca da fachada fora da área de texto.

## Eventos preparados

- `page_view`;
- `cta_click`;
- `intent_select`;
- `service_view`;
- `related_service_click`;
- `carousel_select`;
- `form_start`;
- `form_submit_attempt`;
- `email_open` ou `whatsapp_open`.

Esses eventos são colocados em `window.dataLayer`. A ligação a GA4, Matomo ou outra plataforma depende de decisão, consentimento e identificadores externos.

## Pendências externas — não inventar

- confirmar o número oficial do WhatsApp;
- confirmar a existência e o recebimento do e-mail `contato@ar1studios.com.br`;
- fornecer links sociais oficiais;
- autorizar e fornecer casos, clientes, métricas, depoimentos e imagens comprobatórias;
- escolher e conectar analytics, gerenciador de consentimento e CRM;
- publicar a versão aprovada e validar o domínio de produção.

## Critério de qualidade

O patamar acima de 950 depende da soma entre o que já foi resolvido no produto e as pendências externas. O código agora cobre orientação, retorno, descoberta contextual, conversão, SEO estático e prontidão de mensuração. A comprovação comercial e o fechamento do funil exigem dados e integrações reais do proprietário.
