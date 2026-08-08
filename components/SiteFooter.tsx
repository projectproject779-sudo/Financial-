import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">N</span>
            <span>Numora</span>
          </Link>
          <p className="footer-copy">Clear calculators for confident money decisions — anywhere in the world.</p>
          <p className="footer-note">Educational estimates only. Not financial, tax, or investment advice.</p>
        </div>
        <div>
          <p className="footer-title">Calculators</p>
          <Link href="/calculators">All 24 calculators</Link>
          <Link href="/calculators/loan-payment">Loan payment</Link>
          <Link href="/calculators/mortgage-payment">Mortgage payment</Link>
          <Link href="/calculators/compound-interest">Compound interest</Link>
          <Link href="/calculators/retirement-savings">Retirement savings</Link>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <Link href="/guides">Money guides</Link>
          <Link href="/countries">Country hubs</Link>
          <Link href="/countries/united-states">United States</Link>
          <Link href="/countries/united-kingdom">United Kingdom</Link>
          <Link href="/countries/india">India</Link>
        </div>
        <div>
          <p className="footer-title">Trust & company</p>
          <Link href="/about">About Numora</Link>
          <Link href="/authors/numora-editorial-team">Editorial team</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/sources">Sources</Link>
          <Link href="/partners">Partner disclosure</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Numora</span>
        <span>Built for a global audience</span>
      </div>
    </footer>
  );
}
