import Image from "next/image";
import Link from "next/link";
import { links } from "../lib/site";

export function AppleIcon() {
  return (
    <svg className="apple" viewBox="0 0 17 20" width="14" height="17" aria-hidden="true">
      <path fill="currentColor" d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.4c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.6ZM11.5 3c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5Z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Otis IDE home">
          <Image src="/brand/otis-mark.svg" width={28} height={28} alt="" priority />
          <span>Otis IDE</span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/#why">Why</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#install">Install</Link>
          <Link href="/#privacy">Privacy</Link>
          <a href={links.discussions}>Community</a>
        </nav>
        <a className="btn btn--primary btn--sm" href={links.download}>
          <AppleIcon /> Download
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="wordmark" href="/">
            <Image src="/brand/otis-mark.svg" width={24} height={24} alt="" />
            <span>Otis IDE</span>
          </Link>
          <p>A free macOS app for running a fleet of coding agents.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h3>Product</h3>
            <a href={links.download}>Download</a>
            <a href={links.releases}>Release notes</a>
            <Link href="/#features">Features</Link>
          </div>
          <div>
            <h3>Community</h3>
            <a href={links.discussions}>Discussions</a>
            <a href={links.issues}>Report an issue</a>
            <a href={links.repo}>GitHub</a>
          </div>
          <div>
            <h3>Trust</h3>
            <Link href="/#privacy">How it stays local</Link>
            <Link href="/privacy">Website privacy</Link>
          </div>
        </div>
      </div>
      <p className="footer-legal">© 2026 Otis. Claude Code and Codex are trademarks of their respective owners.</p>
    </footer>
  );
}
