import Image from "next/image";
import WaitlistForm from "../components/WaitlistForm";

const features = [
  {
    number: "01",
    label: "Personal context",
    title: "Knows what matters to you.",
    copy: "Otis works from the notes, files, conversations, and decisions you choose to keep close—so you spend less time repeating yourself.",
    accent: "blue",
  },
  {
    number: "02",
    label: "Projects",
    title: "Keeps the whole picture together.",
    copy: "Bring research, tasks, source material, and live conversations into durable project hubs that get clearer as the work moves.",
    accent: "lilac",
  },
  {
    number: "03",
    label: "Desktop actions",
    title: "Moves work forward on your Mac.",
    copy: "Find a local file, prepare an update, or work across connected tools. Otis can take the next step—not just describe it.",
    accent: "mint",
  },
  {
    number: "04",
    label: "Permission control",
    title: "Asks before the important stuff.",
    copy: "Review the exact action, destination, and changes before anything consequential happens. Your workspace stays yours.",
    accent: "peach",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Otis home">
          <Image
            src="/brand/otis-mark.svg"
            width={42}
            height={42}
            alt=""
            priority
          />
          <span>Otis</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#features">What it does</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <a className="header-cta" href="#waitlist">
          Join waitlist <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              Private beta · Built for your Mac
            </p>
            <h1 id="hero-title">
              Your personal AI.
              <span>At work.</span>
            </h1>
            <p className="hero-lede">
              Otis remembers the context you care about, keeps projects moving,
              and helps with real desktop work—with you in control.
            </p>
            <WaitlistForm source="hero" />
            <div className="hero-proof" aria-label="Otis product principles">
              <span>Local-first context</span>
              <span>Permission-led actions</span>
              <span>Made for focused work</span>
            </div>
          </div>

          <div className="hero-product" aria-label="Otis product preview">
            <div className="glyph-field" aria-hidden="true">
              {Array.from({ length: 44 }, (_, index) => (
                <span key={index}>
                  {["+", "·", "×", "⌁", "•"][index % 5]}
                </span>
              ))}
            </div>
            <div className="app-window">
              <div className="window-bar">
                <div className="window-lights" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <strong>Otis OS</strong>
                <span className="online-label">
                  <i /> Agent online
                </span>
              </div>
              <div className="window-body">
                <aside className="app-nav" aria-label="Product preview navigation">
                  <div className="mini-brand">
                    <Image
                      src="/brand/otis-mark.svg"
                      width={34}
                      height={34}
                      alt=""
                    />
                    <span>Otis</span>
                  </div>
                  {[
                    ["◌", "Chat"],
                    ["□", "Files"],
                    ["✓", "Tasks"],
                    ["◇", "Memory"],
                  ].map(([icon, label], index) => (
                    <div
                      className={`app-nav-item${index === 0 ? " active" : ""}`}
                      key={label}
                    >
                      <span aria-hidden="true">{icon}</span>
                      {label}
                    </div>
                  ))}
                  <div className="app-nav-project">
                    <small>Current project</small>
                    <strong>Launch Otis</strong>
                    <span>8 notes · 4 tasks</span>
                  </div>
                </aside>
                <div className="chat-preview">
                  <div className="chat-heading">
                    <div>
                      <small>PROJECT HUB</small>
                      <strong>Launch Otis</strong>
                    </div>
                    <button type="button" tabIndex={-1}>
                      ···
                    </button>
                  </div>
                  <div className="chat-stream">
                    <div className="message message--user">
                      Pull the launch notes together and tell me what needs my
                      attention today.
                    </div>
                    <div className="message message--otis">
                      <div className="message-source">
                        <Image
                          src="/brand/otis-mark.svg"
                          width={26}
                          height={26}
                          alt=""
                        />
                        <strong>Otis</strong>
                      </div>
                      <p>
                        You have three launch decisions to make. I grouped them
                        by urgency and linked the notes I used.
                      </p>
                      <div className="task-row">
                        <span className="task-check">1</span>
                        <span>
                          <strong>Approve homepage narrative</strong>
                          <small>Today · Product launch</small>
                        </span>
                        <em>Review</em>
                      </div>
                      <div className="task-row">
                        <span className="task-check">2</span>
                        <span>
                          <strong>Confirm beta cohort</strong>
                          <small>Tomorrow · 24 people</small>
                        </span>
                        <em>Open</em>
                      </div>
                    </div>
                  </div>
                  <div className="composer">
                    <span>Ask Otis about this project…</span>
                    <i aria-hidden="true">↑</i>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-card floating-card--permission">
              <span className="floating-icon">⌁</span>
              <div>
                <small>Permission requested</small>
                <strong>Update launch brief?</strong>
              </div>
              <span className="approval-pill">Review</span>
            </div>
            <div className="floating-card floating-card--memory">
              <span className="memory-orb">12</span>
              <div>
                <small>Context connected</small>
                <strong>12 useful sources</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="product-section section-shell" id="product">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Inside Otis</p>
              <h2>One calm place for work that usually lives everywhere.</h2>
            </div>
            <p>
              Conversations become durable context. Context stays organized by
              project. Actions stay visible before they happen.
            </p>
          </div>

          <div className="screenshot-gallery">
            <figure className="screenshot-card screenshot-card--wide">
              <div className="screenshot-frame">
                <Image
                  src="/screenshots/chat-history.webp"
                  width={1600}
                  height={1000}
                  alt="Otis chat history organized around a launch project"
                />
              </div>
              <figcaption>
                <span>01 · Chat history</span>
                <strong>Pick up where the work left off.</strong>
              </figcaption>
            </figure>
            <figure className="screenshot-card">
              <div className="screenshot-frame">
                <Image
                  src="/screenshots/project-hub.webp"
                  width={1600}
                  height={1000}
                  alt="Otis project hub with notes, tasks, and sources"
                />
              </div>
              <figcaption>
                <span>02 · Project hubs</span>
                <strong>Keep every moving part in view.</strong>
              </figcaption>
            </figure>
            <figure className="screenshot-card">
              <div className="screenshot-frame">
                <Image
                  src="/screenshots/desktop-action.webp"
                  width={1600}
                  height={1000}
                  alt="Otis asking permission before a desktop file action"
                />
              </div>
              <figcaption>
                <span>03 · Desktop actions</span>
                <strong>Review the move before Otis makes it.</strong>
              </figcaption>
            </figure>
          </div>
          <p className="capture-note">
            Privacy-safe product preview captures. Final in-app captures will
            replace these as the beta UI settles.
          </p>
        </section>

        <section className="features-section section-shell" id="features">
          <div className="section-heading section-heading--stacked">
            <p className="section-kicker">What makes Otis different</p>
            <h2>Less prompting. More continuity.</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article
                className={`feature-card feature-card--${feature.accent}`}
                key={feature.number}
              >
                <div className="feature-topline">
                  <span>{feature.number}</span>
                  <small>{feature.label}</small>
                </div>
                <div className="feature-visual" aria-hidden="true">
                  {feature.number === "01" && (
                    <div className="context-stack">
                      <span>Project notes</span>
                      <span>Decisions</span>
                      <span>Preferences</span>
                    </div>
                  )}
                  {feature.number === "02" && (
                    <div className="project-map">
                      <span>Launch</span>
                      <i />
                      <b>8 notes</b>
                      <i />
                      <b>4 tasks</b>
                    </div>
                  )}
                  {feature.number === "03" && (
                    <div className="action-sequence">
                      <span>Find</span>
                      <i>→</i>
                      <span>Review</span>
                      <i>→</i>
                      <span>Do</span>
                    </div>
                  )}
                  {feature.number === "04" && (
                    <div className="permission-toggle">
                      <span>Always ask first</span>
                      <i><b /></i>
                    </div>
                  )}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="privacy-section section-shell" id="privacy">
          <div className="privacy-panel">
            <div className="privacy-copy">
              <p className="section-kicker">Control is a product feature</p>
              <h2>Otis works with permission, not assumption.</h2>
              <p>
                Choose what Otis can see. Review consequential actions before
                they run. Disconnect a source whenever you want. Private work
                should feel private—not mysterious.
              </p>
              <div className="privacy-principles">
                <span><i>✓</i> Your data stays scoped to your workspace</span>
                <span><i>✓</i> Sensitive actions require clear approval</span>
                <span><i>✓</i> Local files stay behind explicit access</span>
              </div>
            </div>
            <div className="permission-window" aria-label="Otis permission preview">
              <div className="permission-window__top">
                <Image
                  src="/brand/otis-mark.svg"
                  width={40}
                  height={40}
                  alt=""
                />
                <span>
                  <small>OTIS WANTS TO</small>
                  <strong>Organize 4 launch files</strong>
                </span>
              </div>
              <div className="permission-change">
                <span>Move</span>
                <strong>Desktop / Launch draft</strong>
                <i>→</i>
                <strong>Projects / Otis / Launch</strong>
              </div>
              <div className="permission-meta">
                <span>No files will be deleted</span>
                <span>4 changes</span>
              </div>
              <div className="permission-actions">
                <button type="button" tabIndex={-1}>Not now</button>
                <button type="button" tabIndex={-1}>Approve changes</button>
              </div>
            </div>
          </div>
        </section>

        <section className="waitlist-section section-shell" id="waitlist">
          <div className="waitlist-panel">
            <div>
              <p className="section-kicker">Early access</p>
              <h2>Give your work some memory.</h2>
              <p>
                Join the private beta waitlist. We’ll send only meaningful Otis
                launch updates.
              </p>
            </div>
            <WaitlistForm source="footer" compact />
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <a className="wordmark wordmark--footer" href="#top">
          <Image
            src="/brand/otis-mark.svg"
            width={36}
            height={36}
            alt=""
          />
          <span>Otis</span>
        </a>
        <p>Building quietly. Launching thoughtfully.</p>
        <div>
          <a href="#privacy">Privacy</a>
          <a href="#waitlist">Contact</a>
          <span>© 2026 Otis</span>
        </div>
      </footer>
    </>
  );
}
