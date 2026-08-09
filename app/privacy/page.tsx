import type { Metadata } from "next";
import { ContentPage } from "../../components/ContentPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Numora handles calculator inputs, technical logs, cookies, and third-party services.", alternates: { canonical: "/privacy" } };

export default function Page() {
  return <ContentPage eyebrow="Legal" title="Privacy policy" lede="Numora is designed so you can use its calculators without creating an account or sending us the financial numbers you enter.">
    <p className="updated">Last updated: August 9, 2026</p>
    <h2>Calculator data</h2><p>Calculator inputs and results are processed in your browser. Numora does not intentionally collect or store the amounts, rates, goals, or currencies you enter into a calculator.</p>
    <h2>Technical information</h2><p>Cloudflare hosts and protects Numora and may process standard technical logs such as IP address, device type, requested pages, country inferred from the network request, and timestamps to deliver, secure, and maintain the service. Numora stores only a regional advertising eligibility value in the <code>numora-ad-region</code> cookie; it does not place your country name in that cookie.</p>
    <h2>Analytics and advertising</h2><p>With your optional consent, Google Analytics may measure site use and Google AdSense may serve advertising where the applicable regional requirements are satisfied. Google may process device, usage, cookie, or advertising data under its own policies. AdSense remains disabled for visitors in the EEA, United Kingdom, and Switzerland until a Google-certified consent management platform is configured. Calculator input values are not intentionally sent as analytics or advertising events.</p>
    <h2>Your choices</h2><p>You can use the core calculators without an account and choose “Essential only.” Your optional-services choice is stored locally under <code>numora-consent</code>, while <code>numora-ad-region</code> prevents advertising from loading in restricted regions. Clear the site data in your browser to reset these values. You can read how Google uses data on <a href="https://policies.google.com/technologies/partner-sites">Google’s partner-sites policy</a> and how Cloudflare handles data in the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.</p>
  </ContentPage>;
}
