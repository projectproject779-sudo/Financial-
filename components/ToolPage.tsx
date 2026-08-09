import Link from "@/components/SafeLink";
import { Calculator, type ToolId } from "./Calculator";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const copy: Record<ToolId, { title: string; description: string; bullets: string[] }> = {
  loan: {
    title: "Loan calculator",
    description: "Estimate monthly repayments, total interest, and the full cost of a personal, auto, or business loan.",
    bullets: ["Compare different loan terms", "See the real interest cost", "Works with eight major currencies"],
  },
  mortgage: {
    title: "Mortgage calculator",
    description: "Plan a home purchase with a clear estimate of monthly payments and lifetime borrowing costs.",
    bullets: ["Test rates and repayment terms", "Understand principal vs interest", "Plan before speaking to a lender"],
  },
  interest: {
    title: "Compound interest calculator",
    description: "See how an initial balance and regular contributions can grow over time through compounding.",
    bullets: ["Model monthly contributions", "Visualize long-term growth", "Explore multiple currencies"],
  },
  savings: {
    title: "Savings goal calculator",
    description: "Turn a future money goal into a practical monthly savings target you can act on today.",
    bullets: ["Set any target amount", "Include expected returns", "Build a realistic timeline"],
  },
  investment: {
    title: "Investment return calculator",
    description: "Project a portfolio value from your starting amount, contributions, time horizon, and expected return.",
    bullets: ["Compare contribution plans", "Estimate potential growth", "Stress-test your time horizon"],
  },
};

export function ToolPage({ tool }: { tool: ToolId }) {
  const item = copy[tool];
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="tool-hero">
          <div className="shell tool-hero-inner">
            <div>
              <p className="eyebrow">Free · private · instant</p>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
            <ul className="check-list">
              {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        </section>
        <section className="shell tool-calculator-wrap">
          <Calculator defaultTool={tool} />
        </section>
        <section className="shell article-section">
          <div className="article-main">
            <p className="eyebrow">Plan with confidence</p>
            <h2>How to use this calculator</h2>
            <p>Enter the numbers from your real offer or plan, then adjust one variable at a time. Testing a lower rate, a shorter term, or a larger monthly contribution makes the trade-offs immediately visible.</p>
            <h3>What the result tells you</h3>
            <p>Numora separates your own money from interest or estimated growth. This helps you compare scenarios without spreadsheets, sign-ups, or hidden assumptions.</p>
            <h3>A useful next step</h3>
            <p>Save two or three realistic scenarios and compare them with the official illustration from your bank, broker, or savings provider. Always include fees and local taxes before making a final decision.</p>
          </div>
          <aside className="article-aside">
            <p className="sponsor-label">Comparison checklist</p>
            <h3>Before you choose a provider</h3>
            <ul>
              <li>Compare the effective annual rate</li>
              <li>Check fees and early-exit rules</li>
              <li>Read the full product disclosure</li>
              <li>Verify local tax treatment</li>
            </ul>
          </aside>
        </section>
        <section className="more-tools">
          <div className="shell section-heading-row">
            <div><p className="eyebrow">Keep planning</p><h2>Explore more calculators</h2></div>
            <Link href="/#calculators">View all tools →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
