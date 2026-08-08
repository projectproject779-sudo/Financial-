import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getCalculator } from "../../../lib/calculators";
import { countries, getCountry } from "../../../lib/countries";

export const dynamicParams = false;
export function generateStaticParams() { return countries.map(({ slug }) => ({ country: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> { const country = getCountry((await params).country); return country ? { title: `Financial Calculators & Guidance for ${country.name}`, description: country.intro, alternates: { canonical: `/countries/${country.slug}` } } : {}; }

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const country = getCountry((await params).country); if (!country) notFound();
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: `Numora financial tools for ${country.name}`, description: country.intro, about: { "@type": "Country", name: country.name } };
  return <><SiteHeader /><main id="main-content"><section className="country-hero"><div className="shell country-hero-grid"><div><span className="country-code large">{country.flag}</span><p className="eyebrow">{country.currency} planning hub</p><h1>Clearer money decisions in {country.name}.</h1><p>{country.intro}</p></div><aside><b>Local-context note</b><p>{country.note}</p></aside></div></section><section className="local-tools"><div className="shell"><div className="section-heading-row"><div><p className="eyebrow">Start with a scenario</p><h2>Featured calculators</h2></div><Link className="text-link" href="/calculators">Explore all 24</Link></div><div className="directory-grid four">{country.featured.map((slug) => { const tool = getCalculator(slug); return tool ? <Link className="directory-card" href={`/calculators/${slug}`} key={slug}><span className="category-tag">{tool.category}</span><h2>{tool.shortTitle}</h2><p>{tool.description}</p><span className="card-link">Calculate in {country.currency} →</span></Link> : null; })}</div></div></section><section className="country-topics"><div className="shell"><p className="eyebrow">Decision checklist</p><h2>What to account for locally</h2><div className="topic-grid">{country.topics.map((topic, index) => <article key={topic.title}><span>0{index + 1}</span><h3>{topic.title}</h3><p>{topic.copy}</p></article>)}</div></div></section><section className="official-resources"><div className="shell resource-grid"><div><p className="eyebrow">Primary sources</p><h2>Official {country.name} resources</h2><p>Use these sources to verify current rules, protection, registrations, and product guidance.</p></div><div>{country.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><b>{resource.label} ↗</b><span>{resource.note}</span></a>)}</div></div></section></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
