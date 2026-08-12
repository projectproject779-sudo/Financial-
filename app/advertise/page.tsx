import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { ContentPage } from "../../components/ContentPage";
import { getBusinessEmail } from "../../lib/monetization";

export const metadata: Metadata = {
  title: "Advertise or Partner with Numora",
  description: "Transparent sponsorship and advertising opportunities across Numora's financial calculators and educational guides.",
  alternates: { canonical: "/advertise" },
};

export default function AdvertisePage() {
  const email = getBusinessEmail();
  const subject = encodeURIComponent("Numora partnership inquiry");

  return (
    <ContentPage eyebrow="Work with Numora" title="Reach people while they are planning a real money decision" lede="Numora offers carefully labelled commercial placements without selling calculator outcomes, rankings, or editorial conclusions.">
      <h2>Available formats</h2>
      <ul>
        <li>Contextual sponsorship beside a relevant calculator or guide</li>
        <li>Clearly labelled affiliate links to an eligible provider</li>
        <li>Sponsored educational content with an editorial review and disclosure</li>
      </ul>
      <h2>Audience and topics</h2>
      <p>Numora helps readers compare borrowing costs, build savings plans, model investment scenarios, prepare for retirement, and understand everyday financial trade-offs across multiple currencies and countries.</p>
      <h2>What we will not publish</h2>
      <ul>
        <li>Guaranteed approval, returns, savings, or debt elimination claims</li>
        <li>Hidden sponsorships or paid rankings presented as independent</li>
        <li>Unlicensed, misleading, or inadequately disclosed financial products</li>
        <li>Commercial changes to calculator formulas or results</li>
      </ul>
      <h2>Start a conversation</h2>
      {email ? (
        <div className="guide-callout commercial-contact">
          <p>Send the company name, target country, product type, proposed landing page, regulatory status, and preferred placement.</p>
          <a className="button primary" href={`mailto:${email}?subject=${subject}`}>Email the publisher</a>
        </div>
      ) : (
        <p>Partner intake is currently closed. A public business contact will appear here when proposals can be reviewed responsibly.</p>
      )}
      <p>All proposals remain subject to Numora’s <Link className="inline-link" href="/editorial-policy">editorial policy</Link> and <Link className="inline-link" href="/partners">commercial disclosure</Link>.</p>
    </ContentPage>
  );
}
