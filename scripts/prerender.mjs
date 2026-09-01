import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const template = await readFile(join(root, "dist", "index.html"), "utf8");
const origin = "https://ar1studios.com.br";

const routes = [
  ["solucoes", "Soluções | AR1 Studios", "Operação de conteúdo, implantação de estúdios, transmissões, filmes e produções especiais da AR1 Studios."],
  ["consultoria-podcast", "Consultoria de podcast e estúdios | AR1 Studios", "Diagnóstico, projeto técnico, implantação, testes e treinamento para transformar um espaço de podcast em uma operação funcional."],
  ["haras-sobi", "Haras SOBI | Locação e produção AR1 Studios", "Mais de 20 cenários, pista para shows e gravações de DVD e espaço coberto para até 4 mil pessoas.", "/media/haras-vista-aerea-2026-v1.webp"],
  ["metodo", "Método | AR1 Studios", "Conheça o método da AR1 Studios para diagnosticar, desenhar, produzir e evoluir operações de mídia e projetos especiais."],
  ["sobre", "Sobre | AR1 Studios", "A AR1 Studios conecta estratégia, produção audiovisual, transmissões, estúdios e locação para organizações e projetos especiais."],
  ["leilao-360", "Leilão 360 | AR1 Studios", "Aquecimento, transmissão dirigida e conteúdo posterior para leilões."],
  ["filme-de-legado", "Filme de Legado | AR1 Studios", "Pesquisa, roteiro e produção de filmes para preservar histórias de famílias, propriedades e marcas."],
  ["servicos/transmissao-ao-vivo", "Transmissão ao vivo | AR1 Studios", "Planejamento, captação, direção e operação de transmissões ao vivo."],
  ["servicos/fotografia-e-video", "Fotografia e vídeo | AR1 Studios", "Produção audiovisual integrada a objetivos de comunicação, acervo e relacionamento."],
  ["servicos/podcast-itinerante", "Podcast itinerante | AR1 Studios", "Entrevistas e conversas produzidas em empresas, feiras, eventos e locações especiais."],
  ["servicos/eventos-e-conteudo", "Eventos e conteúdo | AR1 Studios", "Cobertura e ativos editoriais para ampliar a vida útil de eventos."],
  ["servicos/producao-externa", "Produção externa | AR1 Studios", "Equipe, logística e captação dimensionadas para produções em locação."],
  ["servicos/projetos-integrados", "Projetos integrados | AR1 Studios", "Estratégia, conteúdo, audiovisual e transmissão coordenados em um único projeto."],
];

const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

for (const [route, title, description, heroImage] of routes) {
  const url = `${origin}/${route}`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeAttribute(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeAttribute(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${escapeAttribute(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`);
  if (heroImage) html = html.replace(/(<link rel="preload" as="image" href=")[^"]*(" fetchpriority="high" \/>)/, `$1${heroImage}$2`);

  const routeSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: title, description, url, inLanguage: "pt-BR", isPartOf: { "@id": `${origin}/#website` } });
  html = html.replace("</head>", `    <script type="application/ld+json">${routeSchema}</script>\n  </head>`);
  const destination = join(root, "dist", route, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
  const cleanUrlDestination = join(root, "dist", `${route}.html`);
  await mkdir(dirname(cleanUrlDestination), { recursive: true });
  await writeFile(cleanUrlDestination, html, "utf8");
}

console.log(`Static metadata generated for ${routes.length} routes.`);
