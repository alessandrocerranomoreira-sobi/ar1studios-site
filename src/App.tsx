import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "./App.css";
import {
  faq,
  flagshipOffers,
  harasApplications,
  harasFacts,
  legacyServiceDetails,
  methodSteps,
  principles,
  projectOptions,
  siteConfig,
  solutionFamilies,
} from "./content";

type LeadForm = {
  name: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  project: string;
  brief: string;
  date: string;
};

const initialLead: LeadForm = { name: "", role: "", phone: "", email: "", company: "", project: "", brief: "", date: "" };

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const canonicalUrl = `https://${siteConfig.domain}${path === "/" ? "/" : path}`;
    const setMeta = (selector: string, content: string) => {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = content;
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
  }, [title, description]);
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? "logo compact" : "logo"} src="/media/ar1-logo.png" alt="AR1 Studios" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const updateHeader = () => setScrolled(window.scrollY > 24);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const current = (href: string) => path === href ? "page" as const : undefined;

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <a className="brand-link" href="/" aria-label="AR1 Studios, início"><Logo /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}><span aria-hidden="true" /><span aria-hidden="true" /></button>
      {open && <button className="menu-backdrop" type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
      <nav id="main-navigation" className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <a href="/solucoes" aria-current={current("/solucoes")} onClick={() => setOpen(false)}>Soluções</a>
        <a href="/haras-sobi" aria-current={current("/haras-sobi")} onClick={() => setOpen(false)}>Haras SOBI</a>
        <a href="/metodo" aria-current={current("/metodo")} onClick={() => setOpen(false)}>Método</a>
        <a href="/sobre" aria-current={current("/sobre")} onClick={() => setOpen(false)}>Sobre</a>
        <a href="/#contato" className="nav-cta" onClick={() => setOpen(false)}>Solicitar proposta</a>
      </nav>
    </header>
  );
}

