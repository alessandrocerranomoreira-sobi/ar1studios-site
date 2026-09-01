# Estado atual do site — AR1 Studios

**Atualizado em:** 1º de setembro de 2026  
**Código de referência:** `08e4af5` — `style: separar marca e texto na hero`  
**Branch de produção:** `main`  
**Repositório:** https://github.com/alessandrocerranomoreira-sobi/ar1studios-site

Este é o ponto de entrada técnico e operacional para a versão atual. Os documentos datados de 31 de agosto e os materiais em `docs/referencia-documental-v1.1/` são registros históricos: preservam decisões e evidências daquele momento, mas não descrevem o site em produção após esta atualização.

## O que está implementado

- Home com a fachada da AR1 Studios como hero, enquadrada para manter o texto legível à esquerda e a marca da fachada visível à direita; o menu começa com **Home**.
- Haras SOBI tratado como oferta principal e plataforma de locação e produção: mais de 20 cenários, pista de laço para shows e DVDs e espaço coberto para até 4 mil pessoas.
- Galeria responsiva do Haras com fotografias reais fornecidas, em WebP, carregamento tardio e recorte próprio para celular.
- Roteador de intenção na Home para conteúdo recorrente, estúdios, eventos/transmissões, grandes locações e memória/patrimônio.
- Consultoria de podcast como produto completo em `/consultoria-podcast`: diagnóstico, projeto, especificação, implantação, testes, treinamento e evolução.
- Carrossel editorial, projetos e formatos apresentados sem atribuir clientes, resultados, métricas ou depoimentos não autorizados.
- Jornadas relacionadas, breadcrumbs e índice de capacidades para evitar páginas isoladas.
- Formulário de briefing com fallback para e-mail enquanto o WhatsApp oficial não for confirmado.
- Eventos de navegação preparados em `window.dataLayer`, sem dados pessoais e sem plataforma de analytics conectada.
- Metadados estáticos, canonical, Open Graph, JSON-LD e sitemap para as rotas públicas.

## Rotas públicas

| Finalidade | Rota |
| --- | --- |
| Entrada e orientação | `/` |
| Famílias de soluções | `/solucoes` |
| Consultoria de podcast e estúdios | `/consultoria-podcast` |
| Locação e produção | `/haras-sobi` |
| Método de trabalho | `/metodo` |
| Posicionamento institucional | `/sobre` |
| Produto de transmissão | `/leilao-360` |
| Produto de patrimônio | `/filme-de-legado` |
| Capacidades complementares | `/servicos/*` |

A rota legada `/servicos/consultoria-implantacao-estudios-podcast` redireciona permanentemente para `/consultoria-podcast`.

## Onde editar

| Necessidade | Arquivo |
| --- | --- |
| Contatos, ofertas, textos de capacidade, jornadas e imagens vinculadas ao conteúdo | `src/content.ts` |
| Estrutura das páginas, menu, formulário, rotas e interações | `src/App.tsx` |
| Layout, contraste, responsividade e comportamento visual do hero | `src/App.css` |
| Eventos de mensuração | `src/analytics.ts` |
| SEO da Home | `index.html` |
| SEO das páginas internas no build | `scripts/prerender.mjs` |
| URLs indexáveis | `public/sitemap.xml` |
| Assets publicados | `public/media/` |
| Rewrite e cache de mídia | `vercel.json` |

## Publicação e validação

- A publicação observada para esta versão foi acionada pela integração GitHub → Vercel após a atualização da `main`.
- O domínio desejado é `ar1studios.com.br`. Na última checagem anterior, sua resolução DNS não foi confirmada; não o trate como ativo sem nova verificação externa.
- A Vercel usa preset Vite, `npm run build` e saída `dist`.
- Verificações locais concluídas nesta versão: `npm install`, `npm run build` e `npm run lint`.
- Antes de nova publicação, revisar desktop e celular, abrir diretamente `/`, `/leilao-360` e `/filme-de-legado`, conferir assets e validar o formulário.

## Limites conhecidos e próximos insumos

Estas informações não foram inventadas e ainda dependem do proprietário:

1. número comercial de WhatsApp;
2. confirmação de recebimento de `contato@ar1studios.com.br`;
3. URLs oficiais de redes sociais;
4. autorização e material comprovável para cases nomeados, métricas, clientes ou depoimentos;
5. escolha de analytics, consentimento e CRM;
6. confirmação e configuração do domínio próprio.

O site continua estático nesta versão. A base Supabase é uma fundação separada e não recebe leads nem autentica usuários até existir endpoint seguro, validação, proteção contra abuso e variáveis configuradas no ambiente.

## Documentos relacionados

- [Arquitetura de jornada 950](ARQUITETURA_JORNADA_950_2026-09-01.md): decisões de UX, SEO e conversão.
- [Auditoria UI/UX](AUDITORIA_UI_UX_PONTA_A_PONTA_2026-09-01.md): escopo e achados da auditoria; o estado atual deste arquivo prevalece se houver divergência.
- [Implementação visual, projetos e consultoria](IMPLEMENTACAO_VISUAL_CASES_CONSULTORIA_2026-09-01.md): decisões de contraste, carrossel e consultoria.
- [Manual de continuidade](../DOCUMENTACAO_CONTINUIDADE_IA_AR1_STUDIOS.md): infraestrutura, Supabase e histórico técnico, atualizado com um aviso de estado.
- `docs/referencia-documental-v1.1/`: snapshot documental intencionalmente imutável de 31/08/2026.
