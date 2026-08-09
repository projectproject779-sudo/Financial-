"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_CHANGE_EVENT, isAdvertisingRegionAllowed, readConsentChoice } from "../lib/consent";

const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;
const ADSENSE_SLOT_PATTERN = /^\d{10}$/;

export function AdSlot({ client, slot }: { client?: string; slot?: string }) {
  const [eligible, setEligible] = useState(false);
  const hasRequestedAd = useRef(false);
  const validClient = client && ADSENSE_CLIENT_PATTERN.test(client) ? client : undefined;
  const validSlot = slot && ADSENSE_SLOT_PATTERN.test(slot) ? slot : undefined;

  useEffect(() => {
    const syncEligibility = () => setEligible(readConsentChoice() === "accepted" && isAdvertisingRegionAllowed());
    const timer = window.setTimeout(syncEligibility, 0);
    window.addEventListener(CONSENT_CHANGE_EVENT, syncEligibility);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncEligibility);
    };
  }, []);

  useEffect(() => {
    if (!eligible || !validClient || !validSlot || hasRequestedAd.current) return;
    hasRequestedAd.current = true;
    const win = window as Window & { adsbygoogle?: Array<Record<string, never>> };
    win.adsbygoogle = win.adsbygoogle || [];
    win.adsbygoogle.push({});
  }, [eligible, validClient, validSlot]);

  if (!eligible || !validClient || !validSlot) return null;

  return (
    <aside className="ad-container" aria-label="Advertisement">
      <p>Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={validClient}
        data-ad-slot={validSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