function Footer() {
  const socialLinks = [
    ["Instagram", siteConfig.instagramUrl],
    ["YouTube", siteConfig.youtubeUrl],
    ["LinkedIn", siteConfig.linkedinUrl],
  ].filter(([, url]) => Boolean(url));

  return (
    <footer className="footer">
      <div className="footer-brand"><Logo compact /><p>Capacidade de mídia, produção e locação para projetos que precisam acontecer com clareza.</p></div>
      <div className="footer-nav" aria-label="Links institucionais">
        <a href="/solucoes">Soluções</a><a href="/haras-sobi">Haras SOBI</a><a href="/metodo">Método</a><a href="/sobre">Sobre</a>
      </div>
      <div className="footer-contact"><span>Contato</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{socialLinks.map(([label, url]) => <a key={label} href={url}>{label}</a>)}</div>
      <small>© 2026 AR1 Studios. Todos os direitos reservados.</small>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ContactForm({ defaultProject = "" }: { defaultProject?: string }) {
  const [lead, setLead] = useState<LeadForm>({ ...initialLead, project: projectOptions.includes(defaultProject as typeof projectOptions[number]) ? defaultProject : "" });
  const [status, setStatus] = useState("");
  const update = (field: keyof LeadForm, value: string) => setLead((current) => ({ ...current, [field]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = [
      "Olá, AR1 Studios. Quero solicitar uma proposta.",
      `Nome: ${lead.name}`,
      lead.role ? `Cargo/função: ${lead.role}` : "",
      `WhatsApp: ${lead.phone}`,
      lead.email ? `E-mail: ${lead.email}` : "",
      `Empresa/organização: ${lead.company}`,
      `Interesse: ${lead.project}`,
      lead.date ? `Data prevista: ${lead.date}` : "",
      lead.brief ? `Necessidade: ${lead.brief}` : "",
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
    <form className="lead-form" onSubmit={submit} aria-label="Solicitação de proposta" aria-describedby="form-status form-privacy">
      <p className="form-heading full"><span>Briefing inicial</span><strong>Conte o essencial. A AR1 organiza o próximo passo.</strong></p>
      <div className="field"><label htmlFor="name">Nome <span>obrigatório</span></label><input id="name" autoComplete="name" maxLength={80} required value={lead.name} onChange={(event) => update("name", event.target.value)} /></div>
      <div className="field"><label htmlFor="role">Cargo ou função</label><input id="role" autoComplete="organization-title" maxLength={100} value={lead.role} onChange={(event) => update("role", event.target.value)} /></div>
      <div className="field"><label htmlFor="phone">WhatsApp <span>obrigatório</span></label><input id="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={24} placeholder="(00) 00000-0000" required value={lead.phone} onChange={(event) => update("phone", event.target.value)} /></div>
      <div className="field"><label htmlFor="email">E-mail</label><input id="email" type="email" inputMode="email" autoComplete="email" maxLength={160} placeholder="voce@empresa.com.br" value={lead.email} onChange={(event) => update("email", event.target.value)} /></div>
      <div className="field"><label htmlFor="company">Empresa, organização ou projeto <span>obrigatório</span></label><input id="company" autoComplete="organization" maxLength={160} required value={lead.company} onChange={(event) => update("company", event.target.value)} /></div>
      <div className="field"><label htmlFor="project">Principal interesse <span>obrigatório</span></label><select id="project" required value={lead.project} onChange={(event) => update("project", event.target.value)}><option value="">Selecione</option>{projectOptions.map((project) => <option key={project} value={project}>{project}</option>)}</select></div>
      <div className="field full"><label htmlFor="brief">O que precisa acontecer?</label><textarea id="brief" rows={4} maxLength={1000} value={lead.brief} onChange={(event) => update("brief", event.target.value)} placeholder="Conte o objetivo, o público e a necessidade principal." /></div>
      <div className="field full"><label htmlFor="date">Data prevista, se houver</label><input id="date" type="date" value={lead.date} onChange={(event) => update("date", event.target.value)} /></div>
      <button className="button primary full" type="submit">Solicitar proposta</button>
      <p id="form-status" className="form-note full" role="status" aria-live="polite">{status || "A AR1 avalia aderência, estrutura e próximos passos antes de apresentar a proposta."}</p>
      <p id="form-privacy" className="form-privacy full">Ao solicitar contato, você autoriza a AR1 a responder pelos dados informados. Nenhum dado é salvo no site nesta versão.</p>
    </form>
  );
}

function ContactSection({ defaultProject = "", title = "Vamos colocar seu próximo projeto em operação." }: { defaultProject?: string; title?: string }) {
  return (
    <section id="contato" className="contact section-dark">
      <div className="contact-visual"><img src="/media/glow-horizontal.webp" alt="Luz no horizonte" loading="lazy" /><div className="image-overlay" /></div>
      <div className="contact-layout page-shell">
        <Reveal className="contact-copy"><p className="eyebrow">Próximo passo</p><h2>{title}</h2><p>Conte o que precisa acontecer. A conversa começa pela aderência, não por uma tabela pronta.</p><ul className="contact-points"><li><span>01</span>Resposta humana e contextual</li><li><span>02</span>Escopo antes do orçamento</li><li><span>03</span>Agenda e viabilidade confirmadas</li></ul></Reveal>
        <ContactForm defaultProject={defaultProject} />
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, summary, image, cta = "Solicitar proposta", href = "#contato" }: { eyebrow: string; title: string; summary: string; image: string; cta?: string; href?: string }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" fetchPriority="high" />
      <div className="image-overlay" />
      <div className="page-hero-copy page-shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p><a className="button primary" href={href}>{cta}</a></div>
    </section>
  );
}

function FamilyCards({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={`family-grid ${expanded ? "expanded" : ""}`}>
      {solutionFamilies.map((family) => (
        <Reveal className="family-card" key={family.key}>
          <div className="family-index"><span>{family.number}</span><small>{family.eyebrow}</small></div>
          {expanded && <img src={family.image} alt="" loading="lazy" />}
          <h3>{family.title}</h3><p>{family.body}</p>
          <ul>{family.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <b>{family.status}</b>
        </Reveal>
      ))}
    </div>
  );
}

function FlagshipGrid() {
  return (
    <div className="flagship-grid">
      {flagshipOffers.map((offer) => (
        <Reveal className="flagship-card" key={offer.title}><a href={offer.href}><img src={offer.image} alt="" loading="lazy" /><div className="image-overlay" /><div className="flagship-copy"><span>{offer.tag}</span><h3>{offer.title}</h3><p>{offer.body}</p><b>Conhecer oferta</b></div></a></Reveal>
      ))}
    </div>
  );
}

function Home() {
  usePageMeta("AR1 Studios | Capacidade de mídia, produção e Haras SOBI", "A AR1 estrutura e opera conteúdo, estúdios, transmissões e produções especiais. Conheça também o Haras SOBI, locação para grandes projetos.");
  const queryProject = new URLSearchParams(window.location.search).get("projeto") ?? "";

  return (
    <><Header /><main id="conteudo">
      <section className="home-hero">
        <img src="/media/event-stage.webp" alt="Estrutura de palco e produção audiovisual" fetchPriority="high" />
        <div className="image-overlay" />
        <div className="home-hero-copy page-shell"><p className="eyebrow">Capacidade de mídia · produção · locação</p><h1>Conhecimento, estrutura e histórias <span>colocados em operação.</span></h1><p>A AR1 organiza conteúdo, estúdios, transmissões e produções especiais — com o Haras SOBI como uma de suas principais plataformas de criação.</p><div className="hero-actions"><a className="button primary" href="#contato">Solicitar proposta</a><a className="button ghost" href="/solucoes">Conhecer soluções</a></div></div>
        <a className="hero-haras-link" href="/haras-sobi"><span>Oferta principal</span><strong>Conheça o Haras SOBI</strong><b>+20 cenários · até 4 mil pessoas</b></a>
      </section>

      <section className="signal-band" aria-label="Principais capacidades"><span>Operação de conteúdo</span><span>Estúdios e consultoria</span><span>Transmissões ao vivo</span><span>Haras SOBI</span></section>

      <section className="thesis section-light"><div className="page-shell split"><Reveal><p className="eyebrow">O ponto de partida</p><h2>Sua organização já tem conhecimento. O desafio é colocá-lo em circulação.</h2></Reveal><Reveal className="large-copy"><p>A AR1 combina estratégia, estrutura e produção para transformar especialistas, eventos, espaços e histórias em ativos de mídia que podem ser usados de forma consistente.</p><strong>O formato vem depois. Primeiro definimos o que a operação precisa resolver.</strong></Reveal></div></section>

      <section className="haras-feature section-dark">
        <div className="page-shell"><div className="section-heading"><Reveal><p className="eyebrow">Oferta principal · Haras SOBI</p><h2>Um dos maiores espaços de produção de conteúdo do Brasil.</h2></Reveal><Reveal><p>Uma locação de grande escala para shows, DVDs, clipes, campanhas, filmes, podcasts, transmissões e eventos — com estrutura e produção dimensionadas em conjunto.</p><a className="button primary" href="/haras-sobi">Explorar o Haras SOBI</a></Reveal></div><div className="fact-grid">{harasFacts.map((fact) => <Reveal className="fact-card" key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></Reveal>)}</div></div>
      </section>

      <section className="solutions-overview section-light"><div className="page-shell"><Reveal className="section-heading compact"><div><p className="eyebrow">Como a AR1 atua</p><h2>Três famílias. Uma operação conectada.</h2></div><p>Da recorrência editorial à construção de estúdios e aos projetos de grande escala.</p></Reveal><FamilyCards /><a className="text-link" href="/solucoes">Ver todas as soluções</a></div></section>

      <section className="flagships section-dark"><div className="page-shell"><Reveal><p className="eyebrow">Ofertas principais</p><h2>Estruturas reconhecíveis para desafios específicos.</h2></Reveal><FlagshipGrid /></div></section>

      <section className="method-preview section-light"><div className="page-shell split"><Reveal><p className="eyebrow">Método AR1</p><h2>Clareza antes da câmera.</h2><p className="section-intro dark">Cada projeto começa pela decisão, pelo público e pelo uso. Equipamento, equipe e formato entram depois.</p><a className="text-link" href="/metodo">Conhecer o método</a></Reveal><div className="method-list">{methodSteps.map((step) => <Reveal className="method-row" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></Reveal>)}</div></div></section>

      <section className="truth-section section-dark"><div className="page-shell split"><Reveal><p className="eyebrow">Padrão de prova</p><h2>Promessa só entra depois da evidência.</h2></Reveal><Reveal className="large-copy"><p>Casos, números, depoimentos e capacidades precisam ser verificáveis. Enquanto uma oferta estiver em piloto, ela será apresentada como piloto. Essa disciplina protege o cliente e a AR1.</p></Reveal></div></section>

      <section className="about-preview section-light"><div className="page-shell media-split"><img src="/media/camera-auction-vertical.webp" alt="Operação audiovisual em evento" loading="lazy" /><Reveal><p className="eyebrow">AR1 Studios</p><h2>Experiência de campo. Visão de operação.</h2><p>A força construída no agro convive com uma atuação multissetorial. A AR1 trabalha com empresas B2B, instituições, eventos, marcas e projetos culturais que precisam organizar conhecimento, presença e produção.</p><a className="text-link" href="/sobre">Conhecer a AR1</a></Reveal></div></section>

      <section className="faq section-light"><div className="page-shell split"><Reveal><p className="eyebrow">Perguntas frequentes</p><h2>Antes da primeira conversa.</h2></Reveal><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <ContactSection defaultProject={queryProject} />
    </main><Footer /></>
  );
}

function SolutionsPage() {
  usePageMeta("Soluções | AR1 Studios", "Operação de conteúdo, implantação de estúdios, transmissões, filmes e produções especiais da AR1 Studios.");
  return <><Header /><main id="conteudo"><PageHero eyebrow="Soluções AR1" title="A estrutura certa para cada estágio da sua operação de mídia." summary="A AR1 pode operar conteúdo, construir capacidade interna ou assumir projetos especiais. O desenho começa pelo problema e pela forma de uso." image="/media/edit-suite.webp" href="#familias" cta="Explorar soluções" /><section id="familias" className="page-section section-light"><div className="page-shell"><Reveal><p className="eyebrow">Arquitetura comercial</p><h2>Escolha pelo desafio, não pelo equipamento.</h2></Reveal><FamilyCards expanded /></div></section><section className="decision-section section-dark"><div className="page-shell"><Reveal><p className="eyebrow">Como decidir</p><h2>Três perguntas organizam o próximo passo.</h2></Reveal><div className="decision-grid"><article><span>01</span><h3>Você precisa de cadência?</h3><p>Operação de Conteúdo organiza especialistas, pauta, produção e entregas recorrentes.</p></article><article><span>02</span><h3>Você precisa de autonomia?</h3><p>Construir Capacidade avalia, projeta e ativa uma estrutura própria para sua organização.</p></article><article><span>03</span><h3>Você precisa realizar um marco?</h3><p>Projetos Especiais reúne transmissão, evento, filme, locação e produção sob medida.</p></article></div></div></section><section className="page-section section-light"><div className="page-shell"><Reveal><p className="eyebrow">Ofertas principais</p><h2>Produtos com identidade própria.</h2></Reveal><FlagshipGrid /></div></section><ContactSection title="Vamos identificar a solução com maior aderência." /></main><Footer /></>;
}

function MethodPage() {
  usePageMeta("Método | AR1 Studios", "Conheça o método da AR1 Studios para diagnosticar, desenhar, produzir e evoluir operações de mídia e projetos especiais.");
  return <><Header /><main id="conteudo"><PageHero eyebrow="Método AR1" title="Produção séria começa antes da gravação." summary="O método organiza objetivo, pessoas, estrutura, responsabilidade e uso. Assim, cada escolha técnica serve ao resultado do projeto." image="/media/camera-auction.webp" href="#etapas" cta="Conhecer as etapas" /><section id="etapas" className="page-section section-light"><div className="page-shell"><Reveal><p className="eyebrow">Do diagnóstico à evolução</p><h2>Quatro etapas. Nenhum atalho invisível.</h2></Reveal><div className="method-grid">{methodSteps.map((step) => <Reveal className="method-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></Reveal>)}</div></div></section><section className="principles-section section-dark"><div className="page-shell split"><Reveal><p className="eyebrow">Princípios de decisão</p><h2>O que orienta cada projeto.</h2></Reveal><div className="principle-list">{principles.map(([title, body], index) => <Reveal className="principle-row" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></Reveal>)}</div></div></section><section className="proof-process section-light"><div className="page-shell split"><Reveal><p className="eyebrow">Governança de prova</p><h2>O que pode ser publicado precisa ser sustentado.</h2></Reveal><Reveal className="large-copy"><p>A AR1 separa capacidade comprovada, material autorizado, piloto em validação e hipótese. Isso evita que referência visual pareça portfólio e que proposta futura pareça resultado passado.</p><strong>Clareza comercial também é parte da entrega.</strong></Reveal></div></section><ContactSection title="Vamos avaliar se existe aderência." /></main><Footer /></>;
}

function AboutPage() {
  usePageMeta("Sobre | AR1 Studios", "A AR1 Studios conecta estratégia, produção audiovisual, transmissões, estúdios e locação para organizações e projetos especiais.");
  return <><Header /><main id="conteudo"><PageHero eyebrow="Sobre a AR1" title="O primeiro sinal de uma operação que precisa ganhar forma." summary="A AR1 conecta visão estratégica, produção audiovisual e estrutura para transformar conhecimento, espaços e histórias em presença organizada." image="/media/cattle-rays.webp" /><section className="page-section section-light"><div className="page-shell split"><Reveal><p className="eyebrow">Nossa direção</p><h2>Do campo para uma atuação multissetorial.</h2></Reveal><Reveal className="large-copy"><p>A experiência no agronegócio formou repertório para lidar com território, evento, transmissão, relacionamento e histórias de patrimônio. Essa força não limita a AR1: ela sustenta uma atuação com empresas B2B, instituições, marcas e projetos culturais.</p><p>A empresa avança para um modelo que une produção, consultoria e capacidade de mídia, sempre com ofertas e responsabilidades claramente definidas.</p></Reveal></div></section><section className="about-visual section-dark"><div className="page-shell media-split reverse"><img src="/media/event-stage.webp" alt="Estrutura de palco e produção" loading="lazy" /><Reveal><p className="eyebrow">Uma marca, várias capacidades</p><h2>Estratégia, estrutura e execução sob a mesma direção.</h2><p>A AR1 não cria uma submarca para cada serviço. Operação de conteúdo, estúdios, transmissões, filmes e Haras SOBI pertencem à mesma proposta de valor: fazer a mídia funcionar dentro de um objetivo real.</p></Reveal></div></section><section className="page-section section-light"><div className="page-shell"><Reveal><p className="eyebrow">Compromissos</p><h2>Como queremos trabalhar.</h2></Reveal><div className="commitment-grid"><article><span>01</span><h3>Escopo claro</h3><p>Entregas, responsabilidades e limites definidos antes da execução.</p></article><article><span>02</span><h3>Estrutura adequada</h3><p>Recursos dimensionados pela necessidade, e não pela aparência.</p></article><article><span>03</span><h3>Presença que permanece</h3><p>Conteúdo organizado para continuar útil depois do momento de produção.</p></article></div></div></section><ContactSection /></main><Footer /></>;
}

function HarasPage() {
  usePageMeta("Haras SOBI | Locação e produção AR1 Studios", "Conheça o Haras SOBI: mais de 20 cenários, pista para shows e gravações de DVD e espaço coberto para até 4 mil pessoas.");
  const gallery = [
    ["/media/fields-square.webp", "Paisagens e áreas externas"],
    ["/media/horse.webp", "Narrativas rurais e de patrimônio"],
    ["/media/event-stage.webp", "Shows, eventos e grandes montagens"],
    ["/media/mist-fields.webp", "Atmosferas para filmes e campanhas"],
  ];
  return (
    <><Header /><main id="conteudo">
      <PageHero eyebrow="Haras SOBI · oferta principal AR1" title="Um território inteiro para colocar grandes ideias em cena." summary="Um dos maiores espaços de produção de conteúdo do Brasil, com mais de 20 cenários, pista de laço para shows e DVDs e área coberta para até 4 mil pessoas." image="/media/horse.webp" cta="Consultar agenda e proposta" />
      <section className="haras-numbers section-light"><div className="page-shell"><Reveal><p className="eyebrow">Escala real</p><h2>Mais possibilidades. Menos deslocamentos.</h2></Reveal><div className="fact-grid light">{harasFacts.map((fact) => <Reveal className="fact-card" key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></Reveal>)}</div></div></section>
      <section className="haras-gallery-section section-dark"><div className="page-shell"><Reveal className="section-heading compact"><div><p className="eyebrow">Uma locação, muitas linguagens</p><h2>Do íntimo ao monumental.</h2></div><p>O desenho do projeto define áreas, circulação, montagem, equipe, captação e operação. A disponibilidade é confirmada conforme agenda e avaliação técnica.</p></Reveal><div className="venue-gallery">{gallery.map(([image, label], index) => <Reveal className={`venue-shot shot-${index + 1}`} key={label}><img src={image} alt={label} loading="lazy" /><span>{String(index + 1).padStart(2, "0")} · {label}</span></Reveal>)}</div></div></section>
      <section className="applications-section section-light"><div className="page-shell"><Reveal><p className="eyebrow">O que pode acontecer aqui</p><h2>Uma plataforma para produção, evento e experiência.</h2></Reveal><div className="application-grid">{harasApplications.map(([title, body], index) => <Reveal className="application-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></section>
      <section className="haras-operation section-dark"><div className="page-shell split"><Reveal><p className="eyebrow">Modelo de contratação</p><h2>Locação e produção podem ser pensadas juntas.</h2></Reveal><Reveal className="large-copy"><p>A proposta é construída conforme formato, público, data, áreas utilizadas, montagem, equipe, operação audiovisual e responsabilidades. Cada projeto passa por briefing e avaliação de viabilidade.</p><strong>O espaço abre possibilidades. O planejamento transforma possibilidade em execução.</strong></Reveal></div></section>
      <ContactSection defaultProject="Haras SOBI" title="Vamos desenhar sua produção no Haras SOBI." />
    </main><Footer /></>
  );
}

function ProductPage({ type }: { type: "live" | "legacy" }) {
  const live = type === "live";
  const data = live ? {
    pageTitle: "Leilão 360 | AR1 Studios",
    description: "Aquecimento, transmissão dirigida e conteúdo posterior para leilões.",
    eyebrow: "Leilão 360",
    title: "O leilão começa antes do primeiro lote e continua depois do último.",
    summary: "Conteúdo de aquecimento, transmissão dirigida e entregas posteriores organizados em uma operação única.",
    image: "/media/event-stage.webp",
    project: "Leilão 360",
    points: ["Aquecimento e agenda de conteúdo", "Planejamento e transmissão dirigida", "Melhores momentos e ativos posteriores"],
    storyTitle: "Presença em toda a jornada do evento.",
    story: "A operação é dimensionada para o formato do leilão, os canais, o público e os conteúdos que precisam continuar circulando.",
    storyImage: "/media/camera-auction.webp",
  } : {
    pageTitle: "Filme de Legado | AR1 Studios",
    description: "Pesquisa, roteiro e produção de filmes para preservar histórias de famílias, propriedades e marcas.",
    eyebrow: "Filme de Legado",
    title: "Histórias importantes não podem depender apenas da memória.",
    summary: "Pesquisa, roteiro e produção audiovisual para preservar patrimônio, identidade e visão através das gerações.",
    image: "/media/horse.webp",
    project: "Filme de marca ou legado",
    points: ["Pesquisa e escuta da história", "Roteiro e captação dirigida", "Filme final para acervo, eventos e relacionamento"],
    storyTitle: "Não é apenas registro. É patrimônio.",
    story: "Memória oral, imagens, território e documentos ganham uma narrativa capaz de permanecer com a família e com a marca.",
    storyImage: "/media/cattle-wide.webp",
  };
  usePageMeta(data.pageTitle, data.description);
  return <><Header /><main id="conteudo"><PageHero eyebrow={data.eyebrow} title={data.title} summary={data.summary} image={data.image} /><section className="product-value section-light"><div className="page-shell"><Reveal><p className="eyebrow">O que organiza</p><h2>Uma entrega pensada como ativo.</h2></Reveal><div className="value-grid">{data.points.map((point, index) => <Reveal className="value-card" key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></Reveal>)}</div></div></section><section className="product-story section-dark"><div className="page-shell media-split"><img src={data.storyImage} alt="Produção AR1 Studios" loading="lazy" /><Reveal><p className="eyebrow">Visão do projeto</p><h2>{data.storyTitle}</h2><p>{data.story}</p></Reveal></div></section><ContactSection defaultProject={data.project} /></main><Footer /></>;
}

function LegacyServicePage({ slug }: { slug: string }) {
  const data = legacyServiceDetails.find((service) => service.slug === slug);
  usePageMeta(data ? `${data.title} | AR1 Studios` : "Página não encontrada | AR1 Studios", data?.summary ?? "Este endereço não corresponde a uma página da AR1 Studios.");
  if (!data) return <NotFound />;
  return <><Header /><main id="conteudo"><PageHero eyebrow={data.eyebrow} title={data.title} summary={data.summary} image={data.image} /><section className="legacy-capability section-light"><div className="page-shell split"><Reveal><p className="eyebrow">Capacidade integrada</p><h2>Esta frente agora faz parte da nova arquitetura AR1.</h2><p className="section-intro dark">A solução é combinada com estratégia, estrutura e produção conforme o contexto.</p><a className="text-link" href="/solucoes">Ver arquitetura de soluções</a></Reveal><div className="capability-list">{data.items.map((item, index) => <Reveal className="capability-row" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></Reveal>)}</div></div></section><ContactSection defaultProject={data.project} /></main><Footer /></>;
}

function NotFound() {
  usePageMeta("Página não encontrada | AR1 Studios", "Este endereço não corresponde a uma página da AR1 Studios.");
  return <><Header /><main id="conteudo" className="not-found section-dark"><div className="page-shell"><p className="eyebrow">Página não encontrada</p><h1>Vamos encontrar o próximo caminho.</h1><p>Este endereço não corresponde a uma página da AR1 Studios.</p><a className="button primary" href="/">Voltar ao início</a></div></main><Footer /></>;
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: "0px 0px -24px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  if (path === "/") return <Home />;
  if (path === "/solucoes") return <SolutionsPage />;
  if (path === "/metodo") return <MethodPage />;
  if (path === "/sobre") return <AboutPage />;
  if (path === "/haras-sobi") return <HarasPage />;
  if (path === "/leilao-360") return <ProductPage type="live" />;
  if (path === "/filme-de-legado") return <ProductPage type="legacy" />;
  if (path.startsWith("/servicos/")) return <LegacyServicePage slug={path.slice("/servicos/".length)} />;
  return <NotFound />;
}

export default App;
