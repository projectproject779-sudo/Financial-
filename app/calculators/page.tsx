import type { Metadata } from "next";
import { CalculatorDirectory } from "../../components/CalculatorDirectory";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { calculators } from "../../lib/calculators";

export const metadata: Metadata = { title: "24 Free Financial Calculators", description: "Explore 24 free calculators for debt, loans, mortgages, saving, investing, budgeting, retirement, and financial independence." };

export default function CalculatorsPage() {
  return <><SiteHeader /><main id="main-content"><section className="listing-hero"><div className="shell listing-hero-inner"><div><p className="eyebrow">24 free planning tools</p><h1>Every important money decision starts with a clear number.</h1><p>Search practical calculators for borrowing, saving, investing, and everyday planning. No account required.</p></div><div className="listing-stat"><strong>{calculators.length}</strong><span>calculators with transparent formulas and official sources</span></div></div></section><section className="directory-section"><div className="shell"><CalculatorDirectory /></div></section></main><SiteFooter /></>;
}
