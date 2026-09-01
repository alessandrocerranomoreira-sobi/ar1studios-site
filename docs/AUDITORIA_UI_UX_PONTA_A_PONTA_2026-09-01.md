# Auditoria ponta a ponta de UI e UX — AR1 Studios

**Data:** 1º de setembro de 2026  
**Escopo:** versão atualizada e publicada pela branch `main`; referência de código `08e4af5`
**Objetivo:** verificar funcionamento, acessibilidade, responsividade, clareza comercial e qualidade visual; corrigir os problemas encontrados.

## Resultado executivo

A base técnica estava estável, mas havia oportunidades claras de evolução na apresentação e na jornada comercial. A auditoria foi seguida de implementação e nova validação. As 15 rotas avaliadas em desktop e celular passaram sem rolagem horizontal, links vazios, identificadores duplicados, controles sem nome ou falhas de estrutura semântica.

O principal defeito funcional encontrado durante a regressão foi o painel do menu móvel: os links eram renderizados, porém a camada de fundo não ocupava toda a tela por causa do contexto de posicionamento do cabeçalho. O painel foi corrigido e agora ocupa toda a área útil, bloqueia a rolagem da página ao fundo e restaura o comportamento ao fechar.

## O que foi auditado

- home, páginas institucionais, Haras SOBI, Leilão 360 e Filme de Legado;
- sete endereços de serviços mantidos para continuidade;
- página de endereço inexistente;
- navegação principal e menu móvel;
- CTAs e links internos;
- formulário, campos obrigatórios, texto de privacidade e pré-seleção do Haras;
- imagens locais e carregamento tardio;
- títulos, descrições, canonical, Open Graph e Twitter Cards;
- landmarks, títulos H1, labels, nomes acessíveis, IDs e foco visível;
- larguras de 390 × 844 e 1440 × 900;
- build de produção e lint.

## Melhorias implementadas

### Conversão e clareza

- hero principal alinhado à atuação multissetorial de mídia e produção;
- Haras SOBI mantido como oferta principal e com presença visual própria;
- nomenclatura “Ofertas principais” no lugar de “Ofertas de assinatura”;
- formulário apresentado como briefing inicial, com campos obrigatórios explícitos;
- inclusão do fluxo de atendimento: resposta contextual, escopo antes do orçamento e confirmação de agenda/viabilidade;
- aviso claro de que os dados não são armazenados nesta versão.

### UI e acabamento visual

- hierarquia tipográfica e espaçamentos refinados;
- contraste de textos em cobre corrigido sobre superfícies claras;
- cartões com profundidade, movimento discreto e setas de ação;
- cabeçalho com estado visual após rolagem;
- página ativa indicada na navegação;
- menu móvel em tela cheia, numerado e com CTA destacado;
- imagens das ofertas diversificadas para evitar repetição visual;
- redução de densidade vertical em páginas e seções longas.

### Acessibilidade e robustez

- bloqueio da rolagem ao abrir o menu móvel;
- fechamento por controle dedicado, clique externo e tecla Escape;
- fallback para navegadores sem `IntersectionObserver`;
- elementos revelados deixam de ser observados após a entrada;
- formulário com descrições, limites de tamanho, tipos de entrada e região de status;
- preferência por movimento reduzido preservada;
- metadados atualizados dinamicamente para cada rota;
- canonical por página e preload do novo hero.

### Performance

- removido o peso de fonte não utilizado;
- fontes Manrope limitadas ao subconjunto latino e aos pesos realmente usados;
- nenhuma dependência nova foi adicionada;
- arquitetura estática React/Vite e imagens locais foram preservadas.

## Validação final

Foram executadas 30 combinações de rota e viewport: 15 páginas em celular e as mesmas 15 em desktop. O resultado final foi zero falhas nos critérios automatizados de estrutura, overflow, links vazios, IDs duplicados, controles sem nome, título e canonical.

Também foram confirmados:

- menu móvel abre em tela cheia e restaura a rolagem ao fechar;
- quatro campos obrigatórios do formulário são validados pelo navegador;
- o formulário do Haras abre com “Haras SOBI” pré-selecionado;
- todas as imagens referenciadas existem e carregam quando entram na área visível;
- home, `/leilao-360` e `/filme-de-legado` continuam abrindo diretamente;
- build de produção e lint sem erros.

## Pendências externas e decisões do proprietário

Estas pendências não podem ser resolvidas sem dados ou autorização adicional:

1. confirmar o número oficial de WhatsApp;
2. confirmar que `contato@ar1studios.com.br` existe e recebe mensagens;
3. fornecer URLs oficiais das redes sociais;
4. fornecer fotografias próprias e autorizadas para demais projetos; o Haras já utiliza seleção de fotografias reais fornecidas;
5. decidir sobre CRM ou armazenamento de leads; hoje o site apenas prepara o contato externo;
6. revalidar domínio e rotas públicas após qualquer ajuste de DNS ou nova publicação;
7. a página de endereço inexistente é apresentada no cliente, mas o rewrite da SPA pode continuar respondendo HTTP 200 no servidor estático.

## Critério de conclusão desta auditoria

A implementação foi versionada e enviada à `main`. Em cada manutenção futura, build e lint devem passar, as rotas precisam ser revalidadas em desktop e celular e o formulário deve manter destino configurado. A publicação continua dependente da autorização de cada alteração e a validação do domínio depende do DNS.
