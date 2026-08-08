import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { guides } from "../../lib/guides";

export const metadata: Metadata = { title: "Plain-English Money Guides", description: "Evidence-led guides to loans, mortgages, saving, debt, retirement, inflation, investing, and financial planning." };

const originals = [{ href: "/guides/apr-vs-interest-rate", category: "Borrowing", title: "APR vs interest rate", copy: "See the difference that changes the real cost of debt." }, { href: "/guides/compound-interest", category: "Investing", title: "How compound interest builds wealth", copy: "Understand the roles of time, return, and consistency." }, { href: "/guides/savings-goals", category: "Saving", title: "Turn a big goal into a monthly plan", copy: "Build a practical path from target to monthly action." }];

export default function GuidesPage() { return <><SiteHeader /><main id="main-content"><section className="listing-hero"><div className="shell listing-hero-inner"><div><p className="eyebrow">Evidence before opinion</p><h1>Money guides built for decisions, not clicks.</h1><p>Plain-English explanations, transparent assumptions, primary sources, and practical checklists.</p></div><div className="listing-stat"><strong>{guides.length + originals.length}</strong><span>in-depth guides reviewed by the Numora Editorial Team</span></div></div></section><section className="directory-section"><div className="shell guide-library">{[...originals, ...guides.map((guide) => ({ href: `/insights/${guide.slug}`, category: guide.category, title: guide.title, copy: guide.description }))].map((guide, index) => <article key={guide.href}><span>{String(index + 1).padStart(2, "0")} · {guide.category}</span><h2>{guide.title}</h2><p>{guide.copy}</p><Link href={guide.href}>Read guide →</Link></article>)}</div></section></main><SiteFooter /></>; }
