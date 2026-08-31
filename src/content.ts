// Direção visual: editorial audiovisual premium, multissetorial e orientada à conversão. O agro aparece como principal território de autoridade, sem limitar a AR1 a um único setor.

export const siteConfig = {
  brand: "AR1 STUDIOS",
  domain: "ar1studios.com.br",
  email: "contato@ar1studios.com.br",
  whatsappNumber: "", // Preencher apenas com autorização e número comercial confirmado.
  instagramUrl: "#",
  youtubeUrl: "#",
  linkedinUrl: "#",
} as const;

export const services = [
  {
    key: "live",
    name: "AR1 LIVE",
    title: "Transmissões ao vivo",
    body: "Planejamento, operação técnica e direção de corte para eventos de pequeno, médio e grande porte.",
    image: "/media/camera-auction.webp",
    href: "/servicos/transmissao-ao-vivo",
  },
  {
    key: "films",
    name: "AR1 FILMS",
    title: "Fotografia e produção de vídeo",
    body: "Cobertura fotográfica, vídeos de divulgação, teasers, resumos, entrevistas e depoimentos para eventos e marcas.",
    image: "/media/horse.webp",
    href: "/servicos/fotografia-e-video",
  },
  {
    key: "studio",
    name: "AR1 STUDIO",
    title: "Podcasts e estúdio itinerante",
    body: "Estrutura de câmeras, áudio e corte para gravar entrevistas e conteúdos onde o evento acontece.",
    image: "/media/edit-suite.webp",
    href: "/servicos/podcast-itinerante",
  },
  {
    key: "events",
    name: "AR1 EVENTS",
    title: "Conteúdo para eventos e marcas",
    body: "Conteúdo para estandes, expositores, campanhas, bastidores e relacionamento antes, durante e depois do evento.",
    image: "/media/event-stage.webp",
    href: "/servicos/eventos-e-conteudo",
  },
  {
    key: "external",
    name: "AR1 EXTERNAL",
    title: "Produções externas",
    body: "Captação em fazendas, ranchos, estádios, cinemas, salas VIP, estúdios parceiros e outros espaços sob consulta.",
    image: "/media/mist-fields.webp",
    href: "/servicos/producao-externa",
  },
  {
    key: "integrated",
    name: "AR1 PROJECTS",
    title: "Projetos integrados",
    body: "Estratégia, audiovisual, evento, transmissão e distribuição organizados em uma operação sob medida.",
    image: "/media/cattle-wide.webp",
    href: "/servicos/projetos-integrados",
  },
  {
    key: "podcast-consulting",
    name: "AR1 CONSULTORIA",
    title: "Implantação de estúdios de podcast",
    body: "Diagnóstico, projeto técnico, implantação, treinamento e orientação para transformar estrutura em operação.",
    image: "/media/edit-suite.webp",
    href: "/servicos/consultoria-implantacao-estudios-podcast",
  },
] as const;

export const offers = [
  {
    name: "Cobertura de evento",
    tag: "Entrada",
    body: "Fotografia, vídeo, entrevistas e conteúdos de circulação para registrar e prolongar a presença do evento.",
    href: "/#contato",
  },
  {
    name: "Transmissão dirigida",
    tag: "Alcance",
    body: "Operação ao vivo dimensionada ao formato do projeto, com planejamento técnico e direção de corte.",
    href: "/servicos/transmissao-ao-vivo",
  },
  {
    name: "Podcast itinerante",
    tag: "Presença",
    body: "Estrutura móvel para transformar feira, congresso ou encontro corporativo em uma agenda de conversas.",
    href: "/#contato",
  },
  {
    name: "Filme de legado",
    tag: "Premium",
    body: "Pesquisa, roteiro e produção audiovisual para histórias que precisam permanecer com clareza e acabamento.",
    href: "/filme-de-legado",
  },
] as const;

export const portfolio = [
  { image: "/media/event-stage.webp", title: "Eventos com linguagem audiovisual", type: "AR1 Events" },
  { image: "/media/cattle-rays.webp", title: "Histórias com contexto e permanência", type: "AR1 Films" },
  { image: "/media/camera-auction.webp", title: "Transmissão com direção", type: "AR1 Live" },
  { image: "/media/hero-fields.webp", title: "Marcas em seus territórios", type: "AR1 Projects" },
  { image: "/media/horse.webp", title: "Imagem com força de narrativa", type: "AR1 Films" },
  { image: "/media/mist-fields.webp", title: "Produções fora do estúdio", type: "AR1 External" },
] as const;

export const processSteps = [
  ["Conversa estratégica", "Entendemos o objetivo, o público, o contexto e o que o projeto precisa comunicar."],
  ["Proposta e roteiro", "Escopo fechado, direção definida, cronograma claro e dimensionamento técnico por projeto."],
  ["Produção AR1", "Captação, fotografia, direção e transmissão com uma equipe responsável pela execução."],
  ["Entrega e ativação", "O material chega organizado para circular no evento, nas redes e no relacionamento."],
] as const;

