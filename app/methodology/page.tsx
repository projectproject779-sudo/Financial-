import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { ContentPage } from "../../components/ContentPage";

export const metadata: Metadata = {
  title: "Calculation Methodology",
  description: "Review the formulas, assumptions, rounding, limitations, and quality standards behind Numora calculators.",
  alternates: { canonical: "/methodology" },
};

export default function Page() {
  return <ContentPage eyebrow="Transparency" title="How Numora calculations work" lede="The formulas are standard, the assumptions are visible, and the limitations are stated before you rely on an estimate.">
    <p className="updated">Methodology reviewed: August 9, 2026</p>
    <h2>Loan and mortgage payments</h2>
    <p>Numora uses the standard fixed-rate amortization formula. The annual rate is divided by 12, payments are assumed monthly, and the result assumes the same rate for the full term. The estimate excludes fees, insurance, taxes, variable-rate changes, and country-specific charges.</p>
    <h2>Compound interest and investment return</h2>
    <p>Growth is compounded monthly. The starting balance grows for the selected time horizon, while regular contributions are assumed to be made at the end of each month. The selected return is hypothetical and does not represent guaranteed performance.</p>
    <h2>Savings goals</h2>
    <p>The calculator first grows the current balance at the selected annual return, then calculates the equal end-of-month contribution needed to reach the target. It does not automatically adjust the target for inflation or taxes.</p>
    <h2>Currency and rounding</h2>
    <p>Changing currency changes presentation only; Numora does not convert exchange rates. Results retain full precision internally and are rounded for display according to the selected currency’s common format.</p>
    <div className="guide-callout">A calculator is a scenario model. Your real outcome depends on provider rules, timing, fees, taxes, and market conditions.</div>
    <h2>Quality and corrections</h2>
    <p>Core routes are checked through automated server-rendering tests and production builds before publication. Material formula or disclosure changes are documented through the site’s version history and reflected on this page.</p>
    <p><Link className="text-link" href="/calculators">Explore all 24 calculators →</Link></p>
  </ContentPage>;
}
