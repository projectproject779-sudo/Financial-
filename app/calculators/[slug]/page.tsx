import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { notFound } from "next/navigation";
import { AdSlot } from "../../../components/AdSlot";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { UniversalCalculator } from "../../../components/UniversalCalculator";
import { calculators, getCalculator } from "../../../lib/calculators";
import { guides } from "../../../lib/guides";
import { absoluteUrl } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const config = getCalculator((await params).slug);
  if (!config) return {};
  return { title: `${config.title} — Free & Instant`, description: config.description, keywords: config.keywords, alternates: { canonical: `/calculators/${config.slug}` } };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const config = getCalculator((await params).slug);
  if (!config) notFound();

  const relatedGuides = guides.filter((guide) => guide.calculatorSlug === config.slug).slice(0, 3);
  const pageUrl = absoluteUrl(`/calculators/${config.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", "@id": `${pageUrl}#application`, name: config.title, url: pageUrl, applicationCategory: "FinanceApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: config.description, provider: { "@id": absoluteUrl("/#organization") } },
      { "@type": "FAQPage", "@id": `${pageUrl}#faq`, url: pageUrl, mainEntity: config.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumbs`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Calculators", item: absoluteUrl("/calculators") },
        { "@type": "ListItem", position: 3, name: config.title, item: pageUrl },
      ] },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="tool-hero">
          <div className="shell tool-hero-inner">
            <div>
              <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/calculators">Calculators</Link><span aria-hidden="true">/</span><span>{config.shortTitle}</span></nav>
              <p className="eyebrow">{config.category} calculator</p>
              <h1>{config.title}</h1>
              <p>{config.intro}</p>
            </div>
            <ul className="check-list"><li>Free and instant</li><li>Works in 13 currencies</li><li>Formula and assumptions disclosed</li></ul>
          </div>
        </section>
        <div className="shell tool-calculator-wrap"><UniversalCalculator config={config} /></div>
        <div className="shell"><AdSlot client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT} slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT} /></div>
        <section className="shell calculator-explainer">
          <article className="article-main">
            <p className="eyebrow">Understand the result</p>
            <h2>How to use this estimate</h2>
            <p>{config.outcome}</p>
            <h3>How the calculation works</h3><p>{config.formula}</p>
            <h3>Three useful steps</h3><ol>{config.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <h3>Assumptions and limits</h3><ul>{config.assumptions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <aside className="article-aside">
            <p className="sponsor-label">Primary references</p><h3>Official sources</h3>
            <ul className="source-list">{config.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.label} ↗</a></li>)}</ul>
            <p className="source-note">Reviewed by the Numora Editorial Team. <Link href="/methodology">See our methodology.</Link></p>
          </aside>
        </section>
        <section className="faq-section soft-section">
          <div className="shell faq-grid"><div><p className="eyebrow">Calculator FAQ</p><h2>Know what the number means.</h2></div><div className="faq-list">{config.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
        </section>
        {relatedGuides.length > 0 ? (
          <section className="related-section"><div className="shell"><div className="section-heading-row"><div><p className="eyebrow">Learn before deciding</p><h2>Guides for this calculator</h2></div><Link className="text-link" href="/guides">Explore all guides</Link></div><div className="related-grid">{relatedGuides.map((guide) => <Link key={guide.slug} href={`/insights/${guide.slug}`}><span>{guide.category} · {guide.readTime} read</span><b>{guide.title}</b><i>→</i></Link>)}</div></div></section>
        ) : null}
        <section className="related-section soft-section"><div className="shell"><div className="section-heading-row"><div><p className="eyebrow">Continue planning</p><h2>Related calculators</h2></div><Link className="text-link" href="/calculators">View all 24 tools</Link></div><div className="related-grid">{config.related.map((slug) => { const related = getCalculator(slug); return related ? <Link key={slug} href={`/calculators/${slug}`}><span>{related.category}</span><b>{related.shortTitle}</b><i>→</i></Link> : null; })}</div></div></section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
