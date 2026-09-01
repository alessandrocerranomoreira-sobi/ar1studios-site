export const siteConfig = {
  brand: "AR1 STUDIOS",
  domain: "ar1studios.com.br",
  email: "contato@ar1studios.com.br",
  whatsappNumber: "", // Preencher apenas com autorização e número comercial confirmado.
  instagramUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",
} as const;

export const solutionFamilies = [
  {
    number: "01",
    key: "operar",
    eyebrow: "Operar conteúdo",
    title: "Conhecimento interno transformado em presença recorrente.",
    body: "Para organizações que possuem especialistas e assuntos relevantes, mas precisam de método, cadência e produção para colocar esse conhecimento em circulação.",
    items: ["Diagnóstico editorial", "Captação recorrente", "Conteúdos derivados", "Organização de calendário e entregas"],
    status: "Operação gerenciada em ciclo de validação",
    image: "/media/camera-auction-vertical.webp",
  },
  {
    number: "02",
    key: "capacidade",
    eyebrow: "Construir capacidade",
    title: "Um estúdio que nasce para funcionar — não apenas para existir.",
    body: "Diagnóstico, projeto, ativação e suporte para empresas e instituições que desejam criar ou organizar uma estrutura própria de produção.",
    items: ["Diagnóstico de uso e viabilidade", "Projeto técnico", "Implantação e testes", "Treinamento e suporte operacional"],
    status: "Consultoria e implantação sob medida",
    image: "/media/edit-suite.webp",
  },
  {
    number: "03",
    key: "especiais",
    eyebrow: "Projetos especiais",
    title: "Estrutura, direção e produção para momentos que não podem falhar.",
    body: "Transmissões, eventos, filmes e produções em grande escala, organizados a partir do objetivo, do público, da locação e da complexidade real.",
    items: ["Transmissões ao vivo", "Leilão 360", "Filmes de marca e legado", "Produções no Haras SOBI"],
    status: "Projetos dimensionados por escopo",
    image: "/media/event-stage.webp",
  },
] as const;

export const flagshipOffers = [
  {
    tag: "Locação e produção",
    title: "Haras SOBI",
    body: "Mais de 20 cenários, pista de laço para shows e DVDs e espaço coberto para até 4 mil pessoas.",
    href: "/haras-sobi",
    image: "/media/horse.webp",
  },
  {
    tag: "Transmissão e conteúdo",
    title: "Leilão 360",
    body: "Aquecimento, transmissão dirigida e conteúdos posteriores organizados como uma única operação.",
    href: "/leilao-360",
    image: "/media/camera-auction.webp",
  },
  {
    tag: "Filme e patrimônio",
    title: "Filme de Legado",
    body: "Pesquisa, roteiro e produção para histórias que precisam permanecer com valor e clareza.",
    href: "/filme-de-legado",
    image: "/media/horse.webp",
  },
] as const;

export const methodSteps = [
  { number: "01", title: "Avaliar aderência", body: "Entendemos o problema, o público, a estrutura disponível e a decisão que o projeto precisa apoiar." },
  { number: "02", title: "Desenhar a operação", body: "Definimos escopo, responsabilidades, cronograma, canais, locação e recursos necessários." },
  { number: "03", title: "Produzir e ativar", body: "A equipe executa, dirige e organiza as entregas de acordo com o uso previsto desde o início." },
  { number: "04", title: "Aprender e evoluir", body: "Projetos recorrentes geram aprendizado para melhorar cadência, formatos, operação e resultado." },
] as const;

export const principles = [
  ["Problema antes do equipamento", "A estrutura é dimensionada pelo uso. Comprar tecnologia sem operação definida não resolve a demanda."],
  ["Uma fonte, vários ativos", "Uma boa sessão pode alimentar diferentes momentos da jornada comercial e institucional."],
  ["Verdade antes da vitrine", "Capacidades, números e resultados só entram na comunicação quando podem ser sustentados."],
  ["Continuidade antes do volume", "A operação deve caber na equipe, no orçamento e na rotina de quem precisa mantê-la."],
] as const;

export const harasFacts = [
  { value: "+20", label: "cenários diferentes em uma única locação" },
  { value: "4 mil", label: "pessoas em espaço coberto" },
  { value: "1 pista", label: "de laço para shows e gravações de DVD" },
] as const;

export const harasApplications = [
  ["Shows e DVDs", "Palco, pista, público e produção audiovisual organizados para projetos de grande escala."],
  ["Clipes e campanhas", "Variação de paisagens, arquitetura e atmosfera sem depender de muitas locações."],
  ["Filmes e conteúdo de marca", "Ambientes para entrevistas, narrativas, demonstrações, lançamentos e séries."],
  ["Eventos e experiências", "Área coberta, espaços externos e estrutura adaptável ao desenho de cada encontro."],
  ["Podcasts e conversas", "Cenários naturais e construídos para formatos especiais, temporadas e ativações."],
  ["Transmissões", "Integração entre locação, captação, direção e operação ao vivo sob planejamento técnico."],
] as const;

