import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Numora home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>Numora</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="/#calculators">Calculators</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/#guides">Money guides</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="/#calculators">Start calculating</a>
      </div>
    </header>
  );
}
