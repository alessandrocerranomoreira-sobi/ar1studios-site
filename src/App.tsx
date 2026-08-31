import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./App.css";
import { faq, offers, portfolio, processSteps, services, siteConfig } from "./content";

type LeadForm = {
  name: string;
  phone: string;
  company: string;
  project: string;
  date: string;
};

const initialLead: LeadForm = { name: "", phone: "", company: "", project: "", date: "" };

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? "logo compact" : "logo"} src="/media/ar1-logo.png" alt="AR1 Studios" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand-link" href="/" aria-label="AR1 Studios, início"><Logo /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menu">
        <span /><span />
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <a href="/#servicos" onClick={() => setOpen(false)}>Serviços</a>
        <a href="/#projetos" onClick={() => setOpen(false)}>Projetos</a>
        <a href="/#processo" onClick={() => setOpen(false)}>Processo</a>
        <a href="/#contato" className="nav-cta" onClick={() => setOpen(false)}>Solicitar proposta</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div><Logo compact /><p>Sinal. Presença. Conteúdo que permanece.</p></div>
      <div className="footer-links">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <a href={siteConfig.instagramUrl}>Instagram</a>
        <a href={siteConfig.youtubeUrl}>YouTube</a>
        <a href={siteConfig.linkedinUrl}>LinkedIn</a>
      </div>
      <small>© 2026 AR1 Studios. Todos os direitos reservados.</small>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ContactForm({ defaultProject = "" }: { defaultProject?: string }) {
  const [lead, setLead] = useState<LeadForm>({ ...initialLead, project: defaultProject });
  const [status, setStatus] = useState("");
  const update = (field: keyof LeadForm, value: string) => setLead((current) => ({ ...current, [field]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = [
      "Olá, AR1 Studios. Quero solicitar uma proposta.",
      `Nome: ${lead.name}`,
      `WhatsApp: ${lead.phone}`,
      `Empresa/Fazenda: ${lead.company}`,
      `Projeto: ${lead.project}`,
      lead.date ? `Data prevista: ${lead.date}` : "",
    ].filter(Boolean).join("\n");

    if (siteConfig.whatsappNumber) {
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setStatus("Sua conversa foi aberta no WhatsApp.");
      return;
    }

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Solicitação de proposta AR1 Studios")}&body=${encodeURIComponent(message)}`;
    setStatus("Seu aplicativo de e-mail foi aberto. Para ativar o WhatsApp, preencha o número em src/content.ts.");
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Nome</label><input id="name" required value={lead.name} onChange={(e) => update("name", e.target.value)} /></div>
      <div className="field"><label htmlFor="phone">WhatsApp</label><input id="phone" required inputMode="tel" value={lead.phone} onChange={(e) => update("phone", e.target.value)} /></div>
      <div className="field"><label htmlFor="company">Empresa ou fazenda</label><input id="company" required value={lead.company} onChange={(e) => update("company", e.target.value)} /></div>
      <div className="field"><label htmlFor="project">Tipo de projeto</label><select id="project" required value={lead.project} onChange={(e) => update("project", e.target.value)}><option value="">Selecione</option><option>Leilão 360</option><option>Filme de Legado</option><option>Conteúdo recorrente</option><option>Pacote anual</option><option>Outro projeto</option></select></div>
      <div className="field full"><label htmlFor="date">Data prevista, se houver</label><input id="date" type="date" value={lead.date} onChange={(e) => update("date", e.target.value)} /></div>
      <button className="button primary full" type="submit">Solicitar proposta</button>
      <p className="form-note full" aria-live="polite">{status || "Sem compromisso. Resposta de gente, não de robô."}</p>
    </form>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <img className="hero-image" src="/media/hero-fields.webp" alt="Campos agrícolas e silos ao amanhecer" fetchPriority="high" />
          <div className="hero-scrim" />
          <div className="hero-content">
            <p className="eyebrow">Casa de conteúdo do agro</p>
            <h1>Seu legado merece mais do que um vídeo. <span>Merece um ativo.</span></h1>
            <p className="hero-copy">Filmes e transmissões que fazem sua marca vender e permanecer.</p>
            <div className="hero-actions"><a className="button primary" href="#contato">Solicitar proposta</a><a className="button secondary" href="#projetos">Ver trabalhos</a></div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Principais formatos">
          <span>Transmissões ao vivo</span><span>Filmes de legado</span><span>Conteúdo recorrente</span><span>Direção em nível cinema</span>
        </section>

        <section className="turn section">
          <Reveal><h2>A maioria contrata vídeo.<br />Poucos constroem patrimônio.</h2></Reveal>
          <div className="turn-grid">
            <Reveal className="turn-copy"><p>Material genérico envelhece antes do próximo leilão. Você paga, publica e logo ninguém lembra.</p><strong>Conteúdo que permanece paga a conta mais de uma vez.</strong></Reveal>
            <Reveal className="turn-visual"><img src="/media/cattle-rays.webp" alt="Gado em campo com luz cinematográfica" /></Reveal>
          </div>
        </section>

        <section id="servicos" className="section services-section">
          <Reveal><h2>Quatro frentes.<br />Uma assinatura.</h2><p className="section-intro">Todo projeto começa com estratégia, não com câmera.</p></Reveal>
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

        <section id="projetos" className="portfolio section">
          <Reveal><h2>O trabalho fala primeiro.</h2><p className="section-intro">Imagem para vender, emocionar e perpetuar.</p></Reveal>
          <div className="portfolio-grid">{portfolio.map((item, index) => <Reveal className={`project project-${index + 1}`} key={item.title}><img src={item.image} alt={item.title} loading="lazy" /><div><span>{item.type}</span><h3>{item.title}</h3></div></Reveal>)}</div>
        </section>

        <section className="about section">
          <img src="/media/camera-auction-vertical.webp" alt="Equipe de transmissão em um leilão" loading="lazy" />
          <Reveal className="about-copy"><h2>Uma casa construída sobre relação e acabamento.</h2><p>A AR1 une estratégia de conteúdo, relacionamento com o agro e direção audiovisual de alto nível.</p><p>Não somos uma produtora que também atende o campo. Nascemos do agro e falamos a língua de quem decide nele.</p><a className="text-link" href="#contato">Solicitar proposta</a></Reveal>
        </section>

        <section className="faq section"><Reveal><h2>Perguntas antes<br />da primeira conversa.</h2></Reveal><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

        <section id="contato" className="contact section">
          <img src="/media/glow-horizontal.webp" alt="Luz de horizonte em fundo escuro" loading="lazy" />
          <div className="contact-scrim" />
          <div className="contact-copy"><Reveal><h2>Seu próximo projeto pode trabalhar por anos.</h2><p>Conte seu objetivo. A conversa começa com clareza.</p></Reveal></div>
          <ContactForm />
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

  return <><Header /><main><section className="product-hero"><img src={data.image} alt={data.title} /><div className="hero-scrim" /><div className="product-hero-copy"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.copy}</p><a className="button primary" href="#contato">Solicitar proposta</a></div></section><section className="product-value section"><h2>O que este projeto entrega</h2><div>{data.points.map((point) => <article key={point}><span>AR1</span><p>{point}</p></article>)}</div></section><section className="product-story section"><img src={live ? "/media/camera-auction.webp" : "/media/cattle-wide.webp"} alt="Produção AR1 Studios" /><div><h2>{live ? "Antes, durante e depois do leilão." : "Não é registro. É patrimônio."}</h2><p>{live ? "O público chega aquecido, acompanha uma transmissão dirigida e recebe conteúdo que continua circulando depois do último lote." : "A produção transforma memória oral, imagens e território em um ativo que pertence à família e à marca."}</p></div></section><section id="contato" className="standalone-contact section"><div><h2>Vamos dimensionar seu projeto.</h2><p>Preencha os dados. Você recebe o próximo passo com clareza.</p></div><ContactForm defaultProject={data.project} /></section></main><Footer /></>;
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const path = window.location.pathname;
  if (path === "/leilao-360") return <ProductPage type="live" />;
  if (path === "/filme-de-legado") return <ProductPage type="legacy" />;
  return <Home />;
}

export default App;
