import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { notFound } from "next/navigation";
import { AdSlot } from "../../../components/AdSlot";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getCalculator } from "../../../lib/calculators";
import { getGuide, guides } from "../../../lib/guides";
import { absoluteUrl } from "../../../lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/insights/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `/insights/${guide.slug}`,
      images: [{ url: "/og-card.png", width: 1200, height: 630, alt: guide.title }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: ["/og-card.png"] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug); if (!guide) notFound();
  const calculator = guide.calculatorSlug ? getCalculator(guide.calculatorSlug) : undefined;
  const pageUrl = absoluteUrl(`/insights/${guide.slug}`);
  const schema = { "@context": "https://schema.org", "@type": "Article", "@id": `${pageUrl}#article`, mainEntityOfPage: pageUrl, url: pageUrl, headline: guide.title, description: guide.description, image: absoluteUrl("/og-card.png"), datePublished: "2026-08-09", dateModified: "2026-08-09", inLanguage: "en", ...(calculator ? { about: { "@type": "WebApplication", name: calculator.title, url: absoluteUrl(`/calculators/${calculator.slug}`), applicationCategory: "FinanceApplication" } } : {}), author: { "@type": "Person", name: "Shuxrat Asliddinov", jobTitle: "Founder and Publisher", url: absoluteUrl("/authors/numora-editorial-team") }, publisher: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: "Numora", url: absoluteUrl("/") } };
  return <><SiteHeader /><main id="main-content"><article className="guide-article"><header><div className="shell narrow"><p className="eyebrow">{guide.category} · {guide.readTime} read</p><h1>{guide.title}</h1><p className="lede">{guide.description}</p><div className="byline"><span className="author-avatar">SA</span><div><b><Link href="/authors/numora-editorial-team">Shuxrat Asliddinov</Link></b><span>Founder & publisher · Reviewed {guide.reviewed} · <Link href="/editorial-policy">Editorial policy</Link></span></div></div></div></header><div className="shell guide-body"><aside><p className="sponsor-label">Key takeaways</p><ul>{guide.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside><div>{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.checklist ? <ul className="guide-checklist">{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}{calculator ? <section className="guide-calculator-cta"><p className="eyebrow">Run the numbers</p><h2>Test this guide with a free calculator</h2><p>Change the inputs to compare scenarios privately in your browser. The result is educational and does not require an account.</p><Link className="button primary" href={`/calculators/${calculator.slug}`}>Open {calculator.shortTitle} calculator →</Link></section> : null}<AdSlot client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT} slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT} /><section className="guide-sources"><h2>Sources and further reading</h2><p>We prioritise primary regulators and government-backed consumer resources. Links open the original publisher.</p><ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></section><div className="guide-disclosure">Educational information only—not personal financial, investment, tax, or legal advice. Product rules vary by country and provider.</div></div></div></article></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
