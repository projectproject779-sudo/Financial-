import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { UniversalCalculator } from "../../../components/UniversalCalculator";
import { calculators, getCalculator } from "../../../lib/calculators";

export const dynamicParams = false;
export function generateStaticParams() { return calculators.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const config = getCalculator((await params).slug);
  if (!config) return {};
  return { title: `${config.title} — Free & Instant`, description: config.description, keywords: config.keywords, alternates: { canonical: `/calculators/${config.slug}` } };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const config = getCalculator((await params).slug);
  if (!config) notFound();
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: config.title, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: config.description }, { "@type": "FAQPage", mainEntity: config.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }] };
  return <><SiteHeader /><main id="main-content">
    <section className="tool-hero"><div className="shell tool-hero-inner"><div><p className="eyebrow">{config.category} calculator</p><h1>{config.title}</h1><p>{config.intro}</p></div><ul className="check-list"><li>Free and instant</li><li>Works in 13 currencies</li><li>Formula and assumptions disclosed</li></ul></div></section>
    <div className="shell tool-calculator-wrap"><UniversalCalculator config={config} /></div>
    <section className="shell calculator-explainer"><article className="article-main"><p className="eyebrow">Understand the result</p><h2>How to use this estimate</h2><p>{config.outcome}</p><h3>How the calculation works</h3><p>{config.formula}</p><h3>Three useful steps</h3><ol>{config.steps.map((step) => <li key={step}>{step}</li>)}</ol><h3>Assumptions and limits</h3><ul>{config.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></article><aside className="article-aside"><p className="sponsor-label">Primary references</p><h3>Official sources</h3><ul className="source-list">{config.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.label} ↗</a></li>)}</ul><p className="source-note">Reviewed by the Numora Editorial Team. <Link href="/methodology">See our methodology.</Link></p></aside></section>
    <section className="faq-section soft-section"><div className="shell faq-grid"><div><p className="eyebrow">Calculator FAQ</p><h2>Know what the number means.</h2></div><div className="faq-list">{config.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="related-section"><div className="shell"><div className="section-heading-row"><div><p className="eyebrow">Continue planning</p><h2>Related calculators</h2></div><Link className="text-link" href="/calculators">View all 24 tools</Link></div><div className="related-grid">{config.related.map((slug) => { const related = getCalculator(slug); return related ? <Link key={slug} href={`/calculators/${slug}`}><span>{related.category}</span><b>{related.shortTitle}</b><i>→</i></Link> : null; })}</div></div></section>
  </main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
