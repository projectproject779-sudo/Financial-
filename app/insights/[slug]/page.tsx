import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getGuide, guides } from "../../../lib/guides";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const guide = getGuide((await params).slug); return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/insights/${guide.slug}` } } : {}; }

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug); if (!guide) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: "2026-08-09", author: { "@type": "Organization", name: "Numora Editorial Team", url: "/authors/numora-editorial-team" }, publisher: { "@type": "Organization", name: "Numora" } };
  return <><SiteHeader /><main id="main-content"><article className="guide-article"><header><div className="shell narrow"><p className="eyebrow">{guide.category} · {guide.readTime} read</p><h1>{guide.title}</h1><p className="lede">{guide.description}</p><div className="byline"><span className="author-avatar">NE</span><div><b><Link href="/authors/numora-editorial-team">Numora Editorial Team</Link></b><span>Reviewed {guide.reviewed} · <Link href="/editorial-policy">Editorial policy</Link></span></div></div></div></header><div className="shell guide-body"><aside><p className="sponsor-label">Key takeaways</p><ul>{guide.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside><div>{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul className="guide-checklist">{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}<section className="guide-sources"><h2>Sources and further reading</h2><p>We prioritise primary regulators and government-backed consumer resources. Links open the original publisher.</p><ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></section><div className="guide-disclosure">Educational information only—not personal financial, investment, tax, or legal advice. Product rules vary by country and provider.</div></div></div></article></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
