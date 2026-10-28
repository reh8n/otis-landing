import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { links } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy | Otis IDE",
  description: "How the Otis IDE app and this website handle your data.",
  openGraph: { title: "Privacy | Otis IDE", description: "How the Otis IDE app and this website handle your data." },
  twitter: { card: "summary", title: "Privacy | Otis IDE", description: "How the Otis IDE app and this website handle your data." },
};

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main className="wrap policy" id="main">
        <p className="kicker">Privacy</p>
        <h1>Privacy, in plain language.</h1>
        <p className="policy-intro">The short version: the app keeps everything on your Mac, and this website only sees what any web host sees.</p>

        <article>
          <h2>The Otis IDE app</h2>
          <p>Otis IDE runs locally. Rooms, sessions, transcripts, settings and checkpoints are stored on your Mac and never sync between machines. There is no Otis account, no telemetry and no analytics in the app.</p>
          <p>Your agents run through the Claude Code and Codex CLIs you installed and logged in to. What those tools send to Anthropic or OpenAI is governed by your agreement with them, not by Otis.</p>
          <p>Otis never keeps the command line of an agent process it observes, since it can carry a private prompt.</p>
        </article>
        <article>
          <h2>This website</h2>
          <p>The site is hosted on Vercel. Like any host, Vercel may process ordinary request data such as IP address, browser details and security logs to serve and protect the site. The site sets no tracking cookies and runs no analytics scripts.</p>
          <p>Downloads, issues and discussions live on GitHub, so those pages follow GitHub&apos;s privacy terms.</p>
        </article>
        <article>
          <h2>Earlier waitlist signups</h2>
          <p>Before Otis IDE was downloadable, this site collected email addresses for an early access waitlist. Those records are kept only to send launch updates, are never sold, and can be deleted on request.</p>
        </article>
        <article>
          <h2>Questions or requests</h2>
          <p>Open a thread in <a href={links.discussions}>Discussions</a> for general questions. For anything private, such as a deletion request, ask there for a private contact and do not post personal details publicly.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