export const faq = [
  ["Quais tipos de projeto vocês realizam?", "Trabalhamos com fotografia, vídeo, entrevistas, podcasts, estúdio itinerante, transmissões ao vivo, cobertura de eventos, produção externa e projetos integrados."],
  ["Vocês atendem somente o agronegócio?", "Não. A AR1 atua em diferentes setores, com o agronegócio como principal força e território de experiência. Também dimensionamos projetos corporativos, culturais, esportivos, educacionais e institucionais."],
  ["Vocês podem produzir fora do estúdio?", "Sim. A produção pode acontecer em eventos, fazendas, ranchos, estádios, cinemas, salas VIP, auditórios, espaços parceiros e outras locações avaliadas para cada projeto."],
  ["A transmissão é vendida separadamente?", "A solução pode ser contratada como transmissão ou como parte de um projeto integrado. A proposta é dimensionada pelo objetivo, pelo formato do evento e pela estrutura necessária."],
  ["Como funciona o orçamento?", "Cada projeto é avaliado antes da proposta. Escopo, equipe, locação, logística, prazo e investimento são definidos com clareza antes da produção."],
] as const;


export const serviceDetails = [
  {
    key: "live",
    slug: "transmissao-ao-vivo",
    eyebrow: "AR1 LIVE",
    title: "Transmissão ao vivo com planejamento e direção.",
    summary: "Uma operação pensada para conectar evento, audiência e conteúdo com clareza técnica.",
    image: "/media/camera-auction.webp",
    formProject: "Transmissão ao vivo",
    fits: ["Leilões e eventos", "Feiras e congressos", "Eventos corporativos", "Programações especiais"],
    deliverables: ["Planejamento técnico", "Captação e direção de corte", "Operação de transmissão", "Conteúdos derivados, quando previstos no escopo"],
    process: ["Briefing e desenho da operação", "Dimensionamento da equipe e dos recursos", "Execução no local ou ambiente definido", "Entrega conforme o escopo aprovado"],
  },
  {
    key: "films",
    slug: "fotografia-e-video",
    eyebrow: "AR1 FILMS",
    title: "Fotografia e vídeo para registrar, explicar e permanecer.",
    summary: "Produções para eventos, empresas, propriedades, marcas, estandes e projetos especiais.",
    image: "/media/horse.webp",
    formProject: "Fotografia e vídeo",
    fits: ["Cobertura de eventos", "Vídeos corporativos", "Teasers e resumos", "Entrevistas e depoimentos"],
    deliverables: ["Fotografia profissional", "Captação audiovisual", "Entrevistas e depoimentos", "Vídeos finais conforme objetivo e formato"],
    process: ["Entendimento da história e do público", "Roteiro ou plano de captação", "Produção e direção", "Seleção, edição e entrega"],
  },
  {
    key: "studio",
    slug: "podcast-itinerante",
    eyebrow: "AR1 STUDIO",
    title: "Um estúdio que chega onde a conversa acontece.",
    summary: "Estrutura itinerante para podcasts, entrevistas e conteúdos de relacionamento em feiras, congressos e encontros.",
    image: "/media/edit-suite.webp",
    formProject: "Podcast ou estúdio itinerante",
    fits: ["Feiras e congressos", "Conteúdo para estandes", "Entrevistas com convidados", "Programações de marca"],
    deliverables: ["Cenário e operação definidos para o local", "Captação de áudio e vídeo", "Gravação de entrevistas", "Cortes e distribuições, quando previstos"],
    process: ["Definição do formato editorial", "Visita técnica ou briefing do espaço", "Montagem e operação", "Organização dos materiais para publicação"],
  },
  {
    key: "events",
    slug: "eventos-e-conteudo",
    eyebrow: "AR1 EVENTS",
    title: "Conteúdo para fazer o evento continuar depois do palco.",
    summary: "Uma frente para registrar, ativar e prolongar a presença de eventos e marcas antes, durante e depois da experiência.",
    image: "/media/event-stage.webp",
    formProject: "Cobertura de evento",
    fits: ["Estandes e expositores", "Eventos corporativos", "Lançamentos", "Bastidores e relacionamento"],
    deliverables: ["Plano de conteúdo do evento", "Captação de momentos e entrevistas", "Peças de circulação", "Organização da entrega por finalidade"],
    process: ["Objetivo de comunicação", "Mapa de momentos e pessoas", "Captação no ritmo do evento", "Edição e distribuição conforme o plano"],
  },
  {
    key: "external",
    slug: "producao-externa",
    eyebrow: "AR1 EXTERNAL",
    title: "Produção fora do estúdio, com o cenário certo para a história.",
    summary: "Captação em fazendas, ranchos, estádios, cinemas, salas VIP, auditórios e espaços parceiros sob consulta.",
    image: "/media/mist-fields.webp",
    formProject: "Produção externa",
    fits: ["Filmes de propriedade", "Clipes e pocket shows", "Ensaios e campanhas", "Conteúdo em locações especiais"],
    deliverables: ["Planejamento de locação", "Equipe e logística dimensionadas", "Captação de imagem e som", "Entrega alinhada ao uso previsto"],
    process: ["Escolha do contexto e da locação", "Planejamento de luz, som e deslocamento", "Produção no local", "Finalização e organização dos ativos"],
  },
  {
    key: "integrated",
    slug: "projetos-integrados",
    eyebrow: "AR1 PROJECTS",
    title: "Quando o projeto precisa de mais de uma frente.",
    summary: "Estratégia, audiovisual, evento, transmissão, conteúdo e distribuição organizados em uma operação sob medida.",
    image: "/media/cattle-wide.webp",
    formProject: "Projeto integrado",
    fits: ["Lançamentos", "Projetos institucionais", "Eventos de grande complexidade", "Campanhas e ativações"],
    deliverables: ["Arquitetura de escopo", "Integração entre frentes", "Cronograma e coordenação", "Entregas por etapa e finalidade"],
    process: ["Diagnóstico do desafio", "Desenho da solução", "Coordenação das frentes", "Entrega, revisão e próximos ciclos"],
  },
  {
    key: "podcast-consulting",
    slug: "consultoria-implantacao-estudios-podcast",
    eyebrow: "AR1 CONSULTORIA",
    title: "Implantar um estúdio é construir uma operação, não apenas comprar equipamentos.",
    summary: "Consultoria para quem quer estruturar um estúdio de podcast do zero ou transformar uma estrutura existente em uma operação funcional.",
    image: "/media/edit-suite.webp",
    formProject: "Consultoria em implantação de estúdio de podcast",
    fits: ["Empresas e instituições", "Feiras e espaços de eventos", "Criadores e especialistas", "Operações que já possuem equipamentos"],
    deliverables: ["Diagnóstico de objetivo e público", "Projeto técnico e orientação de acústica", "Cenografia, áudio, vídeo e iluminação", "Equipamentos, software e fluxo de operação", "Implantação, treinamento e orientação editorial"],
    process: ["Diagnóstico do espaço e da intenção", "Projeto da estrutura e do fluxo", "Implantação e testes", "Treinamento, operação e evolução"],
  },
] as const;

