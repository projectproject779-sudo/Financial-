import type { Metadata } from "next";
import { ContentPage } from "../../components/ContentPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Numora handles calculator inputs, technical logs, cookies, and third-party services.", alternates: { canonical: "/privacy" } };

export default function Page() {
  return <ContentPage eyebrow="Legal" title="Privacy policy" lede="Numora is designed so you can use its calculators without creating an account or sending us the financial numbers you enter.">
    <p className="updated">Last updated: August 9, 2026</p>
    <h2>Calculator data</h2><p>Calculator inputs and results are processed in your browser. Numora does not intentionally collect or store the amounts, rates, goals, or currencies you enter into a calculator.</p>
    <h2>Technical information</h2><p>Our hosting provider may process standard technical logs such as IP address, device type, requested pages, and timestamps to deliver, secure, and maintain the service.</p>
    <h2>Analytics and advertising</h2><p>Google Analytics and approved Google advertising are disabled unless the site owner configures valid account identifiers and you choose to accept analytics. If enabled with consent, those providers may process device, usage, cookie, or advertising data under their own policies. Calculator input values are not intentionally sent as analytics events.</p>
    <h2>Your choices</h2><p>You can use the core calculators without an account and choose “Essential only” when optional tools are configured. Your choice is stored locally under <code>numora-consent</code>; clear site data to reset it.</p>
  </ContentPage>;
}
