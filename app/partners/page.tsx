import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { ContentPage } from "../../components/ContentPage";
import { getActivePartnerCategories } from "../../lib/monetization";

export const metadata: Metadata = {
  title: "Partners & Advertising Disclosure",
  description: "Numora's current monetization status and rules for advertising and affiliate relationships.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  const activeCategories = getActivePartnerCategories();

  return (
    <ContentPage eyebrow="Commercial transparency" title="Partners and advertising" lede="Revenue can support free tools, but it must never be confused with an independent calculation.">
      <h2>Current status</h2>
      <p>Numora has configured Google AdSense. Ads can appear only after Google approves the site and the visitor’s applicable consent and regional requirements allow them.</p>
      {activeCategories.length > 0 ? (
        <p>Paid partner links are currently configured for these topics: <b>{activeCategories.join(", ")}</b>. Every active commercial link is labelled beside the call to action and uses a sponsored-link signal.</p>
      ) : (
        <p>Numora currently has no active bank, credit, mortgage, brokerage, investment, or affiliate partnerships. No financial provider has paid for ranking, placement, or a favourable result.</p>
      )}
      <h2>Advertising rules</h2>
      <p>Advertising is visually separated and labelled “Advertisement.” Ad code loads only after the applicable consent choice and is disabled in restricted regions until a Google-certified consent platform is configured. Advertising never changes calculator formulas or results.</p>
      <h2>Affiliate links</h2>
      <p>A clearly labelled link may earn Numora a commission if a reader chooses a provider. Compensation will not increase the reader’s calculator estimate, and it will not guarantee approval, suitability, pricing, or product quality.</p>
      <h2>Editorial firewall</h2>
      <p>Commercial partners may provide factual corrections to their own product disclosures, but they cannot approve our conclusions or remove material risks. Sponsored content must be labelled at the top of the page.</p>
      <h2>How providers are evaluated</h2>
      <ul>
        <li>Appropriate authorisation or registration in the served jurisdiction</li>
        <li>Clear consumer disclosures, costs, risks, and eligibility</li>
        <li>No misleading approval, return, or savings claims</li>
        <li>Reasonable complaint, privacy, and security practices</li>
      </ul>
      <div className="guide-callout">Commercial providers can review the standards on the <Link className="inline-link" href="/advertise">Advertise with Numora</Link> page.</div>
    </ContentPage>
  );
}
