import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "../components/Calculator";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Numora — Free Financial Calculators for Smarter Money Decisions",
  description: "Calculate loans, mortgages, compound interest, savings goals, and investment returns in seconds. Free, private, and built for a global audience.",
};

const toolCards = [
  { href: "/loan-calculator", short: "LN", title: "Loan calculator", copy: "Estimate monthly payments, interest, and total cost.", tone: "blue" },
  { href: "/mortgage-calculator", short: "MT", title: "Mortgage calculator", copy: "Plan a home purchase and compare repayment terms.", tone: "green" },
  { href: "/compound-interest-calculator", short: "CI", title: "Compound interest", copy: "See what steady contributions can become over time.", tone: "orange" },
  { href: "/savings-goal-calculator", short: "SG", title: "Savings goal", copy: "Turn a future target into a monthly action plan.", tone: "purple" },
  { href: "/investment-return-calculator", short: "IR", title: "Investment return", copy: "Project a portfolio across different time and return scenarios.", tone: "lime" },
];

const faqs = [
  ["Are Numora calculators free?", "Yes. Every calculator is free to use, with no account, trial, or email required."],
  ["Does Numora save my financial information?", "No. Calculations happen in your browser and the numbers you enter are not submitted to us."],
  ["Can I use a currency other than US dollars?", "Yes. Switch between USD, EUR, GBP, CAD, AUD, INR, JPY, and AED inside the calculator."],
  ["Are the estimates financial advice?", "No. Results are educational estimates. Confirm rates, fees, taxes, and terms with a qualified professional or provider in your country."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Numora",
      description: "Free global financial calculators and plain-English money guides.",
    },
    {
      "@type": "WebApplication",
      name: "Numora Financial Calculators",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free calculators for loans, mortgages, compound interest, savings goals, and investment returns.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero">
          <div className="hero-orb orb-one" aria-hidden="true" />
          <div className="hero-orb orb-two" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="hero-pill"><span /> Clear numbers. Better decisions.</p>
              <h1>Make your money<br />make <em>sense.</em></h1>
              <p className="hero-lede">Free, private financial calculators that turn complicated decisions into clear next steps — wherever you live.</p>
              <div className="hero-actions">
                <a className="button primary" href="#calculators">Calculate for free <span>→</span></a>
                <a className="text-link" href="#how-it-works">See how it works</a>
              </div>
              <div className="trust-row">
                <span><b>5</b> calculators</span>
                <i />
                <span><b>8</b> currencies</span>
                <i />
                <span><b>0</b> sign-ups</span>
              </div>
            </div>
            <div className="hero-preview" aria-label="Numora calculator preview">
              <div className="preview-top">
                <span><i className="preview-icon">CI</i> Compound interest</span>
                <span className="preview-menu">•••</span>
              </div>
              <div className="preview-body">
                <p className="preview-label">Projected balance</p>
                <p className="preview-value">$92,408</p>
                <span className="growth-pill">↗ $32,408 estimated growth</span>
                <div className="preview-chart">
                  <span style={{ height: "24%" }} /><span style={{ height: "31%" }} /><span style={{ height: "39%" }} /><span style={{ height: "49%" }} /><span style={{ height: "62%" }} /><span style={{ height: "77%" }} /><span style={{ height: "96%" }} />
                </div>
                <div className="preview-years"><span>Today</span><span>Year 10</span></div>
              </div>
              <div className="floating-note note-one"><span>✓</span><div><b>Instant results</b><small>Updates as you type</small></div></div>
              <div className="floating-note note-two"><span>⌁</span><div><b>Your data stays private</b><small>No account needed</small></div></div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="shell trust-strip-inner">
            <p>Built for real-life money questions</p>
            <div><span>Personal loans</span><span>Home buying</span><span>Long-term investing</span><span>Emergency funds</span><span>Big life goals</span></div>
          </div>
        </section>

        <section className="calculator-section" id="calculators">
          <div className="shell">
            <div className="center-heading">
              <p className="eyebrow">The numbers, made simple</p>
              <h2>Choose a calculator and start planning</h2>
              <p>Change any input and see your results update instantly.</p>
            </div>
            <Calculator />
          </div>
        </section>

        <section className="tools-section">
          <div className="shell">
            <div className="section-heading-row">
              <div><p className="eyebrow">Explore every tool</p><h2>A calculator for each decision</h2></div>
              <p>Purpose-built tools with clear explanations and no unnecessary complexity.</p>
            </div>
            <div className="tool-card-grid">
              {toolCards.map((card) => (
                <Link className="tool-card" href={card.href} key={card.href}>
                  <span className={`tool-card-icon ${card.tone}`}>{card.short}</span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <span className="card-link">Open calculator <b>→</b></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="shell how-grid">
            <div className="how-copy">
              <p className="eyebrow">Designed for clarity</p>
              <h2>Good decisions start with understandable numbers.</h2>
              <p>Money tools should make you feel informed, not overwhelmed. Numora gives every input, result, and assumption room to breathe.</p>
              <div className="steps">
                <div><span>01</span><div><h3>Enter what you know</h3><p>Start with the real numbers from your plan or provider.</p></div></div>
                <div><span>02</span><div><h3>Explore the trade-offs</h3><p>Adjust rates, time, and contributions to compare scenarios.</p></div></div>
                <div><span>03</span><div><h3>Take the next step</h3><p>Use a clear estimate to ask better questions and act confidently.</p></div></div>
              </div>
            </div>
            <div className="insight-panel">
              <span className="insight-label">THE NUMORA PRINCIPLE</span>
              <blockquote>“A small change in time or rate can make a very big change in outcome.”</blockquote>
              <div className="insight-comparison">
                <div><span>Plan A</span><b>5 years</b><em>$34.7k</em></div>
                <div className="better"><span>Plan B</span><b>10 years</b><em>$92.4k</em></div>
              </div>
              <p>Example: $10,000 initial balance + $500/month at a hypothetical 7% annual return.</p>
            </div>
          </div>
        </section>

        <section className="guides-section" id="guides">
          <div className="shell">
            <div className="section-heading-row">
              <div><p className="eyebrow">Money, explained</p><h2>Practical guides for smarter planning</h2></div>
              <span className="coming-label">More guides added regularly</span>
            </div>
            <div className="guide-grid">
              <article className="guide-card featured">
                <span className="guide-category">Borrowing basics</span>
                <h3>APR vs interest rate: the difference that changes your real cost</h3>
                <p>Learn why the lowest advertised rate is not always the cheapest offer.</p>
                <Link href="/guides/apr-vs-interest-rate">Read the 5-minute guide →</Link>
              </article>
              <article className="guide-card">
                <span className="guide-number">01</span>
                <span className="guide-category">Investing basics</span>
                <h3>How compound interest actually builds wealth</h3>
                <p>A simple explanation of time, returns, and consistency.</p>
                <Link href="/guides/compound-interest">Read guide →</Link>
              </article>
              <article className="guide-card">
                <span className="guide-number">02</span>
                <span className="guide-category">Saving strategies</span>
                <h3>How to turn a big goal into a monthly plan</h3>
                <p>A practical method for making ambitious goals feel achievable.</p>
                <Link href="/guides/savings-goals">Read guide →</Link>
              </article>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="shell faq-grid">
            <div><p className="eyebrow">Frequently asked</p><h2>Questions,<br />answered clearly.</h2><p>Need more context? Every calculator includes a plain-English explanation of its result.</p></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="about">
          <div className="shell final-cta-inner">
            <div><p className="eyebrow">Your next decision starts here</p><h2>Turn uncertainty into a number you can use.</h2></div>
            <a className="button light" href="#calculators">Try a free calculator <span>→</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
