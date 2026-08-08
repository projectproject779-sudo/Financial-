import type { Metadata } from "next";
import { ContentPage } from "../../components/ContentPage";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using Numora's free educational financial calculators and guides.", alternates: { canonical: "/terms" } };

export default function Page() {
  return <ContentPage eyebrow="Legal" title="Terms of use" lede="By using Numora, you agree to use its calculators and guides as educational tools rather than personalized professional advice.">
    <p className="updated">Last updated: August 9, 2026</p>
    <h2>Educational estimates</h2><p>Results are estimates based on the inputs and assumptions you provide. They may not include local taxes, fees, insurance, changing rates, provider-specific rules, or market movements.</p>
    <h2>No professional relationship</h2><p>Numora does not provide financial, investment, legal, accounting, or tax advice. Use an appropriately qualified professional before making a material decision.</p>
    <h2>No guarantee</h2><p>We work to make the tools clear and useful, but do not guarantee that every calculation or piece of content is complete, current, or suitable for your circumstances.</p>
    <h2>Responsible use</h2><p>Do not misuse, disrupt, reverse engineer, or attempt unauthorized access to the service. You remain responsible for verifying results and decisions.</p>
  </ContentPage>;
}
