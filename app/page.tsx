import Image from "next/image";
import WaitlistForm from "../components/WaitlistForm";

const products = [
  { index: "01", name: "Otis Personal", label: "Your everyday AI", copy: "A private assistant that remembers your context, works across your Mac and connected apps, and asks before consequential actions.", className: "personal", screen: "Today" },
  { index: "02", name: "Otis Business", label: "Operations you can trust", copy: "A governed workspace for repeatable business processes, clear approvals, and work that needs to run the same way every time.", className: "business", screen: "Foundry" },
  { index: "03", name: "Otis IDE", label: "Build with a team of agents", copy: "A focused environment where agents discuss, plan, review, and work together on real projects under your direction.", className: "ide", screen: "Agent room" },
  { index: "04", name: "Otis Ecosystem", label: "One home for every Otis", copy: "The lightweight hub for installing, opening, updating, and caring for the Otis products on your Mac.", className: "hub", screen: "My apps" },
];

const flow = [
  ["Remember", "Context stays useful across the work you choose to bring in."],
  ["Coordinate", "The right Otis takes the job, while the ecosystem keeps the experience connected."],
  ["Act", "Work moves forward with visible controls, approvals, and a clear record."],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Otis home"><Image src="/brand/otis-mark.svg" width={40} height={40} alt="" priority /><span>Otis</span></a>
        <nav aria-label="Primary navigation"><a href="#ecosystem">Ecosystem</a><a href="#how-it-works">How it works</a><a href="#principles">Principles</a></nav>
        <a className="header-cta" href="#waitlist">Join early access <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="sky-orb sky-orb--one" aria-hidden="true" /><div className="sky-orb sky-orb--two" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> One intelligence. Four focused products.</p>
            <h1 id="hero-title">Your work has a new <em>ecosystem.</em></h1>
            <p className="hero-lede">Otis is a family of private AI products for your personal work, your business, and the software you build—all designed to feel like one calm system.</p>
            <WaitlistForm source="hero" />
            <div className="hero-proof" aria-label="Otis principles"><span>Built for Mac</span><span>Private by design</span><span>Permission-led</span></div>
          </div>
          <div className="ecosystem-orbit" aria-label="The Otis product ecosystem">
            <div className="orbit-line orbit-line--one" aria-hidden="true" /><div className="orbit-line orbit-line--two" aria-hidden="true" />
            <div className="orbit-core"><div className="core-mark"><Image src="/brand/otis-mark.svg" width={76} height={76} alt="" /></div><span>Otis</span><small>Your intelligent operating layer</small></div>
            <div className="orbit-card orbit-card--personal"><i>01</i><span>Personal</span><small>Remember & act</small></div>
            <div className="orbit-card orbit-card--business"><i>02</i><span>Business</span><small>Run with confidence</small></div>
            <div className="orbit-card orbit-card--ide"><i>03</i><span>IDE</span><small>Build together</small></div>
            <div className="orbit-card orbit-card--hub"><i>04</i><span>Ecosystem</span><small>Manage it all</small></div>
          </div>
        </section>

        <section className="intro section-shell" id="ecosystem">
          <p className="section-kicker">Meet the ecosystem</p>
          <div className="intro-heading"><h2>Not one giant app.<br />A connected set of tools.</h2><p>Each Otis product has a clear job. Together, they give you continuity without forcing every kind of work into the same interface.</p></div>
          <div className="product-grid">
            {products.map((product) => (
              <article className={`product-card product-card--${product.className}`} key={product.name}>
                <div className="product-meta"><span>{product.index}</span><small>{product.label}</small></div>
                <div className="product-preview" aria-hidden="true"><div className="mini-window"><div className="mini-rail"><Image src="/brand/otis-mark.svg" width={26} height={26} alt="" /><i /><i /><i /></div><div className="mini-content"><small>{product.screen}</small><strong>{product.name.replace("Otis ", "")}</strong><div className="mini-copy"><i /><i /><i /></div><div className="mini-action"><span /><b /></div></div></div></div>
                <h3>{product.name}</h3><p>{product.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="system-section" id="how-it-works"><div className="section-shell system-inner">
          <div className="system-copy"><p className="section-kicker">One system beneath it all</p><h2>Context moves with the work. Control stays with you.</h2><p>Otis is designed around continuity: the things you know, the work you are doing, and the choices you have already made. Each product stays focused while the ecosystem feels familiar.</p></div>
          <div className="flow-list">{flow.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div></section>

        <section className="principles section-shell" id="principles"><div className="principles-panel">
          <div><p className="section-kicker">The Otis standard</p><h2>Capable enough to help.<br />Calm enough to trust.</h2></div>
          <div className="principle-grid"><article><span>01</span><h3>Private by design</h3><p>Your work stays scoped to the spaces and sources you choose.</p></article><article><span>02</span><h3>Clear before action</h3><p>Important steps surface what will happen before they happen.</p></article><article><span>03</span><h3>Purpose-built</h3><p>Every product has a job, so the experience stays focused.</p></article></div>
        </div></section>

        <section className="waitlist-section section-shell" id="waitlist"><div className="waitlist-panel"><div><p className="section-kicker">Early access</p><h2>There is an Otis for the way you work.</h2><p>Join the list for thoughtful product updates and early access to the ecosystem.</p></div><WaitlistForm source="footer" compact /></div></section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="#top"><Image src="/brand/otis-mark.svg" width={34} height={34} alt="" /><span>Otis</span></a><p>Personal · Business · IDE · Ecosystem</p><div><a href="#principles">Principles</a><a href="#waitlist">Contact</a><span>© 2026 Otis</span></div></footer>
    </>
  );
}
