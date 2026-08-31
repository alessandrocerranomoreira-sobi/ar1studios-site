export const siteConfig = {
  brand: "AR1 STUDIOS",
  domain: "ar1studios.com.br",
  email: "contato@ar1studios.com.br",
  whatsappNumber: "", // Exemplo: 5562999999999. Sem +, espaços ou traços.
  instagramUrl: "#",
  youtubeUrl: "#",
  linkedinUrl: "#",
} as const;

export const services = [
  {
    key: "live",
    name: "AR1 LIVE",
    title: "Leilões e eventos ao vivo",
    body: "Transmissão multicâmera, direção de corte e conteúdo de aquecimento. Seu pregão com linguagem de TV.",
    image: "/media/camera-auction.webp",
    href: "/leilao-360",
  },
  {
    key: "films",
    name: "AR1 FILMS",
    title: "Filmes de legado",
    body: "A história da fazenda, do criador e do plantel em um filme que permanece por gerações.",
    image: "/media/horse.webp",
    href: "/filme-de-legado",
  },
  {
    key: "stories",
    name: "AR1 STORIES",
    title: "Conteúdo recorrente",
    body: "Presença mensal para redes, campanhas e relacionamento. Uma operação contínua, não uma ação isolada.",
    image: "/media/edit-suite.webp",
    href: "/#contato",
  },
  {
    key: "originals",
    name: "AR1 ORIGINALS",
    title: "Séries e projetos autorais",
    body: "Formatos próprios que colocam marcas do agro dentro de narrativas maiores e mais valiosas.",
    image: "/media/event-stage.webp",
    href: "/#contato",
  },
] as const;

export const offers = [
  {
    name: "Leilão 360",
    tag: "Porta de entrada",
    body: "Aquecimento, transmissão ao vivo e melhores momentos em uma operação única.",
    href: "/leilao-360",
  },
  {
    name: "AR1 Stories",
    tag: "Receita e presença",
    body: "Contrato recorrente para manter sua marca ativa durante todo o ano.",
    href: "/#contato",
  },
  {
    name: "Filme de Legado",
    tag: "Produto premium",
    body: "Documentário com direção, roteiro e acabamento de cinema.",
    href: "/filme-de-legado",
  },
  {
    name: "Pacote anual",
    tag: "Maior impacto",
    body: "Eventos, conteúdo recorrente e projeto autoral em uma parceria de longo prazo.",
    href: "/#contato",
  },
] as const;

export const portfolio = [
  { image: "/media/event-stage.webp", title: "Eventos que parecem televisão", type: "AR1 Live" },
  { image: "/media/cattle-rays.webp", title: "Histórias que atravessam gerações", type: "AR1 Films" },
  { image: "/media/camera-auction.webp", title: "Transmissão com direção", type: "AR1 Live" },
  { image: "/media/hero-fields.webp", title: "Marcas que ocupam território", type: "AR1 Stories" },
  { image: "/media/horse.webp", title: "Imagem com força de cinema", type: "AR1 Films" },
  { image: "/media/mist-fields.webp", title: "Narrativas com atmosfera", type: "AR1 Originals" },
] as const;

export const processSteps = [
  ["Conversa estratégica", "Entendemos o objetivo, o público e o que o projeto precisa vender."],
  ["Proposta e roteiro", "Escopo fechado, direção definida, cronograma claro e reserva da data."],
  ["Produção AR1", "Captação, direção e transmissão com uma equipe responsável pelo resultado."],
  ["Entrega e ativação", "O ativo chega pronto para trabalhar no leilão, nas redes e no relacionamento."],
] as const;

export const faq = [
  ["Quanto custa?", "Cada projeto é dimensionado pelo objetivo. A proposta é fechada antes da produção, com escopo e investimento claros."],
  ["Vocês atendem em todo o Brasil?", "Sim. Deslocamento e logística entram na proposta para evitar surpresas."],
  ["De quem são os direitos do material?", "Os direitos e limites de uso do ativo final ficam descritos no contrato de cada projeto."],
  ["Qual é o prazo?", "Transmissões seguem a data do evento. Filmes e projetos recorrentes recebem cronograma próprio na proposta."],
  ["Como reservo uma data?", "A data é bloqueada após aprovação da proposta e pagamento da entrada combinada."],
] as const;
