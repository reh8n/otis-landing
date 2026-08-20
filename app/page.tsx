import Image from "next/image";
import BubbleLink from "../components/BubbleLink";
import EcosystemOrbit from "../components/EcosystemOrbit";
import { MessageReveal, TypewriterText } from "../components/MotionText";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import WaitlistForm from "../components/WaitlistForm";
import { products } from "../lib/products";

const flow = [
  ["Remember", "Useful context stays close to the work you choose to bring in."],
  ["Coordinate", "Each focused Otis product handles its own job with a familiar way of working."],
  ["Act", "Work moves forward with visible controls, approvals, and a clear record."],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="sky-orb sky-orb--one" aria-hidden="true" />
          <div className="sky-orb sky-orb--two" aria-hidden="true" />
          <div className="hero-copy">
            <MessageReveal as="p" className="eyebrow"><span className="status-dot" /> One intelligence. Four focused products.</MessageReveal>
            <TypewriterText as="h1" id="hero-title" className="hero-title" text={"Your work has a new\necosystem."} accent="ecosystem." />
            <MessageReveal as="p" className="hero-lede" delay={180}>Otis is a family of focused AI products for your personal work, your business, and the software you build. Each has a clear job. Together, they feel like one calm system.</MessageReveal>
            <MessageReveal className="hero-form-reveal" delay={320}><WaitlistForm source="hero" /></MessageReveal>
            <MessageReveal className="hero-proof" delay={430} ariaLabel="Otis principles"><span>Built for Mac</span><span>Privacy conscious</span><span>Permission led</span></MessageReveal>
          </div>
          <EcosystemOrbit />
        </section>

        <section className="intro section-shell" id="ecosystem">
          <MessageReveal as="p" className="section-kicker">Meet the ecosystem</MessageReveal>
          <div className="intro-heading">
            <TypewriterText text={"Not one giant app.\nA connected set of tools."} />
            <MessageReveal as="p" delay={140}>Each Otis product has a clear job. Together, they give you a familiar experience without forcing every kind of work into one interface.</MessageReveal>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <MessageReveal delay={index % 2 === 0 ? 0 : 90} key={product.slug}>
                <BubbleLink className={`product-card product-card--${product.className} shine-link`} href={`/${product.slug}`}>
                  <span className="card-shine" aria-hidden="true" />
                  <div className="product-meta"><span>{product.index}</span><small>{product.label}</small></div>
                  <div className="product-preview" aria-hidden="true"><div className="mini-window"><div className="mini-rail"><Image src="/brand/otis-mark.svg" width={26} height={26} alt="" /><i /><i /><i /></div><div className="mini-content"><small>{product.screen}</small><strong>{product.shortName}</strong><div className="mini-copy"><i /><i /><i /></div><div className="mini-action"><span /><b /></div></div></div></div>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <span className="product-card__cta">Explore product <span aria-hidden="true">↗</span></span>
                </BubbleLink>
              </MessageReveal>
            ))}
          </div>
        </section>

        <section className="system-section" id="how-it-works">
          <div className="section-shell system-inner">
            <div className="system-copy">
              <MessageReveal as="p" className="section-kicker">One family, focused products</MessageReveal>
              <TypewriterText text={"Familiar by design.\nFocused by purpose."} />
              <MessageReveal as="p" delay={140}>Otis is building a family of products with a shared design language and the same emphasis on user control. Each product remains honest about what it can do today.</MessageReveal>
            </div>
            <div className="flow-list">
              {flow.map(([title, copy], index) => <MessageReveal as="article" delay={index * 100} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></MessageReveal>)}
            </div>
          </div>
        </section>

        <section className="principles section-shell" id="principles">
          <div className="principles-panel">
            <div><MessageReveal as="p" className="section-kicker">The Otis standard</MessageReveal><TypewriterText text={"Capable enough to help.\nCalm enough to trust."} /></div>
            <div className="principle-grid">
              <MessageReveal as="article"><span>01</span><h3>Privacy conscious</h3><p>Bring in only the spaces and sources you choose, with clear limits around outside services.</p></MessageReveal>
              <MessageReveal as="article" delay={90}><span>02</span><h3>Clear before action</h3><p>Important steps show what will happen before Otis proceeds.</p></MessageReveal>
              <MessageReveal as="article" delay={180}><span>03</span><h3>Purpose built</h3><p>Every product has a job, so the experience stays focused.</p></MessageReveal>
            </div>
          </div>
        </section>

        <section className="waitlist-section section-shell" id="waitlist">
          <div className="waitlist-panel">
            <div><MessageReveal as="p" className="section-kicker">Early access</MessageReveal><TypewriterText text="There is an Otis for the way you work." /><MessageReveal as="p" delay={140}>Join the list for thoughtful product updates and early access to the ecosystem.</MessageReveal></div>
            <MessageReveal delay={240}><WaitlistForm source="footer" compact /></MessageReveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
