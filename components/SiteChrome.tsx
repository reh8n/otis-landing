import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Otis home">
        <Image src="/brand/otis-mark.svg" width={40} height={40} alt="" priority />
        <span>Otis</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#ecosystem">Ecosystem</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#principles">Principles</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
      <Link className="header-cta" href="/#waitlist">Join early access <span aria-hidden="true">↗</span></Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/"><Image src="/brand/otis-mark.svg" width={34} height={34} alt="" /><span>Otis</span></Link>
      <p>Personal · Business · IDE · Ecosystem</p>
      <div><Link href="/#principles">Principles</Link><Link href="/privacy">Privacy</Link><Link href="/#waitlist">Early access</Link><span>© 2026 Otis</span></div>
    </footer>
  );
}
