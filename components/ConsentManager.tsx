"use client";

import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, isAdvertisingRegionAllowed, readConsentChoice, type ConsentChoice } from "../lib/consent";

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;
const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;

function loadScript(src: string, attributes: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

export function ConsentManager({ gaId, adsenseClient }: { gaId?: string; adsenseClient?: string }) {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const validGaId = gaId && GA_ID_PATTERN.test(gaId) ? gaId : undefined;
  const validAdsenseClient = adsenseClient && ADSENSE_CLIENT_PATTERN.test(adsenseClient) ? adsenseClient : undefined;
  const configured = Boolean(validGaId || validAdsenseClient);

  useEffect(() => {
    const stored = readConsentChoice();
    if (stored) window.setTimeout(() => setConsent(stored), 0);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (validGaId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(validGaId)}`);
      window.setTimeout(() => {
        const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
        win.dataLayer = win.dataLayer || [];
        win.gtag = (...args: unknown[]) => win.dataLayer?.push(args);
        win.gtag("js", new Date());
        win.gtag("config", validGaId, { anonymize_ip: true });
      }, 0);
    }
    if (validAdsenseClient && isAdvertisingRegionAllowed()) loadScript(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(validAdsenseClient)}`, { crossorigin: "anonymous" });
  }, [consent, validAdsenseClient, validGaId]);

  const choose = (next: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    setConsent(next);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  };
  if (!configured || consent) return null;
  return <aside className="consent-banner" aria-label="Cookie choices"><div><b>Your privacy, your choice</b><p>Numora uses essential storage for preferences. With permission, Google Analytics measures anonymous site use and approved advertising may load where permitted. Your calculator inputs are never sent by the calculators.</p></div><div><button type="button" onClick={() => choose("essential")}>Essential only</button><button className="accept" type="button" onClick={() => choose("accepted")}>Accept optional cookies</button></div></aside>;
}