export const faq = [
  ["A AR1 é uma produtora ou uma consultoria?", "As duas capacidades se encontram no mesmo modelo. A AR1 pode diagnosticar, desenhar e implantar uma operação, além de produzir conteúdo, transmissões e projetos especiais."],
  ["Vocês atendem somente o agronegócio?", "Não. O agro é uma frente importante de experiência, relacionamento e produção, mas a AR1 atende organizações B2B, instituições, marcas, eventos e projetos culturais de diferentes setores."],
  ["O Haras SOBI pode receber que tipo de produção?", "Shows, DVDs, clipes, campanhas, filmes, podcasts, entrevistas, transmissões, lançamentos e eventos. A viabilidade de cada área depende de agenda, briefing e avaliação técnica."],
  ["É possível contratar apenas a locação do Haras?", "O formato é definido conforme o projeto. A proposta pode considerar locação, apoio de produção e operação audiovisual, respeitando as necessidades e responsabilidades de cada entrega."],
  ["A AR1 implanta estúdios próprios?", "Sim. O trabalho pode incluir diagnóstico, projeto técnico, orientação de ambiente, equipamentos, implantação, testes, treinamento e suporte."],
  ["Como funciona o orçamento?", "Primeiro avaliamos aderência, objetivo, local, prazo e complexidade. Depois apresentamos um escopo claro com responsabilidades, entregas e investimento."],
] as const;

export const legacyServiceDetails = [
  { slug: "transmissao-ao-vivo", eyebrow: "Projetos especiais", title: "Transmissões ao vivo com planejamento e direção.", summary: "Uma operação dimensionada para conectar evento, público e conteúdos posteriores com clareza técnica.", image: "/media/camera-auction.webp", project: "Transmissão ao vivo", items: ["Planejamento técnico", "Captação e direção de corte", "Operação de transmissão", "Conteúdos derivados quando previstos"] },
  { slug: "fotografia-e-video", eyebrow: "Projetos especiais", title: "Fotografia e vídeo para explicar, registrar e permanecer.", summary: "Produções para empresas, eventos, propriedades, marcas e histórias que pedem direção própria.", image: "/media/horse.webp", project: "Filme de marca ou legado", items: ["Planejamento e roteiro", "Fotografia e captação", "Entrevistas e depoimentos", "Edição e organização dos ativos"] },
  { slug: "podcast-itinerante", eyebrow: "Operar conteúdo", title: "Conteúdo onde as conversas realmente acontecem.", summary: "Estrutura móvel para entrevistas, podcasts e agendas editoriais em empresas, feiras, eventos e locações especiais.", image: "/media/edit-suite.webp", project: "Operação de conteúdo", items: ["Desenho editorial", "Captação de áudio e vídeo", "Operação no local", "Cortes e entregas conforme escopo"] },
  { slug: "eventos-e-conteudo", eyebrow: "Projetos especiais", title: "Conteúdo que faz o evento continuar depois do palco.", summary: "Planejamento e produção para registrar, ativar e prolongar a presença de eventos e marcas.", image: "/media/event-stage.webp", project: "Evento ou projeto especial", items: ["Plano de conteúdo", "Captação de momentos e entrevistas", "Peças de circulação", "Entrega organizada por finalidade"] },
  { slug: "producao-externa", eyebrow: "Haras SOBI e locações", title: "A locação certa também faz parte da narrativa.", summary: "Produções no Haras SOBI e em outras locações avaliadas de acordo com a história, a logística e a escala do projeto.", image: "/media/mist-fields.webp", project: "Haras SOBI", items: ["Planejamento de locação", "Equipe e logística", "Captação de imagem e som", "Produção dimensionada ao uso"] },
  { slug: "projetos-integrados", eyebrow: "AR1 Studios", title: "Quando o projeto precisa de mais de uma frente.", summary: "Estratégia, estrutura, audiovisual, transmissão e conteúdo coordenados em uma operação sob medida.", image: "/media/cattle-wide.webp", project: "Ainda preciso entender a melhor solução", items: ["Arquitetura de escopo", "Integração entre frentes", "Cronograma e coordenação", "Entregas por etapa"] },
  { slug: "consultoria-implantacao-estudios-podcast", eyebrow: "Construir capacidade", title: "Implantar um estúdio é construir uma operação.", summary: "Diagnóstico, projeto, ativação e suporte para transformar espaço e equipamentos em uma rotina funcional.", image: "/media/edit-suite.webp", project: "Projeto e ativação de estúdio", items: ["Diagnóstico de uso", "Projeto técnico", "Implantação e testes", "Treinamento e suporte"] },
] as const;

export const projectOptions = [
  "Operação de conteúdo",
  "Diagnóstico de capacidade",
  "Projeto e ativação de estúdio",
  "Haras SOBI",
  "Transmissão ao vivo",
  "Leilão 360",
  "Filme de marca ou legado",
  "Evento ou projeto especial",
  "Ainda preciso entender a melhor solução",
] as const;
