export type ConsentChoice = "accepted" | "essential";

export const CONSENT_STORAGE_KEY = "numora-consent";
export const CONSENT_CHANGE_EVENT = "numora-consent-change";

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "accepted" || stored === "essential" ? stored : null;
}

export function isAdvertisingRegionAllowed(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((item) => item.trim() === "numora-ad-region=standard");
}
