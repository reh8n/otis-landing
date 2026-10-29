import FeatureOrbit from "../components/FeatureOrbit";
import { ReviewMock, SeatsMock, SessionsMock } from "../components/Mocks";
import ProductStage from "../components/ProductStage";
import { AppleIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { links } from "../lib/site";

const problems = [
  {
    title: "They collide on files",
    copy: "Two agents in one checkout edit the same file, and one of them quietly rewrites the other's work.",
    code: "error: Your local changes would be overwritten",
  },
  {
    title: "They fight over ports",
    copy: "Both dev servers grab :3004 in the same second. One dies, and you lose ten minutes finding out why.",
    code: "Error: listen EADDRINUSE :::3004",
  },
  {
    title: "Their questions get buried",
    copy: "An agent has been waiting on a yes for twenty minutes, in a terminal tab you closed an hour ago.",
    code: "? Allow command: npm install (y/n)",
  },
];

const features = [
  {
    id: "sessions",
    kicker: "Isolated sessions",
    title: "Every agent gets its own worktree, branch and port.",
    copy: "Start an agent on a task and Otis gives it a fresh git worktree, its own otis/ branch and a free port from 3000 to 3999. Ten agents run side by side without touching each other's files or your checkout. Stop, resume or recover after a crash; cleanup only happens when you ask.",
    points: ["Never works in your actual checkout", "Ports picked and reserved for you", "Resume after a crash"],
    visual: <SessionsMock />,
  },
  {
    id: "rooms",
    kicker: "Rooms and seats",
    title: "Put agents in a room, and decide what each seat can do.",
    copy: "Agents are reusable identities with a name, persona and model. Seat them in a room to work one problem together. Permissions live on the seat, so the same agent can read and run in one room and only read in another.",
    points: ["Claude Code and Codex in one conversation", "@mention who should answer", "Read, write and run set per seat"],
    visual: <SeatsMock />,
  },
  {
    id: "inbox",
    kicker: "Questions tray and Needs You",
    title: "Nothing waits on you without you knowing.",
    copy: "Questions from every agent collect in one tray, grouped by who is asking, and go out together when you answer. A strip above the message box shows who is thinking, running something or waiting on you, and Needs You gathers approvals, reviews and failed checks from every project.",
    points: ["Answer several questions in one go", "Live status for every member", "One queue across projects"],
    visual: <Shot name="room" darkOnly alt="A room where Wren's question waits in the questions tray" />,
  },
  {
    id: "review",
    kicker: "Patch review",
    title: "Review changes hunk by hunk, not all or nothing.",
    copy: "Proposed changes come back split into hunks. Accept some, reject others. If the file moved on since the proposal, Otis refuses to apply rather than guess, and every apply takes a checkpoint first so a bad change is one step from undone.",
    points: ["Accept or reject per hunk", "Stale patches are refused", "Checkpoint before every apply"],
    visual: <ReviewMock />,
  },
  {
    id: "office",
    kicker: "Coding Mode",
    title: "Watch the whole team work, without reading a transcript.",
    copy: "Press ⌘⇧E and the window becomes one project: code on the left, the room on the right, and above it a 3D office where every agent has a desk. Labels show who is writing, who is idle and who needs you. Agents keep working when you switch rooms or go Home.",
    points: ["Live status over every desk", "Click an agent to message it", "Replies keep running when you leave"],
    visual: <Shot name="office" alt="The Coding Mode office with four agents at their desks" />,
  },
];

const workflows = [
  "Plan a feature",
  "Technical design",
  "Build a feature",
  "Fix a bug",
  "Investigate failing tests",
  "Review a code change",
  "Refactor safely",
  "Release-readiness report",
];

function Shot({ name, alt, darkOnly = false }: { name: string; alt: string; darkOnly?: boolean }) {
  const light = darkOnly ? `${name}-dark` : `${name}-light`;
  return (
    <picture className="feature-shot">
      <source media="(prefers-color-scheme: dark)" srcSet={`/product/${name}-dark-960.jpg 960w, /product/${name}-dark.jpg 1800w`} sizes="(max-width: 900px) 100vw, 620px" />
      <img src={`/product/${light}.jpg`} srcSet={`/product/${light}-960.jpg 960w, /product/${light}.jpg 1800w`} sizes="(max-width: 900px) 100vw, 620px" width={1800} height={1125} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadButtons({ secondary = "discussions" }: { secondary?: "discussions" | "releases" }) {
  return (
    <div className="cta-row">
      <a className="btn btn--primary btn--lg" href={links.download}>
        <AppleIcon /> Download for Mac
      </a>
      {secondary === "discussions" ? (
        <a className="btn btn--ghost btn--lg" href={links.discussions}>Join the discussion <span aria-hidden="true">↗</span></a>
      ) : (
        <a className="btn btn--ghost btn--lg" href={links.releases}>Release notes <span aria-hidden="true">↗</span></a>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="wrap hero-copy">
            <a className="eyebrow" href={links.releases}>
              <span className="eyebrow-dot" /> Free for macOS · Apple Silicon <span className="eyebrow-arrow" aria-hidden="true">→</span>
            </a>
            <h1 id="hero-title">
              Run a fleet of
              <br />
              <span className="grad">coding agents.</span>
            </h1>
            <p className="lede">
              Run Claude Code and Codex agents in parallel on your Mac, each in its own worktree, branch and port.
              Free, and it uses the subscription you already have.
            </p>
            <DownloadButtons secondary="releases" />
            <p className="fineprint">
              Needs a logged-in Claude Code or Codex CLI. Not notarized yet, so the first launch needs one extra click to allow it.
            </p>
          </div>
          <div className="wrap wrap--wide">
            <ProductStage />
          </div>
        </section>

        <section className="works-with wrap" aria-label="Works with">
          <span>Drives the CLIs you already pay for</span>
          <ul>
            <li><b>Claude Code</b></li>
            <li><b>Codex</b></li>
            <li>No API keys</li>
            <li>No per-token markup</li>
          </ul>
        </section>

        <section className="section wrap" id="why" aria-labelledby="why-title">
          <p className="kicker">Why Otis</p>
          <h2 id="why-title">One agent is a helper. Three in one checkout is a traffic jam.</h2>
          <p className="section-lede">
            Running agents in parallel is the fastest way to ship, until they start stepping on each other. These are the
            three things that break first.
          </p>
          <div className="problems">
            {problems.map((p, i) => (
              <article className="problem" key={p.title}>
                <span className="problem-num">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
                <code>{p.code}</code>
              </article>
            ))}
          </div>
          <p className="answer">
            Otis gives every agent its own lane, and gives you <em>one place</em> to see all of them.
          </p>
        </section>

        <FeatureOrbit />

        <section className="features" aria-label="Feature details">
          {features.map((f, i) => (
            <article className={`feature wrap${i % 2 ? " feature--flip" : ""}`} id={f.id} key={f.id}>
              <div className="feature-copy">
                <p className="kicker">{f.kicker}</p>
                <h2>{f.title}</h2>
                <p>{f.copy}</p>
                <ul className="points">
                  {f.points.map((pt) => (
                    <li key={pt}><Check /> {pt}</li>
                  ))}
                </ul>
              </div>
              <div className="feature-visual">{f.visual}</div>
            </article>
          ))}

          <article className="feature-wide wrap" id="workflows">
            <div className="feature-wide-head">
              <p className="kicker">Workflows</p>
              <h2>Start from a template, not a blank room.</h2>
              <p>
                Eight built-in workflows set up the seats and the task in one step, each in a room and office of its
                own, optionally on a Git branch you can throw away.
              </p>
            </div>
            <ol className="workflow-grid">
              {workflows.map((w, i) => (
                <li key={w}><span>{String(i + 1).padStart(2, "0")}</span>{w}</li>
              ))}
            </ol>
          </article>
        </section>

        <section className="section wrap split" id="install" aria-labelledby="install-title">
          <div>
            <p className="kicker">Get started</p>
            <h2 id="install-title">Up and running in two minutes.</h2>
            <ol className="steps">
              <li>
                <strong>Download the .dmg</strong>
                <span>Grab the latest build from GitHub Releases and drag Otis IDE into Applications.</span>
              </li>
              <li>
                <strong>Allow it once</strong>
                <span>Builds are not notarized yet. On first launch use right-click, Open, or on macOS 15 and later System Settings, Privacy &amp; Security, Open Anyway. Updates after that install in the app.</span>
              </li>
              <li>
                <strong>Pick a project and start an agent</strong>
                <span>Otis finds your logged-in CLIs and hands each new agent its own worktree.</span>
              </li>
            </ol>
          </div>
          <aside className="req-card" aria-labelledby="req-title">
            <h3 id="req-title">Requirements</h3>
            <ul>
              <li><Check /> macOS on Apple Silicon</li>
              <li><Check /> Claude Code CLI or Codex CLI, installed and logged in</li>
              <li><Check /> A git repository to work in</li>
            </ul>
            <p>Otis drives your own subscription. It does not sell a model or add a per-token cost.</p>
            <a className="btn btn--primary" href={links.download}><AppleIcon /> Download for Mac</a>
          </aside>
        </section>

        <section className="section wrap" id="privacy" aria-labelledby="privacy-title">
          <p className="kicker">Privacy</p>
          <h2 id="privacy-title">Your code stays on your Mac.</h2>
          <div className="privacy-grid">
            <article>
              <h3>All local</h3>
              <p>Rooms, sessions, transcripts and settings live on your Mac. Nothing syncs between machines, and there is no Otis cloud.</p>
            </article>
            <article>
              <h3>No telemetry</h3>
              <p>No analytics, no tracking pixels, no usage pings. Your agents talk to the CLIs you installed, and that&apos;s it.</p>
            </article>
            <article>
              <h3>No account</h3>
              <p>Download, open, work. No sign-up, no email, no license key. Your Claude or OpenAI login stays with the CLI.</p>
            </article>
            <article>
              <h3>Careful by default</h3>
              <p>Agents never work in your actual checkout, and Otis never keeps an observed process&apos;s command line, since it can carry a private prompt.</p>
            </article>
          </div>
        </section>

        <section className="final wrap" aria-labelledby="final-title">
          <div className="final-card">
            <div className="hero-glow hero-glow--final" aria-hidden="true" />
            <h2 id="final-title">Give every agent its own lane.</h2>
            <p>Free for macOS. Uses the Claude Code or Codex subscription you already have.</p>
            <DownloadButtons />
            <p className="final-links">
              Found a bug? <a href={links.issues}>Open an issue</a>. Have an idea? <a href={links.discussions}>Start a discussion</a>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
