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
          <Link href="/loan-calculator">Loan calculator</Link>
          <Link href="/mortgage-calculator">Mortgage calculator</Link>
          <Link href="/compound-interest-calculator">Compound interest</Link>
          <Link href="/savings-goal-calculator">Savings goal</Link>
          <Link href="/investment-return-calculator">Investment return</Link>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <Link href="/about">About Numora</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/#guides">Money guides</Link>
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
