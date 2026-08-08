"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "essential" | null;

function loadScript(src: string, attributes: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

export function ConsentManager({ gaId, adsenseClient }: { gaId?: string; adsenseClient?: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const configured = Boolean(gaId || adsenseClient);

  useEffect(() => {
    const stored = window.localStorage.getItem("numora-consent");
    if (stored === "accepted" || stored === "essential") window.setTimeout(() => setConsent(stored), 0);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (gaId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
      window.setTimeout(() => {
        const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
        win.dataLayer = win.dataLayer || [];
        win.gtag = (...args: unknown[]) => win.dataLayer?.push(args);
        win.gtag("js", new Date());
        win.gtag("config", gaId, { anonymize_ip: true });
      }, 0);
    }
    if (adsenseClient) loadScript(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`, { crossorigin: "anonymous" });
  }, [adsenseClient, consent, gaId]);

  const choose = (next: Exclude<Consent, null>) => { window.localStorage.setItem("numora-consent", next); setConsent(next); };
  if (!configured || consent) return null;
  return <aside className="consent-banner" aria-label="Cookie choices"><div><b>Your privacy, your choice</b><p>Numora uses essential storage for preferences. With permission, Google Analytics measures anonymous site use and approved advertising may load later. Your calculator inputs are never sent by the calculators.</p></div><div><button type="button" onClick={() => choose("essential")}>Essential only</button><button className="accept" type="button" onClick={() => choose("accepted")}>Accept analytics</button></div></aside>;
}
