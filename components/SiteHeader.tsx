import Link from "@/components/SafeLink";

export function SiteHeader() {
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Numora home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>Numora</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/calculators">Calculators</Link>
          <Link href="/countries">Countries</Link>
          <Link href="/guides">Money guides</Link>
          <Link href="/editorial-policy">Trust center</Link>
        </nav>
        <Link className="header-cta" href="/calculators">Find a calculator</Link>
      </div>
    </header>
    </>
  );
}
