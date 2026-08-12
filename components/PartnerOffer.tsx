import Link from "@/components/SafeLink";
import type { CalculatorCategory } from "../lib/calculators";
import { getPartnerOffer } from "../lib/monetization";

export function PartnerOffer({ category }: { category: CalculatorCategory }) {
  const offer = getPartnerOffer(category);
  if (!offer) return null;

  return (
    <aside className="partner-offer-card" aria-label="Commercial partner option">
      <div>
        <p className="sponsor-label">{offer.eyebrow}</p>
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
        <small>
          Numora may earn a commission if you use this link. It does not change your result, price, or eligibility. <Link href="/partners">How commercial links work.</Link>
        </small>
      </div>
      <a className="button primary" href={offer.url} target="_blank" rel="sponsored noopener noreferrer">
        {offer.cta} <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