// O formulário usa os mesmos nomes das páginas para preservar a pré-seleção.
export const projectOptions: readonly string[] = [...new Set([
  "Leilão 360",
  "Filme de Legado",
  ...serviceDetails.map((service) => service.formProject),
  "Conteúdo recorrente",
  "Pacote anual",
  "Outro projeto",
])];

type GalleryImage = { number: string; src: string | null; caption: string; approved?: boolean };
type ProjectEntry = { key: string; category: string; title: string; year: string; image: string | null; summary: string; published?: boolean };

// Preencher com imagens autorizadas e marcar approved: true para exibir.
export const harasGallery: readonly GalleryImage[] = [
  { number: "01", src: null, caption: "Vista geral do Haras SOBI" },
  { number: "02", src: null, caption: "Cenário para gravação" },
  { number: "03", src: null, caption: "Área externa" },
  { number: "04", src: null, caption: "Detalhe da locação" },
  { number: "05", src: null, caption: "Espaço para pocket" },
  { number: "06", src: null, caption: "Ambiente para clipe" },
  { number: "07", src: null, caption: "Ensaio e preparação" },
  { number: "08", src: null, caption: "Paisagem e atmosfera" },
  { number: "09", src: null, caption: "Área de apoio" },
  { number: "10", src: null, caption: "Cenário para entrevista" },
  { number: "11", src: null, caption: "Locação para DVD" },
  { number: "12", src: null, caption: "Espaço para produção externa" },
  { number: "13", src: null, caption: "Detalhe de arquitetura" },
  { number: "14", src: null, caption: "Área para ensaio" },
  { number: "15", src: null, caption: "Outro ângulo da locação" },
] as const;

// Preencher todos os dados reais e marcar published: true para exibir um case.
export const projectSlots: readonly ProjectEntry[] = [
  { key: "project-01", category: "Evento", title: "Adicionar evento validado", year: "Ano", image: null, summary: "Substitua este espaço por nome, contexto, escopo e resultado autorizado." },
  { key: "project-02", category: "Audiovisual", title: "Adicionar produção validada", year: "Ano", image: null, summary: "Substitua este espaço por um projeto com imagens e informações aprovadas." },
  { key: "project-03", category: "Podcast", title: "Adicionar projeto de podcast", year: "Ano", image: null, summary: "Substitua este espaço por uma implantação ou produção de podcast autorizada." },
  { key: "project-04", category: "Agro", title: "Adicionar projeto do agro", year: "Ano", image: null, summary: "Substitua este espaço por um case do principal território de força da AR1." },
  { key: "project-05", category: "Corporativo", title: "Adicionar projeto corporativo", year: "Ano", image: null, summary: "Substitua este espaço por um trabalho institucional ou corporativo validado." },
  { key: "project-06", category: "Especial", title: "Adicionar projeto especial", year: "Ano", image: null, summary: "Substitua este espaço por outro projeto que possa ser apresentado publicamente." },
] as const;
