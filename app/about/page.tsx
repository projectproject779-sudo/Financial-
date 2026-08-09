import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { ContentPage } from "../../components/ContentPage";

export const metadata: Metadata = {
  title: "About Numora",
  description: "Learn why Numora builds free, private, globally useful financial calculators and how the site is funded.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <ContentPage eyebrow="About Numora" title="Financial tools should create clarity, not pressure." lede="Numora turns common money questions into understandable estimates that work across countries, currencies, and devices.">
    <p className="updated">Independent educational product · Established 2026</p>
    <h2>What we build</h2>
    <p>Numora provides focused calculators for borrowing, home financing, saving, compounding, and long-term investing. The tools do not require an account, and the financial values you enter stay in your browser.</p>
    <h2>Our standard</h2>
    <p>Every calculator shows its core assumptions, uses established financial formulas, and clearly separates educational estimates from professional advice. We avoid personalized recommendations and do not rank financial products without transparent criteria.</p>
    <h2>How Numora can be funded</h2>
    <p>Numora may eventually earn revenue from clearly labeled advertising, sponsorships, or affiliate partnerships. Commercial relationships will not change calculator formulas. Paid placements will be identified, and the privacy policy will be updated before third-party advertising or analytics is enabled.</p>
    <div className="guide-callout">Trust comes first: no hidden sign-up, no invented “best product” claims, and no sale of calculator inputs.</div>
    <h2>Use Numora responsibly</h2>
    <p>Use the results to understand trade-offs and ask better questions. Before acting, confirm local taxes, fees, legal rules, and provider terms with a qualified professional in your country.</p>
    <p><Link className="text-link" href="/methodology">Read our calculation methodology →</Link></p>
  </ContentPage>;
}
