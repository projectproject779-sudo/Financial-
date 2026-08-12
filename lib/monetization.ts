import type { CalculatorCategory } from "./calculators";

export type PartnerOffer = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  url: string;
};

const partnerUrls: Record<CalculatorCategory, string | undefined> = {
  Borrowing: process.env.NEXT_PUBLIC_PARTNER_BORROWING_URL,
  Saving: process.env.NEXT_PUBLIC_PARTNER_SAVING_URL,
  Investing: process.env.NEXT_PUBLIC_PARTNER_INVESTING_URL,
  Planning: process.env.NEXT_PUBLIC_PARTNER_PLANNING_URL,
};

const partnerCopy: Record<CalculatorCategory, Omit<PartnerOffer, "url">> = {
  Borrowing: {
    eyebrow: "Optional paid partner link",
    title: "Compare the official cost before you borrow",
    description: "Review the rate, total repayable, fees, eligibility, and early-repayment terms in the provider's own disclosure before applying.",
    cta: "View borrowing options",
  },
  Saving: {
    eyebrow: "Optional paid partner link",
    title: "Compare the protection, rate, and access rules",
    description: "Check deposit protection, withdrawal limits, fees, introductory-rate expiry, and the provider's current terms before opening an account.",
    cta: "View saving options",
  },
  Investing: {
    eyebrow: "Optional paid partner link",
    title: "Compare costs and risk—not promised returns",
    description: "Read the regulated disclosure, platform and fund fees, tax treatment, liquidity, and capital-at-risk warning before investing.",
    cta: "View investing options",
  },
  Planning: {
    eyebrow: "Optional paid partner link",
    title: "Choose a service that explains its assumptions",
    description: "Compare scope, fees, credentials, data use, cancellation rights, and the limits of any estimate before you commit.",
    cta: "View planning options",
  },
};

function validatedHttpsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function getPartnerOffer(category: CalculatorCategory): PartnerOffer | undefined {
  const url = validatedHttpsUrl(partnerUrls[category]);
  return url ? { ...partnerCopy[category], url } : undefined;
}

export function getActivePartnerCategories(): CalculatorCategory[] {
  return (Object.keys(partnerUrls) as CalculatorCategory[]).filter((category) => Boolean(getPartnerOffer(category)));
}

export function getBusinessEmail(): string | undefined {
  const value = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim();
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}
