# Implementação visual, projetos e consultoria — 2026-09-01

## Objetivo

Corrigir a leitura de textos sobre fotografias em todo o site, ampliar a presença visual, estruturar uma apresentação comercial responsável de projetos e formatos e criar uma jornada completa para a consultoria de podcast e implantação de estúdios.

## Estratégia aplicada

1. **Legibilidade independente da fotografia:** todos os heróis, cards, galerias e legendas sobre imagens receberam proteção de contraste por camadas escuras, cores explícitas e foco de teclado bicolor.
2. **Fotografia como instrumento de decisão:** a home passou a apresentar seis capacidades em um carrossel manual, sem reprodução automática, com miniaturas e controles acessíveis.
3. **Prova sem exagero comercial:** a seção pública foi denominada “Projetos e formatos”. Ela separa capacidade informada, capacidade integrada e método consultivo. Não publica cliente, marca, métrica, depoimento ou resultado sem comprovação e autorização.
4. **Consultoria como produto principal:** a nova rota `/consultoria-podcast` conduz o visitante do diagnóstico à solicitação de proposta e mostra públicos, etapas, entregáveis, decisões, perguntas frequentes e imagens de contexto.
5. **Transparência visual:** fotografias conceituais são identificadas como direção visual e não como registro de clientes ou prova de resultados.

## Entregas realizadas

- contraste reforçado em hero da home, heróis internos, cards de ofertas, galeria do Haras, carrossel e página de consultoria;
- carrossel com seis capítulos visuais, navegação anterior/próxima e seleção por miniaturas;
- seção “Projetos e formatos” com critérios de prova claros;
- bloco estratégico de consultoria na home e em `/solucoes`;
- página completa `/consultoria-podcast`;
- opção de consultoria pré-selecionada no formulário da nova página;
- item “Consultoria” no menu e no rodapé;
- quatro imagens WebP otimizadas e com nomes semânticos;
- sitemap, metadados e palavras-chave atualizados;
- menu móvel com bloqueio de rolagem, foco inicial, contenção de foco e retorno ao botão;
- estrutura semântica e controles acessíveis no carrossel e na jornada consultiva.

## Verificação concluída

- `npm install`: dependências em dia, sem vulnerabilidades;
- `npm run build`: aprovado;
- `npm run lint`: aprovado sem avisos;
- 16 rotas auditadas em 1440 × 900 e 390 × 844;
- nenhum estouro horizontal, link vazio, ID duplicado ou controle sem nome encontrado;
- imagens principais sem falha e 15 referências locais de mídia conferidas, sem arquivo ausente;
- contraste textual conferido nos principais contextos fotográficos;
- menu móvel abre, fecha, bloqueia a rolagem e devolve o foco;
- carrossel troca por setas e miniaturas;
- formulário valida obrigatórios e inicia a consultoria com o interesse correto;
- rotas diretas `/`, `/leilao-360`, `/filme-de-legado` e `/consultoria-podcast` validadas na versão de produção local.

## Pendências externas, não inventadas

- substituir imagens conceituais por fotos reais somente após confirmar origem e direito de uso; a galeria e os destaques do Haras já utilizam a seleção de fotos reais fornecida;
- publicar cases nomeados somente após autorizar cliente, papel da AR1, imagem e resultado;
- revalidar juridicamente e operacionalmente as informações de capacidade do Haras antes de campanhas pagas;
- confirmar número de WhatsApp, e-mail e perfis sociais oficiais;
- revalidar domínio, contatos e redes sociais após configuração pelo proprietário.
