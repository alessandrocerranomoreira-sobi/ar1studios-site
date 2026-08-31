# AR1 Studios: documentação total do site

**Versão do documento:** 1.1 - revisão auditada  
**Data de consolidação:** 31 de agosto de 2026  
**Repositório oficial:** https://github.com/alessandrocerranomoreira-sobi/ar1studios-site  
**Branch de produção:** `main`  
**Commit remoto auditado:** `98eb28a7bb38b738f9533ced1e0a41b64ca04701`  
**Status:** site publicado em produção na Vercel e código disponível no GitHub. Domínio próprio, contatos e adequação do plano de hospedagem continuam pendentes.
**URL pública confirmada:** https://ar1studios-site.vercel.app/  
**Revalidação:** 31/08/2026, 10h18, America/Sao_Paulo (UTC-03:00).

## 0. Resultado da auditoria e limites

Esta revisão atualiza os documentos e o gerador de PDF. Não modifica o código do site, o GitHub, o deploy, o DNS, os contatos ou o plano de hospedagem.

Classificações: **FATO** = verificado no código ou em teste identificado; **DECLARAÇÃO** = orientação do proprietário ou relato documental; **HIPÓTESE** = proposta não implementada; **PENDENTE** = falta confirmação, teste ou decisão. Configuração no código não comprova funcionamento de serviço externo.

| Item | Evidência e situação em 31/08/2026 |
|---|---|
| FATO - GitHub | Repositório público, branch main, commit 98eb28a auditado; 37 arquivos na versão publicada. |
| FATO - Vercel | Status de produção success para o mesmo commit; publicação em 31/08/2026 às 10h05 (UTC-03). |
| FATO - HTTP | Home, Leilão 360 e Filme de Legado responderam 200. Na verificação de publicação, JS, CSS e 11 imagens referenciadas também responderam 200 com tipos corretos. |
| PENDENTE - domínio | ar1studios.com.br e www.ar1studios.com.br não resolveram no ambiente de teste. Isso não comprova registro, disponibilidade para compra ou titularidade. |
| PENDENTE - contato | WhatsApp vazio; redes com #; caixa de e-mail e entrega de mensagens não confirmadas. |
| FATO - formulário | Apenas prepara WhatsApp ou e-mail; não envia nem salva leads por conta própria. |
| FATO - documentos | Manual, AGENTS e gerador estão no ZIP anexado, mas não no commit remoto auditado. Esta revisão também não foi enviada ao GitHub. |
| PENDENTE - plano | A captura fornecida mostrava Hobby. O plano atual não foi revalidado no painel; confirmar adequação ao uso comercial. |
| PENDENTE - testes | QA interativo desktop/mobile, leitor de tela e recebimento real do formulário não foram executados nesta revisão. HTTP 200 não equivale a esses testes. |

