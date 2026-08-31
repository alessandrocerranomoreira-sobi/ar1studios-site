// Direção visual: editorial audiovisual premium, multissetorial e orientada à conversão. A interface deve provar contexto e facilitar a escolha do próximo projeto.

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./App.css";
import { faq, harasGallery, offers, portfolio, processSteps, projectOptions, projectSlots, serviceDetails, services, siteConfig } from "./content";

const publishedProjects = projectSlots.filter((project) => project.published && project.image && project.title && project.year && project.summary);
const approvedHarasImages = harasGallery.filter((item) => item.approved && item.src);

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  company: string;
  project: string;
  date: string;
};

const initialLead: LeadForm = { name: "", phone: "", email: "", company: "", project: "", date: "" };

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? "logo compact" : "logo"} src="/media/ar1-logo.png" alt="AR1 Studios" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <a className="brand-link" href="/" aria-label="AR1 Studios, início"><Logo /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
        <span /><span />
      </button>
      <nav id="main-navigation" className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <a href="/#servicos" onClick={() => setOpen(false)}>Serviços</a>
        <a href="/#projetos" onClick={() => setOpen(false)}>{publishedProjects.length ? "Projetos" : "Possibilidades"}</a>
        <a href="/#processo" onClick={() => setOpen(false)}>Processo</a>
        <a href="/#contato" className="nav-cta" onClick={() => setOpen(false)}>Solicitar proposta</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div><Logo compact /><p>Imagem, presença e operação para projetos que importam.</p></div>
      <div className="footer-links">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        {[
          ["Instagram", siteConfig.instagramUrl],
          ["YouTube", siteConfig.youtubeUrl],
          ["LinkedIn", siteConfig.linkedinUrl],
        ].filter(([, url]) => url && url !== "#").map(([label, url]) => <a key={label} href={url}>{label}</a>)}
      </div>
      <small>© 2026 AR1 Studios. Todos os direitos reservados.</small>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ContactForm({ defaultProject = "" }: { defaultProject?: string }) {
  const [lead, setLead] = useState<LeadForm>({ ...initialLead, project: projectOptions.includes(defaultProject) ? defaultProject : "" });
  const [status, setStatus] = useState("");
  const update = (field: keyof LeadForm, value: string) => setLead((current) => ({ ...current, [field]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = [
      "Olá, AR1 Studios. Quero solicitar uma proposta.",
      `Nome: ${lead.name}`,
      `WhatsApp: ${lead.phone}`,
      lead.email ? `E-mail: ${lead.email}` : "",
      `Empresa/Fazenda: ${lead.company}`,
      `Projeto: ${lead.project}`,
      lead.date ? `Data prevista: ${lead.date}` : "",
    ].filter(Boolean).join("\n");

    if (siteConfig.whatsappNumber) {
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setStatus("Conclua o envio no WhatsApp para que a equipe receba sua solicitação.");
      return;
    }

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Solicitação de proposta AR1 Studios")}&body=${encodeURIComponent(message)}`;
    setStatus(`Conclua o envio no aplicativo de e-mail. Se ele não abrir, escreva para ${siteConfig.email}.`);
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Nome</label><input id="name" autoComplete="name" required value={lead.name} onChange={(e) => update("name", e.target.value)} /></div>
      <div className="field"><label htmlFor="phone">WhatsApp</label><input id="phone" type="tel" autoComplete="tel" required value={lead.phone} onChange={(e) => update("phone", e.target.value)} /></div>
      <div className="field"><label htmlFor="email">E-mail, se preferir</label><input id="email" type="email" autoComplete="email" value={lead.email} onChange={(e) => update("email", e.target.value)} /></div>
      <div className="field"><label htmlFor="company">Empresa ou fazenda</label><input id="company" autoComplete="organization" required value={lead.company} onChange={(e) => update("company", e.target.value)} /></div>
      <div className="field"><label htmlFor="project">Tipo de projeto</label><select id="project" required value={lead.project} onChange={(e) => update("project", e.target.value)}><option value="">Selecione</option>{projectOptions.map((project) => <option key={project} value={project}>{project}</option>)}</select></div>
      <div className="field full"><label htmlFor="date">Data prevista, se houver</label><input id="date" type="date" value={lead.date} onChange={(e) => update("date", e.target.value)} /></div>
      <button className="button primary full" type="submit">Solicitar proposta</button>
      <p className="form-note full" aria-live="polite">{status || "Sem compromisso. Resposta de gente, não de robô."}</p>
    </form>
  );
}

function HarasSection() {
  return <section id="haras" className="haras section"><div className="haras-heading"><Reveal><p className="eyebrow">Produção externa · Haras SOBI</p><h2>Um lugar para a história ganhar cenário.</h2></Reveal><Reveal><p className="section-intro">Consulte a possibilidade de gravações, pocket shows, clipes, ensaios e entrevistas no Haras SOBI. Cada produção depende de briefing, avaliação do espaço, agenda e autorização.</p><a className="text-link" href="/?projeto=Produ%C3%A7%C3%A3o%20externa#contato">Consultar uma produção no Haras</a></Reveal></div>{approvedHarasImages.length > 0 && <div className="haras-gallery">{approvedHarasImages.map((item) => <figure key={item.number}><img src={item.src ?? undefined} alt={item.caption} loading="lazy" /><figcaption><span>{item.number}</span>{item.caption}</figcaption></figure>)}</div>}</section>;
}

function ProjectsSection() {
  if (!publishedProjects.length) return null;
  return <section id="projetos" className="projects-archive section"><Reveal><p className="eyebrow">Projetos e eventos</p><h2>Histórias contadas com contexto.</h2></Reveal><div className="project-slots">{publishedProjects.map((project) => <article className="project-slot" key={project.key}><img src={project.image ?? undefined} alt={project.title} loading="lazy" /><div className="project-slot-copy"><span>{project.category} · {project.year}</span><h3>{project.title}</h3><p>{project.summary}</p></div></article>)}</div></section>;
}

function ServiceDetailPage({ slug }: { slug: string }) {
  const data = serviceDetails.find((service) => service.slug === slug);
  if (!data) return <NotFound />;
  return <><Header /><main id="conteudo"><section className="detail-hero"><img src={data.image} alt={data.title} /><div className="hero-scrim" /><div className="detail-hero-copy"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.summary}</p><a className="button primary" href={`/?projeto=${encodeURIComponent(data.formProject)}#contato`}>Solicitar proposta</a></div></section><section className="detail-intro section"><div><p className="eyebrow">Para quem faz sentido</p><h2>Uma solução dimensionada ao contexto.</h2></div><div className="detail-fit-list">{data.fits.map((fit) => <span key={fit}>{fit}</span>)}</div></section><section className="detail-columns section"><article><p className="eyebrow">O que pode incluir</p><h2>Entrega com clareza.</h2><ul>{data.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="eyebrow">Como acontece</p><h2>Do briefing à entrega.</h2><ol>{data.process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></article></section><section id="contato" className="standalone-contact section"><div><p className="eyebrow">Próximo passo</p><h2>Vamos dimensionar este projeto.</h2><p>A proposta é construída a partir do objetivo, do local, do prazo e da estrutura necessária.</p></div><ContactForm defaultProject={data.formProject} /></section></main><Footer /></>;
}

function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="hero">
          <img className="hero-image" src="/media/hero-fields.webp" alt="Campos agrícolas e silos ao amanhecer" fetchPriority="high" />
          <div className="hero-scrim" />
          <div className="hero-content">
            <p className="eyebrow">Audiovisual para eventos, marcas e empresas</p>
            <h1>Seu legado merece mais do que um vídeo. <span>Merece um ativo.</span></h1>
            <p className="hero-copy">Fotografia, vídeo, podcasts, transmissões e projetos integrados para marcas que precisam ser vistas — com o agro como nossa principal força.</p>
            <div className="hero-actions"><a className="button primary" href="#contato">Solicitar proposta</a><a className="button secondary" href="#projetos">{publishedProjects.length ? "Ver trabalhos" : "Ver possibilidades"}</a></div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Principais capacidades">
          <span>Fotografia e vídeo</span><span>Podcasts itinerantes</span><span>Transmissões ao vivo</span><span>Projetos multissetoriais</span>
        </section>

        <section className="positioning section">
          <Reveal><p className="eyebrow">Uma operação que acompanha o projeto</p><h2>Do palco à porteira. <span>Do registro à presença.</span></h2></Reveal>
          <div className="positioning-grid">
            <Reveal className="positioning-lead"><p>A AR1 não depende de um único formato ou locação. A equipe combina estratégia, captação, direção, transmissão e distribuição de acordo com o contexto de cada trabalho.</p><strong>O agro é nossa principal força. A capacidade é multissetorial.</strong></Reveal>
            <div className="signal-list"><Reveal className="signal-item"><span>01</span><div><h3>Dentro do evento</h3><p>Feiras, congressos, simpósios, inaugurações e encontros corporativos.</p></div></Reveal><Reveal className="signal-item"><span>02</span><div><h3>Fora do estúdio</h3><p>Fazendas, ranchos, estádios, cinemas, salas VIP e espaços parceiros sob consulta.</p></div></Reveal><Reveal className="signal-item"><span>03</span><div><h3>Depois da entrega</h3><p>Conteúdos organizados para circulação, relacionamento e continuidade da marca.</p></div></Reveal></div>
          </div>
        </section>

        <HarasSection />

        <section className="turn section">
          <Reveal><h2>A maioria contrata vídeo.<br />Poucos constroem patrimônio.</h2></Reveal>
          <div className="turn-grid">
            <Reveal className="turn-copy"><p>Material genérico envelhece antes do próximo leilão. Você paga, publica e logo ninguém lembra.</p><strong>Conteúdo que permanece paga a conta mais de uma vez.</strong></Reveal>
            <Reveal className="turn-visual"><img src="/media/cattle-rays.webp" alt="Gado em campo com luz cinematográfica" /></Reveal>
          </div>
        </section>

        <section id="servicos" className="section services-section">
          <Reveal><h2>Uma equipe.<br />Várias formas de acontecer.</h2><p className="section-intro">A solução começa pelo objetivo do projeto, não por uma tabela de serviços.</p></Reveal>
          <div className="services-grid">
            {services.map((service, index) => <Reveal className={`service service-${index + 1}`} key={service.key}><a href={service.href}><img src={service.image} alt={service.title} loading="lazy" /><div className="service-copy"><span>{service.name}</span><h3>{service.title}</h3><p>{service.body}</p><b>Conhecer solução</b></div></a></Reveal>)}
          </div>
        </section>

        <section className="offers section">
          <Reveal><h2>Escolha o nível<br />do seu resultado.</h2></Reveal>
          <div className="offer-list">
            {offers.map((offer) => <a href={offer.href} className="offer" key={offer.name}><span>{offer.tag}</span><h3>{offer.name}</h3><p>{offer.body}</p><b>Solicitar proposta</b></a>)}
          </div>
        </section>

        <section id="processo" className="process section">
          <div className="process-image"><img src="/media/edit-suite.webp" alt="Sala de edição audiovisual AR1 Studios" loading="lazy" /></div>
          <div className="process-content"><Reveal><h2>Simples de contratar.<br />Sério de executar.</h2></Reveal>{processSteps.map(([name, body]) => <Reveal className="process-step" key={name}><h3>{name}</h3><p>{body}</p></Reveal>)}</div>
        </section>

        <ProjectsSection />

        <section id={publishedProjects.length ? "portfolio-visual" : "projetos"} className="portfolio section">
          <Reveal><p className="eyebrow">Referências visuais</p><h2>Linguagens para o seu projeto.</h2><p className="section-intro">Uma seleção visual dos formatos que podemos desenvolver. Converse com a equipe sobre os trabalhos disponíveis para apresentação.</p></Reveal>
          <div className="portfolio-grid">{portfolio.map((item, index) => <Reveal className={`project project-${index + 1}`} key={item.title}><img src={item.image} alt={item.title} loading="lazy" /><div><span>{item.type}</span><h3>{item.title}</h3></div></Reveal>)}</div>
        </section>

        <section className="about section">
          <img src="/media/camera-auction-vertical.webp" alt="Equipe de transmissão em um leilão" loading="lazy" />
          <Reveal className="about-copy"><h2>Experiência de campo com repertório para outros mundos.</h2><p>A AR1 une atendimento próximo, produção audiovisual e organização de operação para eventos, marcas e projetos especiais.</p><p>O agronegócio é nossa principal força, mas a estrutura também pode se adaptar a contextos corporativos, culturais, esportivos, educacionais e institucionais.</p><a className="text-link" href="#contato">Conversar sobre um projeto</a></Reveal>
        </section>

        <section className="faq section"><Reveal><h2>Perguntas antes<br />da primeira conversa.</h2></Reveal><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

        <section id="contato" className="contact section">
          <img src="/media/glow-horizontal.webp" alt="Luz de horizonte em fundo escuro" loading="lazy" />
          <div className="contact-scrim" />
          <div className="contact-copy"><Reveal><h2>Seu próximo projeto pode trabalhar por anos.</h2><p>Conte seu objetivo. A conversa começa com clareza.</p></Reveal></div>
          <ContactForm defaultProject={new URLSearchParams(window.location.search).get("projeto") ?? ""} />
        </section>
      </main>
      <Footer />
    </>
  );
}

type ProductPageProps = { type: "live" | "legacy" };
function ProductPage({ type }: ProductPageProps) {
  const live = type === "live";
  const data = live ? {
    eyebrow: "AR1 LIVE",
    title: "Seu pregão com linguagem de televisão.",
    copy: "Aquecimento, transmissão multicâmera e melhores momentos em uma operação única.",
    image: "/media/event-stage.webp",
    project: "Leilão 360",
    points: ["Conteúdo de aquecimento antes do evento", "Direção de corte e transmissão multicâmera", "Melhores momentos para prolongar o resultado"],
  } : {
    eyebrow: "AR1 FILMS",
    title: "A história da sua fazenda não pode desaparecer.",
    copy: "Um documentário dirigido para preservar a memória, valorizar o plantel e atravessar gerações.",
    image: "/media/horse.webp",
    project: "Filme de Legado",
    points: ["Pesquisa e roteiro guiados pela história real", "Captação cinematográfica na propriedade", "Filme final pronto para acervo, eventos e relacionamento"],
  };

  return <><Header /><main id="conteudo"><section className="product-hero"><img src={data.image} alt={data.title} /><div className="hero-scrim" /><div className="product-hero-copy"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.copy}</p><a className="button primary" href="#contato">Solicitar proposta</a></div></section><section className="product-value section"><h2>O que este projeto entrega</h2><div>{data.points.map((point) => <article key={point}><span>AR1</span><p>{point}</p></article>)}</div></section><section className="product-story section"><img src={live ? "/media/camera-auction.webp" : "/media/cattle-wide.webp"} alt="Produção AR1 Studios" /><div><h2>{live ? "Antes, durante e depois do leilão." : "Não é registro. É patrimônio."}</h2><p>{live ? "O público chega aquecido, acompanha uma transmissão dirigida e recebe conteúdo que continua circulando depois do último lote." : "A produção transforma memória oral, imagens e território em um ativo que pertence à família e à marca."}</p></div></section><section id="contato" className="standalone-contact section"><div><h2>Vamos dimensionar seu projeto.</h2><p>Preencha os dados. Você recebe o próximo passo com clareza.</p></div><ContactForm defaultProject={data.project} /></section></main><Footer /></>;
}

function NotFound() {
  return <><Header /><main id="conteudo" className="not-found section"><p className="eyebrow">Página não encontrada</p><h1>Vamos encontrar o próximo caminho.</h1><p>Este endereço não corresponde a uma página da AR1 Studios.</p><a className="button primary" href="/">Voltar ao início</a></main><Footer /></>;
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  if (path === "/leilao-360") return <ProductPage type="live" />;
  if (path === "/filme-de-legado") return <ProductPage type="legacy" />;
  if (path.startsWith("/servicos/")) return <ServiceDetailPage slug={path.slice("/servicos/".length)} />;
  if (path === "/") return <Home />;
  return <NotFound />;
}

export default App;
