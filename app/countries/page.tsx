import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { countries } from "../../lib/countries";

export const metadata: Metadata = { title: "Financial Tools by Country", description: "Local starting points, official financial resources, and currency-ready calculators for the US, UK, Canada, Australia, and India." };

export default function CountriesPage() {
  return <><SiteHeader /><main id="main-content"><section className="listing-hero"><div className="shell listing-hero-inner"><div><p className="eyebrow">Global tools, local context</p><h1>Money decisions depend on where you live.</h1><p>Choose your country for local currency defaults, decision checklists, and direct links to official regulators and consumer resources.</p></div><div className="listing-stat"><strong>5</strong><span>country hubs, built around primary official sources</span></div></div></section><section className="directory-section"><div className="shell country-grid">{countries.map((country) => <Link className="country-card" href={`/countries/${country.slug}`} key={country.slug}><span className="country-code">{country.flag}</span><div><p>{country.currency} · {country.currencyName}</p><h2>{country.name}</h2><span>{country.intro}</span><b>Explore local hub →</b></div></Link>)}</div></section></main><SiteFooter /></>;
}