Fontes: [commit auditado](https://github.com/alessandrocerranomoreira-sobi/ar1studios-site/commit/98eb28a7bb38b738f9533ced1e0a41b64ca04701), seus arquivos, [site público](https://ar1studios-site.vercel.app/) e status Vercel consultado pela API GitHub. Relatório de diferenças: docs/REVISAO_2026-08-31.md.

O ZIP de entrada contém 35 arquivos idênticos aos publicados, diferenças em README e .gitignore e quatro arquivos adicionais de documentação. Nenhuma diferença foi encontrada no código da aplicação ou nas imagens. Estados e números são uma fotografia datada, não garantias permanentes.

---

## 1. Objetivo deste documento

Este é o manual mestre do site da AR1 Studios. Ele reúne histórico, estratégia, arquitetura, programação, estrutura de pastas, lógica dos componentes, rotas, assets, implantação, manutenção, diagnóstico de erros e evolução futura.

Deve permitir que qualquer desenvolvedor, agência, operador ou IA consiga:

- entender por que o site existe e o que ele precisa vender;
- localizar qualquer texto, imagem, estilo ou comportamento;
- instalar e executar o projeto localmente;
- alterar conteúdo sem quebrar o layout;
- criar ou remover seções e páginas;
- configurar WhatsApp, e-mail e redes sociais;
- publicar ou reparar o deploy na Vercel;
- conectar CRM, Supabase ou analytics no futuro;
- auditar performance, SEO, acessibilidade e conversão;
- restaurar uma versão estável se uma alteração falhar.

### Regra principal

O objetivo comercial declarado é posicionar, apresentar serviços e iniciar contatos. Não há dados auditados de conversão ou fechamento. Na implementação atual, as funções pretendidas são:

1. posicionar a AR1 como casa de conteúdo premium do agronegócio;
2. provar capacidade de forma rápida e visual;
3. levar o visitante a solicitar uma proposta.

---

## 2. Histórico resumido do processo

### 2.1 Base estratégica

A versão 1.0 associa o projeto à criação de uma casa de conteúdo com Alessandro e Rui. Esse relato não comprova constituição societária ou fatos históricos. Esta revisão técnica não consultou o dossiê privado nem valida informações societárias. Contexto estratégico privado não deve ser incorporado ao repositório público.

### 2.2 Posicionamento definido

FATO: o site atual se apresenta como casa de conteúdo do agro. DECLARAÇÃO: o proprietário discutiu uma produtora independente, com possibilidade de atender outros mercados e separar atividades da Agro Legacy. O recorte do site não comprova exclusividade de toda a empresa no agro. PENDENTE: decidir entre vitrine vertical do agro e comunicação institucional multissetorial. Nenhuma copy foi alterada nesta revisão.

### 2.3 Nome e narrativa

DECLARAÇÃO confirmada na conversa: nome **AR1 Studios** e domínio pretendido **ar1studios.com.br**. O proprietário rejeitou a explicação “AR/no ar” e pediu um conceito mais forte, sem vincular o nome às iniciais dos fundadores. “O primeiro sinal”, apresentado pela versão 1.0 como obrigatório, não está validado como conceito aprovado. A assinatura final permanece PENDENTE de consolidação explícita; esta revisão não cria uma nova aprovação.

### 2.4 Produtos e escada comercial

A escada principal ficou assim:

1. **Leilão 360:** porta de entrada, com aquecimento, transmissão e melhores momentos;
2. **AR1 Stories:** conteúdo recorrente mensal;
3. **Filme de Legado:** produto premium, documental e cinematográfico;
4. **Pacote anual:** combinação de mídia, eventos, projetos autorais e recorrência.

O site evita tabela pública de diária. O objetivo é conduzir o visitante para uma conversa comercial e proposta dimensionada.

### 2.5 Identidade visual

A identidade foi construída para ser premium, cinematográfica, forte no agro e expansível para outros mercados. Foram descartados clichês como câmera, claquete, microfone, play button, antena, ondas, globo, lente e estética tecnológica genérica.

A versão 1.0 descrevia o master da seguinte forma, sem incluir no pacote um master vetorial que permita validar essa especificação:

- ligadura AR em tom Osso;
- numeral 1 em Cobre;
- filete duplo;
- palavra STUDIOS com espaçamento amplo.

FATO técnico: o arquivo usado é public/media/ar1-logo.png, PNG RGBA de 1042 x 489 pixels, com canal alfa de 0 a 255. Isso confirma transparência, não construção do master ou aprovação de identidade.

### 2.6 Documento estratégico do site

A versão 1.0 relata um documento estratégico anterior com:

- arquitetura da home;
- páginas de apoio;
- copy de conversão;
- lógica comercial;
- SEO;
- WhatsApp e analytics;
- checklist técnico;
- prompts de imagens.

FATO: a implementação usa React, TypeScript e Vite. public/media contém 13 WebP e um PNG de logo (14 arquivos); 10 WebP e o logo têm referências diretas na interface/HTML, e três WebP são reservas. Origem, licença e autorização comercial das imagens não são comprovadas pelo pacote.

---

## 3. Identidade e regras de marca

### 3.1 Paleta Terra Cinema

| Token | Hexadecimal | Uso recomendado |
|---|---:|---|
| Preto Frame | `#111315` | fundo principal, hero, rodapé |
| Grafite | `#292D30` | seções, cartões, formulário |
| Osso | `#F2EFE8` | títulos, textos principais, logo |
| Cobre | `#B86B45` | CTA, destaques, etiquetas, foco |
| Bruma | `#B9C0BF` | textos secundários e apoio |

As mesmas cores estão declaradas como variáveis CSS em `src/App.css`, dentro de `:root`.

### 3.2 Tipografia

A família usada é **Manrope**, instalada no projeto pelo pacote `@fontsource/manrope`. Ela é carregada localmente, sem depender do Google Fonts durante a visita.

Pesos usados:

- 400: corpo de texto;
- 500: apoio;
- 600: navegação;
- 700: subtítulos;
- 800: títulos, etiquetas e CTA.

### 3.3 Tom de voz

O texto deve ser:

- direto;
- seguro;
- premium sem exagero;
- ligado a negócio, patrimônio, presença e permanência;
- compreensível por decisores do agro;
- sem excesso de jargão audiovisual.

Evitar frases genéricas como “transformamos sonhos em realidade”, “qualidade e inovação” e “somos apaixonados por contar histórias” sem prova ou consequência comercial.

### 3.4 Narrativa pública

Separar implementação de aprovação:

- FATO: “Sinal. Presença. Conteúdo que permanece.” ainda aparece no Footer publicado. É texto legado, não confirmação de conceito aprovado.
- FATO: “Seu legado merece mais do que um vídeo. Merece um ativo.” é o título atual da home.
- DECLARAÇÃO: não explicar AR1 como iniciais dos fundadores nem insistir em “no ar”.
- PENDENTE: aprovar assinatura e harmonizar site, manual e identidade. Atualizar documentos não altera automaticamente o site.

---

## 4. Objetivos de negócio e conversão

### 4.1 Público prioritário

- proprietários de fazendas e haras;
- criadores e selecionadores;
- organizadores de leilões;
- marcas e fornecedores do agronegócio;
- associações, eventos e projetos de patrimônio familiar;
- gestores que precisam de comunicação recorrente.

### 4.2 Conversão principal

A ação principal é **Solicitar proposta**.

No site atual, o formulário coleta:

- nome;
- WhatsApp;
- empresa ou fazenda;
- tipo de projeto;
- data prevista.

### 4.3 Conversões secundárias

- conhecer Leilão 360;
- conhecer Filme de Legado;
- visualizar projetos;
- entrar em contato por e-mail;
- acessar redes sociais, quando configuradas.

### 4.4 Indicadores recomendados

Quando analytics for instalado, acompanhar:

- visitas por origem;
- cliques em “Solicitar proposta”;
- início de preenchimento do formulário;
- tentativa de abrir canal de contato, separada de mensagem efetivamente enviada;
- cliques em e-mail e WhatsApp;
- acesso a `/leilao-360`;
- acesso a `/filme-de-legado`;
- taxa de conversão visita para lead confirmado, somente com evidência de recebimento;
- lead para reunião;
- reunião para proposta;
- proposta para contrato.

---

## 5. Arquitetura técnica

### 5.1 Tipo de aplicação

O site é uma **Single Page Application estática**, construída com React. A aplicação é compilada pelo Vite para arquivos estáticos dentro de `dist/`.

Não existe servidor próprio, banco, login, CMS ou API nesta versão.

### 5.2 Tecnologias

| Tecnologia | Faixa no package.json | Resolvida no lock |
|---|---|---|
| React / React DOM | ^19.2.8 | 19.2.8 |
| TypeScript | ~6.0.2 | 6.0.3 |
| Vite | ^8.2.2 | 8.2.2 |
| Plugin React do Vite | ^6.1.0 | 6.1.1 |
| Manrope Fontsource | ^5.3.0 | 5.3.0 |
| Oxlint | ^1.79.0 | 1.80.0 |

Ambiente local usado: Node.js 24.16.0 e npm 11.13.0. O projeto não fixa engines ou .nvmrc. Vite, plugin React e Oxlint no lock exigem Node ^20.19.0 ou >=22.12.0; “qualquer Node 22” é impreciso. Para reproduzir, usar o ambiente validado e npm ci. A versão Node da Vercel não foi inspecionada. [Compatibilidade Vite](https://vite.dev/guide/).

### 5.3 Por que essa arquitetura foi escolhida

- baixo custo de hospedagem;
- deploy rápido na Vercel;
- poucas dependências;
- fácil edição por pessoas e IAs;
- bom desempenho;
- sem banco desnecessário;
- baixa superfície de falha;
- imagens servidas localmente;
- conteúdo concentrado em poucos arquivos.

### 5.4 Limitação consciente

As rotas são decididas no cliente pela leitura de `window.location.pathname`. Não foi instalada uma biblioteca de roteamento. Isso reduz complexidade, mas significa que novas rotas precisam ser adicionadas manualmente em `src/App.tsx` e no `vercel.json` deve continuar existindo o rewrite para `index.html`.

---

## 6. Estrutura do pacote documentado e do repositório

A árvore abaixo representa o pacote documentado. AGENTS.md, este manual e docs/ são acréscimos locais, ausentes no commit remoto auditado. README e .gitignore do ZIP de entrada também diferem do remoto. Esta revisão não foi publicada.

```text
ar1studios-site/
├── .gitignore
├── .oxlintrc.json
├── AGENTS.md                         # guia operacional para IAs
├── DOCUMENTACAO_TOTAL_AR1_STUDIOS.md # este manual
├── docs/                            # PDF, gerador e relatório de revisão
├── README.md                         # início rápido
├── index.html                        # HTML base, SEO e Open Graph
├── package.json                      # dependências e scripts
├── package-lock.json                 # versões resolvidas
├── tsconfig.json                     # composição TypeScript
├── tsconfig.app.json                 # regras do código da aplicação
├── tsconfig.node.json                # regras dos arquivos Node/Vite
├── vercel.json                       # rewrite e cache dos assets
├── vite.config.ts                    # plugin React
├── public/
│   ├── robots.txt                    # regras para buscadores
│   ├── sitemap.xml                   # URLs públicas
│   ├── favicon.svg                   # arquivo legado, não é o favicon ativo
│   ├── icons.svg                     # arquivo legado, não utilizado atualmente
│   └── media/
│       ├── ar1-logo.png
│       ├── camera-auction-vertical.webp
│       ├── camera-auction.webp
│       ├── cattle-rays.webp
│       ├── cattle-wide.webp
│       ├── edit-suite.webp
│       ├── event-stage.webp
│       ├── fields-square.webp
│       ├── glow-horizontal.webp
│       ├── glow-vertical.webp
│       ├── hero-fields.webp
│       ├── horse.webp
│       ├── mist-fields.webp
│       └── mist-vertical.webp
└── src/
    ├── App.css          # todo o sistema visual e responsivo
    ├── App.tsx          # componentes, páginas, rotas e formulário
    ├── content.ts       # textos, contatos, serviços, ofertas, projetos e FAQ
    ├── index.css        # regras globais mínimas
    ├── main.tsx         # entrada e montagem do React
    └── assets/          # arquivos legados do template; não usados no site final
```

### 6.1 Arquivos legados

Os seguintes arquivos não são usados pela aplicação atual:

- `public/favicon.svg`;
- `public/icons.svg`;
- `src/assets/hero.png`;
- `src/assets/react.svg`;
- `src/assets/vite.svg`.

Eles podem ser removidos em uma limpeza futura, desde que o build seja testado depois. O favicon ativo está definido em `index.html` como `/media/ar1-logo.png`.

---

## 7. Fluxo de inicialização da aplicação

### 7.1 Entrada HTML

`index.html` contém:

- idioma `pt-BR`;
- viewport responsivo;
- cor do navegador;
- descrição e palavras-chave;
- Open Graph;
- favicon;
- preload da imagem principal;
- elemento `<div id="root"></div>`;
- importação de `/src/main.tsx`.

### 7.2 Montagem do React

`src/main.tsx`:

1. importa `StrictMode`;
2. importa `createRoot`;
3. carrega `src/index.css`;
4. importa o componente `App`;
5. encontra o elemento `#root`;
6. renderiza `<App />` dentro de `<StrictMode>`.

### 7.3 Componente raiz

`src/App.tsx` faz duas tarefas principais:

1. cria um `IntersectionObserver` para revelar elementos `.reveal` conforme entram na tela;
2. lê `window.location.pathname` e escolhe a página correta.

Lógica atual:

```ts
const path = window.location.pathname;
if (path === "/leilao-360") return <ProductPage type="live" />;
if (path === "/filme-de-legado") return <ProductPage type="legacy" />;
return <Home />;
```

Qualquer caminho não reconhecido retorna a home, inclusive /leilao-360/ e /filme-de-legado/ com barra final, pois a comparação é exata. O endereço inexistente testado retornou HTTP 200: não existe 404 real. PENDENTE: normalizar barras finais e tratar rotas desconhecidas, com status HTTP adequado quando aplicável. Nada disso foi alterado nesta revisão documental.

---

## 8. Rotas e páginas

| Caminho | Componente | Objetivo |
|---|---|---|
| `/` | `Home` | posicionamento, prova, serviços, projetos e lead |
| `/leilao-360` | `ProductPage type="live"` | vender a solução Leilão 360 |
| `/filme-de-legado` | `ProductPage type="legacy"` | vender o Filme de Legado |

### 8.1 Home

A home contém, na ordem:

1. `Header` fixo;
2. hero com proposta central;
3. faixa de formatos;
4. seção de mudança de perspectiva;
5. grade com quatro frentes;
6. escada de ofertas;
7. processo em quatro etapas;
8. portfólio visual;
9. seção institucional;
10. FAQ;
11. contato com formulário;
12. `Footer`.

### 8.2 Páginas de produto

Um único componente `ProductPage` atende as duas páginas. A propriedade `type` escolhe o conteúdo.

Quando `type === "live"`, a página usa:

- etiqueta AR1 LIVE;
- título do pregão;
- imagem de evento;
- projeto padrão “Leilão 360”;
- pontos de aquecimento, transmissão e melhores momentos.

Quando `type === "legacy"`, usa:

- etiqueta AR1 FILMS;
- título de patrimônio;
- imagem de cavalo;
- projeto padrão “Filme de Legado”;
- pontos de pesquisa, captação e filme final.

A reutilização evita duplicação. Uma correção feita no layout beneficia as duas páginas.

---

## 9. Componentes e lógica

### 9.1 `Logo`

Caminho: `src/App.tsx`.

Recebe a propriedade opcional `compact`. Usa `/media/ar1-logo.png`. O modo compacto reduz o logo no rodapé.

### 9.2 `Header`

Responsabilidades:

- mostrar o logo;
- manter navegação fixa;
- controlar menu mobile com estado `open`;
- fechar o menu após um link ser clicado;
- exibir CTA principal.

Estado:

```ts
const [open, setOpen] = useState(false);
```

Em telas de até 900 px, inclusive, a navegação fica oculta e aparece ao tocar no botão do menu, conforme @media (max-width: 900px).

### 9.3 `Footer`

Usa dados de `siteConfig` para e-mail e redes sociais. Enquanto uma rede estiver com valor `#`, o link não leva a um perfil real. Isso precisa ser configurado antes de campanhas pagas ou publicação definitiva.

### 9.4 `Reveal`

Envolve conteúdos que devem entrar com animação suave.

```tsx
<div className={`reveal ${className}`}>{children}</div>
```

O `IntersectionObserver` adiciona a classe `.visible`. O CSS muda opacidade e posição vertical.

Para usuários que preferem menos movimento, a regra `prefers-reduced-motion` remove as transições.

### 9.5 `ContactForm`

Estado local:

```ts
type LeadForm = {
  name: string;
  phone: string;
  company: string;
  project: string;
  date: string;
};
```

O formulário recebe `defaultProject`. Isso preenche automaticamente “Leilão 360” ou “Filme de Legado” nas páginas específicas.

No envio:

1. evita o envio HTML padrão com `event.preventDefault()`;
2. monta uma mensagem de texto com os cinco campos;
3. verifica se siteConfig.whatsappNumber é não vazio; não valida existência do número;
4. se houver valor, tenta abrir wa.me com mensagem pré-preenchida;
5. se não houver, solicita abertura de mailto: pelo navegador;
6. exibe texto em aria-live="polite", sem detectar abertura efetiva ou entrega.

O visitante ainda precisa enviar a mensagem no aplicativo externo. O status atual afirma que o aplicativo abriu, sem comprovar sucesso. O fallback também expõe instrução de desenvolvedor citando src/content.ts. PENDENTE: substituir esse aviso, testar bloqueadores e ausência de cliente de e-mail. Não houve envio real nesta auditoria.

Pseudocódigo:

```text
SE whatsappNumber estiver preenchido
  abrir WhatsApp em nova aba com mensagem pré-preenchida
SENÃO
  abrir aplicativo de e-mail com assunto e mensagem
FIM
```

### 9.6 Estado e persistência

A aplicação guarda campos apenas em estado React durante a interação, sem banco, CRM ou armazenamento persistente implementado. Recarregar reinicializa o estado, embora o navegador possa restaurar/autopreencher campos. Ao clicar, os dados entram na URL do WhatsApp ou no mailto:. Isso não exclui logs de hospedagem, recursos do navegador ou tratamento pelo provedor externo.

---

## 10. Conteúdo centralizado em `src/content.ts`

Esse é o primeiro arquivo para contatos e arrays comerciais, mas não centraliza todo o conteúdo: títulos, copy institucional, textos das páginas de produto e mensagens do formulário também estão em src/App.tsx. Os campos brand e domain de siteConfig não são consumidos pelo App atual. Domínio e SEO estão escritos separadamente em index.html, robots.txt e sitemap.xml; alterar siteConfig.domain não os atualiza.

### 10.1 `siteConfig`

```ts
export const siteConfig = {
  brand: "AR1 STUDIOS",
  domain: "ar1studios.com.br",
  email: "contato@ar1studios.com.br",
  whatsappNumber: "",
  instagramUrl: "#",
  youtubeUrl: "#",
  linkedinUrl: "#",
} as const;
```

#### Configuração do WhatsApp

Preencher somente com números:

```ts
whatsappNumber: "5562999999999",
```

Formato:

- `55`: Brasil;
- `62`: DDD de exemplo;
- restante: telefone.

Não usar `+`, espaços, parênteses ou traços.

### 10.2 `services`

Controla os quatro cartões:

- AR1 Live;
- AR1 Films;
- AR1 Stories;
- AR1 Originals.

Cada item possui:

```ts
{
  key,
  name,
  title,
  body,
  image,
  href
}
```

### 10.3 `offers`

Controla a escada de ofertas. Cada item possui `name`, `tag`, `body` e `href`.

### 10.4 `portfolio`

Controla seis blocos visuais. Cada item possui `image`, `title` e `type`.

No estágio atual, os títulos são posicionamento editorial, não estudos de caso com nomes de clientes e métricas. Quando houver autorizações, recomenda-se adicionar nome do cliente, desafio, solução e resultado.

### 10.5 `processSteps`

Array de pares `[nome, descrição]`. A ordem dos itens é a ordem exibida.

### 10.6 `faq`

Array de pares `[pergunta, resposta]`. Cada par vira um elemento nativo `<details>`.

---

## 11. Sistema visual e CSS

### 11.1 Arquivo principal

Todo o design está em `src/App.css`. Não há Tailwind, Sass, styled-components nem biblioteca de componentes.

### 11.2 Tokens globais

Em `:root` estão as cores e configurações básicas. Alterar um token atualiza várias seções.

### 11.3 Escala responsiva

O layout usa:

- `clamp()` para tipografia e espaçamento;
- CSS Grid para estruturas maiores;
- Flexbox para navegação e botões;
- `aspect-ratio` para mídia;
- breakpoint principal em `900px`;
- unidades `dvh` no hero e áreas fixas;
- `object-fit: cover` para enquadramento.

### 11.4 Hero

O hero ocupa no mínimo `100dvh`. A imagem fica absoluta, cobrindo toda a área. Duas camadas de gradiente garantem legibilidade do texto.

A imagem prioritária recebe `fetchPriority="high"` no React e preload no `index.html`.

### 11.5 Navegação

Desktop:

- header fixo;
- backdrop blur;
- links em linha;
- CTA contornado em Cobre.

Mobile:

- botão com duas linhas;
- menu vertical abaixo do header;
- fundo quase opaco.

### 11.6 Grades assimétricas

As grades de serviços e portfólio usam proporções diferentes para evitar aparência de template genérico. Em mobile, todas viram uma coluna.

### 11.7 Formulário

O formulário tem duas colunas no desktop e uma no mobile. Usa campos nativos e foco visível em Cobre. Isso não comprova contraste acessível em todos os estados, fundos ou fotografias.

### 11.8 Animação

A única animação estrutural é a revelação de blocos. Hover de imagens e botões adiciona movimento discreto. Não existe scroll-scrub ou vídeo de fundo nesta versão.

---

## 12. Mapa de imagens

Todos os assets usados pelo site ficam em `public/media/` e podem ser referenciados como `/media/nome-do-arquivo.ext`.

| Arquivo | Uso atual |
|---|---|
| `ar1-logo.png` | header, footer e favicon |
| `hero-fields.webp` | hero, portfólio e Open Graph |
| `camera-auction.webp` | AR1 Live e página Leilão 360 |
| `camera-auction-vertical.webp` | seção institucional |
| `cattle-rays.webp` | mudança de perspectiva e portfólio |
| `cattle-wide.webp` | página Filme de Legado |
| `edit-suite.webp` | AR1 Stories e processo |
| `event-stage.webp` | AR1 Originals, portfólio e hero Leilão 360 |
| `horse.webp` | AR1 Films, portfólio e hero Filme de Legado |
| `glow-horizontal.webp` | fundo da seção de contato |
| `fields-square.webp` | reserva visual, não usado atualmente |
| `glow-vertical.webp` | reserva visual, não usado atualmente |
| `mist-fields.webp` | portfólio |
| `mist-vertical.webp` | reserva visual, não usado atualmente |

### 12.1 Tratamento realizado

FATO: os 13 WebP têm maior lado de até 1800 px e nomes semânticos; são servidos como arquivos locais. O logo PNG tem transparência, 1042 x 489 px e 67.761 bytes.

A qualidade de exportação “84” e a alegada conversão a partir de um master escuro são relatos da versão 1.0, não comprovados pelos arquivos finais. Não repetir como parâmetros auditados. Direitos de uso e eventual geração por IA permanecem PENDENTES de confirmação.

### 12.2 Como substituir uma imagem

1. preparar arquivo WebP ou PNG otimizado;
2. usar nome sem espaços e em minúsculas;
3. colocar em `public/media/`;
4. atualizar o caminho em `src/content.ts` ou `src/App.tsx`;
5. manter texto alternativo adequado;
6. executar `npm run build`;
7. verificar desktop e mobile.

### 12.3 Tamanhos recomendados

- hero horizontal: 1920 × 1080 ou maior, até 500 KB após otimização;
- cartão horizontal: 1600 × 900;
- vertical: 1200 × 1600 ou 1200 × 1800;
- logo transparente: largura mínima de 1000 px;
- Open Graph futuro: 1200 × 630.

### 12.4 Placeholder

Se faltar uma imagem, não deixar o elemento quebrado. As opções são:

1. reutilizar temporariamente `glow-horizontal.webp` para área horizontal;
2. reutilizar `mist-vertical.webp` para área vertical;
3. criar um bloco em Grafite com etiqueta “Imagem em produção”;
4. registrar a substituição necessária em uma issue do GitHub.

---

## 13. SEO e compartilhamento

### 13.1 `index.html`

Contém:

- `<title>`;
- meta description;
- keywords;
- `og:title`;
- `og:description`;
- `og:type`;
- `og:url`;
- `og:image`;
- favicon;
- preload do hero.

### 13.2 `public/robots.txt`

Libera rastreamento e aponta para:

```text
https://ar1studios.com.br/sitemap.xml
```

### 13.3 `public/sitemap.xml`

Lista:

- `/`;
- `/leilao-360`;
- `/filme-de-legado`.

Toda nova página pública deve ser adicionada ao sitemap.

### 13.4 Limitação atual de SEO

Como a aplicação é SPA estática, todas as rotas compartilham o mesmo HTML inicial e as mesmas metatags. Para SEO mais avançado por página, há três caminhos:

1. usar um plugin de prerender;
2. migrar para framework com renderização estática por rota;
3. gerar páginas HTML separadas.

PENDENTE: definir prioridade conforme a estratégia de aquisição. O problema imediato é que og:url, og:image, robots.txt e sitemap.xml apontam para ar1studios.com.br, que não resolveu no teste. A existência desses arquivos não comprova indexação nem compartilhamento correto. Após confirmar o domínio canônico, harmonizar todas as referências e testar. A tag keywords existe, mas sua presença não demonstra resultado de SEO. Nesta revisão não houve alteração de HTML ou DNS.

---

## 14. Instalação local

### 14.1 Pré-requisitos

- Git;
- Node.js compatível com os engines do lock; ambiente testado: 24.16.0;
- npm do ambiente testado: 11.13.0;
- editor como VS Code.

### 14.2 Clonar

```bash
git clone https://github.com/alessandrocerranomoreira-sobi/ar1studios-site.git
cd ar1studios-site
```

### 14.3 Instalar

```bash
npm ci
```

Usar o package-lock.json existente para instalação reprodutível; npm ci substitui node_modules da pasta atual. npm install fica reservado a alterações deliberadas de dependências, com revisão do diff no lock. Na validação inicial foi usado npm ci --ignore-scripts --no-audit --no-fund; build e lint passaram. Isso não equivale a uma auditoria de vulnerabilidades.

### 14.4 Executar

```bash
npm run dev
```

O terminal exibirá um endereço local, normalmente `http://localhost:5173`.

### 14.5 Compilar

```bash
npm run build
```

Esse comando executa:

```text
tsc -b && vite build
```

Primeiro valida TypeScript. Depois gera a versão final em `dist/`.

### 14.6 Visualizar o build

```bash
npm run preview
```

### 14.7 Lint

```bash
npm run lint
```

O comando de lint executado antes da publicação retornou exit code 0, sem diagnósticos. Não houve auditoria automatizada de acessibilidade, segurança ou comportamento em navegador.

---

## 15. Scripts npm

| Comando | Resultado |
|---|---|
| `npm run dev` | servidor de desenvolvimento com atualização automática |
| `npm run build` | valida TypeScript e gera `dist/` |
| `npm run lint` | executa Oxlint |
| `npm run preview` | serve localmente o conteúdo compilado |

Não editar `package-lock.json` manualmente. Ele deve ser atualizado pelo npm.

---

## 16. GitHub e controle de versão

### 16.1 Repositório

```text
https://github.com/alessandrocerranomoreira-sobi/ar1studios-site
```

### 16.2 Branch principal

```text
main
```

A Vercel deve acompanhar essa branch. Cada envio para `main` cria um novo deploy de produção quando a integração está ativa.

### 16.3 Fluxo recomendado para alterações

```bash
git switch -c tipo/descricao-curta
# editar e testar dentro da raiz do site
git status --short
# revisar git diff; adicionar somente arquivos pertinentes
git add -- CAMINHO_DO_ARQUIVO_REVISADO
git commit -m "tipo: descrição da alteração"
git push -u origin tipo/descricao-curta
```

Depois, abrir Pull Request para `main`.

### 16.4 Convenção de commits

- `feat:` nova função ou seção;
- `fix:` correção;
- `content:` texto ou imagem;
- `style:` mudança visual;
- `docs:` documentação;
- `refactor:` reorganização sem mudar comportamento;
- `perf:` performance;
- `chore:` manutenção.

### 16.5 Restaurar versão anterior

Ver histórico:

```bash
git log --oneline
```

Criar uma branch a partir de um commit estável:

```bash
git checkout -b recovery/<data> <HASH_DO_COMMIT>
```

Evitar `git push --force` em `main`. Preferir `git revert <HASH>` para desfazer uma mudança publicada.

---

## 17. Deploy na Vercel

### 17.1 Projeto existente e configuração de referência

FATO: o projeto ar1studios-site já existe e publicou a branch main. Não reimportar nem criar projeto duplicado para uma manutenção normal. O deploy inicial foi concluído em 31/08/2026 às 10h05, no commit indicado no início do manual.

A URL pública estável é https://ar1studios-site.vercel.app/. A URL específica gerada para o deploy redirecionou ao login Vercel no teste anônimo; não confundir essa proteção com indisponibilidade do domínio público estável.

A lista abaixo é referência para reconstrução somente se necessária. O preset e os campos do painel não foram reabertos nesta auditoria; o código confirma build e diretório de saída, e o deploy comprova publicação. No painel da Vercel:

1. New Project;
2. importar `alessandrocerranomoreira-sobi/ar1studios-site`;
3. selecionar a equipe proprietária e confirmar plano compatível com uso comercial;
4. Project Name: `ar1studios-site`;
5. Application Preset: `Vite`;
6. Root Directory: `./`;
7. Build Command: `npm run build`;
8. Output Directory: `dist`;
9. Install Command recomendado: npm ci; registrar o valor efetivo do painel ao inspecioná-lo;
10. Environment Variables: nenhuma na versão atual;
11. Deploy.

### 17.1.1 Alerta de plano comercial

A documentação oficial limita Hobby a uso pessoal e não comercial. A captura fornecida mostrava esse plano, mas o estado atual de cobrança não foi confirmado. Como o site promove serviços comerciais, o responsável deve verificar a adequação do plano antes de ampliar a operação; pode ser necessário um plano compatível ou outra hospedagem. Nenhuma compra, migração ou mudança de plano está autorizada por este manual. [Vercel Hobby](https://vercel.com/docs/plans/hobby).

### 17.2 Função de `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/media/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

O rewrite faz com que `/leilao-360` e `/filme-de-legado` carreguem a aplicação mesmo quando abertas diretamente.

O cache longo acelera imagens. Como o cache é imutável, ao substituir uma imagem recomenda-se mudar também seu nome, por exemplo `hero-fields-v2.webp`.

### 17.3 Configurar domínio

No projeto Vercel:

1. Settings;
2. Domains;
3. adicionar `ar1studios.com.br`;
4. adicionar também `www.ar1studios.com.br`;
5. copiar os registros DNS sugeridos;
6. configurar no Registro.br;
7. escolher redirecionamento entre raiz e www;
8. verificar resolução DNS, emissão de certificado e redirecionamentos.

Usar os valores específicos exibidos para o projeto, sem copiar IPs de tutoriais antigos. Preservar os registros existentes de e-mail e verificação (MX/TXT e outros); trocar nameservers exige migrar a zona necessária. Hospedar o site não cria a caixa de e-mail. [Domínio na Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain) e [DNS e e-mail](https://vercel.com/docs/domains/managing-dns-records).

FATO observado: raiz e www não resolveram no teste de 31/08/2026. Registro, titularidade e configuração no provedor não foram consultados. Domínio não resolvido não significa automaticamente domínio disponível para compra.

### 17.4 Teste pós-deploy

Abrir:

- URL principal;
- `/leilao-360` diretamente;
- `/filme-de-legado` diretamente;
- imagem `/media/hero-fields.webp`;
- formulário em desktop e celular.

Verificar console do navegador e aba Network para erros 404.

---

## 18. Formulário, WhatsApp e e-mail

### 18.1 Situação atual

`whatsappNumber` está vazio. Enquanto isso, o formulário abre:

```text
mailto:contato@ar1studios.com.br
```

É necessário confirmar que esse e-mail existe e recebe mensagens. O código apenas monta um mailto:. Sem cliente de e-mail configurado, ele pode não abrir; a mensagem não é enviada automaticamente. O domínio não resolveu no teste, portanto a recepção dessa caixa não pode ser presumida. Não houve teste real de envio.

### 18.2 Ativar WhatsApp

Editar `src/content.ts`:

```ts
whatsappNumber: "55DDDNÚMERO",
```

Exemplo fictício:

```ts
whatsappNumber: "5562999999999",
```

Depois executar build e publicar.

### 18.3 Riscos do modelo atual

- o lead não fica salvo se fechar a janela;
- bloqueadores podem impedir abertura de nova aba;
- não existe painel de contatos;
- não existe proteção contra spam porque não existe envio ao servidor;
- não há confirmação de entrega.

### 18.4 Quando usar Supabase

Supabase passa a ser útil quando for necessário:

- armazenar leads;
- criar painel comercial;
- registrar origem e campanha;
- acompanhar status do atendimento;
- exportar contatos;
- integrar CRM.

### 18.5 Modelo de dados futuro

HIPÓTESE: esboço de tabela leads, não implementado. Não executar automaticamente nem tratar como migração pronta; requer revisão de segurança, retenção e finalidade dos dados. RLS precisa estar habilitado antes de qualquer exposição; políticas e endpoint não são fornecidos por este esboço:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  company text not null,
  project text not null,
  expected_date date,
  source text,
  campaign text,
  status text not null default 'new',
  notes text
);
alter table public.leads enable row level security;
-- Nenhuma policy publica de leitura ou escrita e criada aqui.
```

### 18.6 Regras de segurança para Supabase

Não colocar service_role, secret keys ou outras credenciais privilegiadas no navegador. O desenho de integração e suas permissões devem ser revisados antes de implementação. Uma chave pública não substitui controle de acesso. O esboço anterior não libera inserts da aplicação e não constitui integração pronta.

Se houver endpoint público:

- validar todos os campos;
- limitar tamanho;
- usar rate limiting ou CAPTCHA;
- definir aviso, finalidade, base legal e retenção com o responsável; não presumir que consentimento é sempre a base aplicável;
- impedir leitura pública da tabela;
- guardar segredos somente no ambiente do servidor: variável de ambiente não garante sigilo se for incorporada ao bundle; nunca usar prefixo VITE_ para segredos.

O endereço de painel fornecido anteriormente não é uma credencial e não deve ser embutido no código.

---

## 19. Analytics e eventos

### 19.1 Soluções possíveis

- Vercel Web Analytics;
- Google Analytics 4;
- Google Tag Manager;
- Meta Pixel;
- CRM com webhook.

### 19.2 Eventos recomendados

```text
cta_click
form_start
form_submit
whatsapp_open
email_open
service_view
portfolio_view
```

Propriedades úteis:

```text
page_path
project_type
cta_location
campaign
source
medium
```

### 19.3 Pontos de instrumentação

- botões `.button.primary`;
- links `.offer`;
- formulário `ContactForm`;
- links das páginas de produto;
- links de redes no footer.

Não adicionar pixels sem atualizar política de privacidade e consentimento quando aplicável.

---

## 20. Acessibilidade

Recursos já presentes:

- HTML semântico;
- textos alternativos em imagens;
- labels ligados aos campos;
- `aria-expanded` no menu;
- `aria-label` no botão;
- status do formulário com `aria-live`;
- foco visível;
- `prefers-reduced-motion`;
- elementos nativos `details` e `summary` no FAQ;
- cores e estados de foco definidos; contraste completo ainda não auditado.

Melhorias futuras:

- teste completo por teclado;
- teste com leitor de tela;
- garantir que links sociais `#` sejam removidos ou configurados;
- adicionar link “Pular para conteúdo”;
- auditar contraste sobre cada fotografia;
- rever alt text quando houver projetos reais.

---

## 21. Performance

### 21.1 Otimizações existentes

- WebP;
- imagens com dimensão máxima controlada;
- lazy loading na maioria das imagens;
- preload e prioridade alta no hero;
- fonte servida pelo próprio build;
- cache longo para `/media/`;
- zero biblioteca de animação;
- zero CMS e zero banco no carregamento inicial.

### 21.2 Build auditado

Na validação local do commit 98eb28a, em 31/08/2026:

- build concluído e lint com exit code 0;
- dist: 2.109.814 bytes, aproximadamente 2,110 MB decimais;
- public/media: 1.380.537 bytes, aproximadamente 1,381 MB decimais;
- JavaScript principal: 206.281 bytes; gzip reportado pelo Vite: aproximadamente 64,8 kB;
- CSS principal: 46.298 bytes; gzip reportado pelo Vite: aproximadamente 22,01 kB.

Tamanho da pasta não é o total transferido por visita: inclui fontes, reservas e arquivos que podem não ser requisitados. Os valores gzip são estimativas locais do build, não medição da compressão negociada em cada resposta. Não foram medidos Lighthouse, Core Web Vitals ou taxa de conversão.

### 21.3 Cuidados

- não enviar PNG/JPG bruto de vários megabytes;
- não adicionar vídeo autoplay sem compressão;
- não importar bibliotecas grandes para pequenas animações;
- não substituir o hero sem otimização;
- mudar nome de asset quando o conteúdo mudar por causa do cache imutável.

---

## 22. Segurança

A versão atual não processa pagamento, login ou dados em backend. Isso reduz riscos.

Regras obrigatórias para evoluções:

- nunca salvar senhas ou chaves no repositório;
- diferenciar variáveis públicas de build e segredos exclusivos de servidor; Environment Variables, isoladamente, não assegura sigilo;
- nunca expor chave Supabase `service_role`;
- não inserir tokens em `src/content.ts`;
- revisar dependências com npm audit sem publicar logs sensíveis; não houve auditoria de vulnerabilidades nesta revisão documental;
- validar dados no servidor se houver API;
- limitar origem de webhooks;
- aplicar LGPD ao armazenamento de leads;
- manter acesso administrativo com autenticação forte.

---

## 23. Como fazer alterações comuns

### 23.1 Trocar um texto

1. procurar o texto em `src/content.ts`;
2. se não estiver, procurar em `src/App.tsx`;
3. alterar mantendo o sentido comercial;
4. executar `npm run build` e `npm run lint`.

### 23.2 Trocar o telefone

Editar `siteConfig.whatsappNumber` em `src/content.ts`.

### 23.3 Trocar o e-mail

Editar `siteConfig.email`. Confirmar também rodapé e fluxo `mailto`, que usam a mesma configuração.

### 23.4 Configurar redes

Substituir `#` em:

- `instagramUrl`;
- `youtubeUrl`;
- `linkedinUrl`.

Se uma rede não existir, remover o link do `Footer` em vez de manter `#`.

### 23.5 Adicionar serviço

1. adicionar objeto no array `services`;
2. adicionar imagem em `public/media/`;
3. decidir destino em `href`;
4. revisar a grade no desktop;
5. testar mobile.

A grade atual foi desenhada para quatro itens. Um quinto item exigirá ajuste de CSS.

### 23.6 Adicionar projeto ao portfólio

Adicionar item em portfolio. O React gera classes project-N para todos os itens; o CSS atual dá sete colunas aos itens 1 e 4, cinco aos itens 2 e 5 e quatro aos demais. Há seis itens, mas a estrutura de 12 colunas pode deixar espaços dependendo da ordem. Revisar o encaixe visual; seis classes não significam seis regras especiais.

### 23.7 Adicionar nova página

1. criar novo componente em `src/App.tsx` ou arquivo separado;
2. adicionar condição de rota em `App`;
3. adicionar links de navegação;
4. adicionar URL em `public/sitemap.xml`;
5. atualizar SEO se necessário;
6. testar abertura direta na Vercel;
7. considerar migrar para React Router se houver muitas páginas.

### 23.8 Trocar cores

Alterar tokens em `:root` no topo de `src/App.css`. Não substituir Terra Cinema sem aprovação de marca.

### 23.9 Trocar fonte

1. instalar pacote `@fontsource/<familia>`;
2. trocar imports em `src/App.tsx`;
3. atualizar `font-family` em `src/App.css`;
4. testar acentos e pesos;
5. remover Manrope se não for mais usada.

---

## 24. Diagnóstico de problemas

| Sintoma | Causa provável | Correção |
|---|---|---|
| Vercel não detecta projeto | preset incorreto | selecionar Vite |
| Build falha em TypeScript | erro de tipo ou import | ler primeira mensagem do `npm run build` |
| Página interna dá 404 | rewrite ausente | conferir `vercel.json` |
| Imagem não aparece | nome/caminho incorreto | conferir `public/media` e uso `/media/...` |
| Imagem antiga continua | cache imutável | renomear arquivo e atualizar referência |
| Logo com fundo | arquivo sem transparência | usar `ar1-logo.png` RGBA correto |
| WhatsApp não abre | número vazio ou inválido | preencher DDI, DDD e número somente com dígitos |
| Formulário abre e-mail | comportamento de fallback | configurar `whatsappNumber` |
| Rede social não abre | URL ainda é `#` | preencher URL real |
| Menu não fecha no celular | handler removido | manter `onClick={() => setOpen(false)}` nos links |
| Animações não aparecem | observer ou classe removida | conferir `Reveal`, `.reveal` e `.visible` |
| Fonte não carrega | pacote não instalado | rodar `npm install` e verificar imports Fontsource |
| CSS parece quebrado | regra global ou chave incompleta | revisar `src/App.css` e executar build |
| Domínio sem SSL | DNS ainda propagando | revisar registros e esperar validação Vercel |
| Deploy mostra versão antiga | branch ou commit diferente | conferir branch `main` e último deploy |

### 24.1 Erro de autenticação GitHub

Erro já encontrado no processo:

```text
fatal: could not read Username for 'https://github.com'
```

O erro relatado indicava que o Git não conseguia obter credenciais naquela tentativa; não prova falta de autorização em todos os ambientes. Na publicação desta tarefa, havia sessão válida em outra conta com apenas leitura no repositório. Após autorização oficial do GitHub CLI pelo proprietário na conta alessandrocerranomoreira-sobi, o envio pelo assistente foi concluído e a integração Vercel publicou o site. Verificar conta ativa e permissão real; conexão de navegador ou criação do repositório não garante credenciais no terminal. Nunca inserir senha/token no código ou no chat.

---

## 25. Checklist antes de cada publicação

### Conteúdo

- [ ] textos revisados;
- [ ] telefone correto;
- [ ] e-mail funcionando;
- [ ] redes sociais reais;
- [ ] projetos e autorizações conferidos;
- [ ] nenhuma informação confidencial.

### Técnica

- [ ] npm ci concluído com lock revisado;
- [ ] `npm run build` aprovado;
- [ ] `npm run lint` aprovado;
- [ ] home testada;
- [ ] `/leilao-360` testada;
- [ ] `/filme-de-legado` testada;
- [ ] nenhuma imagem 404;
- [ ] formulário testado;
- [ ] desktop e mobile revisados.

### SEO e marketing

- [ ] título e descrição atualizados;
- [ ] Open Graph válido;
- [ ] sitemap atualizado;
- [ ] robots correto;
- [ ] eventos de analytics testados, se existirem;
- [ ] campanha aponta para página correta.

### Deploy

- [ ] alterações revisadas e autorizadas (Pull Request quando aplicável);
- [ ] versão desejada em main;
- [ ] deploy Vercel concluído;
- [ ] domínio final abre com HTTPS;
- [ ] páginas internas abrem diretamente;
- [ ] rollback conhecido.

---

## 26. Protocolo para qualquer IA modificar o site

Uma IA deve seguir esta ordem:

1. ler `AGENTS.md`;
2. ler este documento;
3. ler `src/content.ts`;
4. ler somente os componentes relevantes em `src/App.tsx`;
5. ler as regras relevantes em `src/App.css`;
6. declarar quais arquivos serão alterados;
7. preservar posicionamento, paleta e CTA principal;
8. fazer a menor alteração necessária;
9. não adicionar dependência sem justificativa;
10. não adicionar backend se um fluxo estático resolve;
11. não alterar URLs ou contatos sem dados confirmados;
12. não inventar clientes, resultados, prêmios ou depoimentos;
13. executar build e lint;
14. revisar rotas, formulário e mobile;
15. registrar a mudança em commit claro.

### 26.1 Invariantes

Não quebrar:

- rota `/`;
- rota `/leilao-360`;
- rota `/filme-de-legado`;
- CTA “Solicitar proposta”;
- fallback de contato;
- estrutura de `siteConfig`;
- pasta pública `/media/`;
- rewrite da Vercel;
- contraste da paleta Terra Cinema;
- suporte a `prefers-reduced-motion`;
- responsividade abaixo de 900 px.

### 26.2 O que a IA não deve presumir

- que o WhatsApp está configurado;
- que `contato@ar1studios.com.br` já existe;
- que as redes sociais foram registradas;
- que o domínio já está apontado;
- que o Supabase está conectado;
- que existem depoimentos autorizados;
- que as imagens podem ser usadas fora do site;
- que um deploy concluído é igual a domínio configurado.

---

## 27. Melhorias futuras priorizadas

### Urgência alta

1. preencher WhatsApp oficial;
2. confirmar e-mail comercial;
3. configurar links sociais;
4. adequar plano ao uso comercial e conectar domínio próprio (deploy já concluído);
5. testar formulário em celular real;
6. corrigir aviso de contato que expõe instrução técnica e revisar promessa de envio;
7. alinhar posicionamento agro/amplo e assinatura com aprovação expressa;
8. corrigir URLs de SEO quando o domínio final estiver confirmado.

### Curto prazo

1. substituir portfólio conceitual por cases autorizados;
2. adicionar métricas e resultados reais;
3. criar política de privacidade;
4. criar página 404;
5. adicionar foto e apresentação dos responsáveis;
6. criar Open Graph específico 1200 × 630;
7. instalar analytics.

### Médio prazo

1. armazenar leads em Supabase ou CRM;
2. integrar agenda;
3. criar páginas de cases;
4. adicionar blog ou insights para SEO;
5. prerenderizar páginas;
6. criar painel comercial;
7. testar versões de hero e CTA.

### Longo prazo

1. portal de clientes;
2. acervo privado de filmes e documentos;
3. automação de propostas;
4. área de patrocínios e media kit;
5. biblioteca de formatos AR1 Originals;
6. avaliar, somente com autorização específica, uma integração segregada com base privada; nunca publicar dossiês, dados pessoais ou credenciais no site ou repositório público.

---

## 28. Documentos e ativos relacionados

A versão 1.0 menciona os materiais abaixo. Os que não constam dos cinco anexos recebidos não foram abertos nem validados nesta revisão; existência, conteúdo e versão são PENDENTES:

- manual de aplicações AR1 Studios;
- brand book completo;
- documento estratégico do site;
- fonte Markdown do documento estratégico;
- projeto React/Vite;
- assets em WebP;
- esta documentação mestre;
- `AGENTS.md` para manutenção assistida por IA.

Nomes relatados pela documentação anterior, não comprovados como entregues por esta auditoria:

- Manual de aplicações: `AR1_STUDIOS_Manual_de_Aplicacoes.pdf`;
- Brand book: `AR1_STUDIOS_Brand_Book.pdf`;
- Documento estratégico: `AR1_STUDIOS_Site.pdf`.

Esses documentos tratam de estratégia e marca. Este manual trata da operação técnica da implementação.

---

## 29. Critério de conclusão de uma manutenção

Uma tarefa no site só está concluída quando:

1. o objetivo comercial foi preservado;
2. os arquivos alterados estão identificados;
3. build e lint passam;
4. a página funciona em desktop e mobile;
5. não há erro de console ou asset 404;
6. as rotas internas abrem diretamente;
7. o formulário chega ao destino esperado;
8. o código foi versionado;
9. o deploy foi verificado na URL final;
10. este documento ou o changelog foi atualizado se a arquitetura mudou.

---

## 30. Referência rápida

### Onde alterar cada coisa

| Necessidade | Arquivo |
|---|---|
| telefone, e-mail e redes | `src/content.ts` |
| serviços, ofertas, projetos e FAQ | `src/content.ts` |
| títulos fixos e estrutura de seções | `src/App.tsx` |
| páginas e lógica de rota | `src/App.tsx` |
| comportamento do formulário | `src/App.tsx` |
| cores, layout e responsividade | `src/App.css` |
| estilos globais e foco | `src/index.css` |
| SEO e compartilhamento | `index.html` |
| indexação | `public/robots.txt`, `public/sitemap.xml` |
| imagens | `public/media/` |
| build e dependências | `package.json` |
| rotas na Vercel e cache | `vercel.json` |
| plugin React | `vite.config.ts` |

### Comandos essenciais

```bash
npm ci
npm run dev
npm run build
npm run lint
npm run preview
```

### URLs essenciais

```text
GitHub: https://github.com/alessandrocerranomoreira-sobi/ar1studios-site
Produção ativa: https://ar1studios-site.vercel.app/
Domínio pretendido (DNS pendente): https://ar1studios.com.br
Home: /
Leilão 360: /leilao-360
Filme de Legado: /filme-de-legado
```

---

## Encerramento

A implementação foi deliberadamente mantida simples: React, TypeScript, Vite, CSS próprio, conteúdo centralizado e assets locais. Essa simplicidade é uma decisão de arquitetura, não uma limitação acidental. Ela reduz custo, dependências e risco, ao mesmo tempo em que permite evolução gradual para analytics, CRM, Supabase, agenda, cases e novas páginas.

Qualquer melhoria deve reforçar a função central da AR1 Studios: transformar histórias, patrimônio e eventos do agronegócio em ativos de mídia que vendem, posicionam e permanecem.
