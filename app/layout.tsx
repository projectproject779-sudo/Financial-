import type { Metadata, Viewport } from "next";
import { ConsentManager } from "../components/ConsentManager";
import { SITE_ORIGIN } from "../lib/site";
import "./globals.css";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-19PVFZ6DB5";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "Mt-DW-ZuNFFTHNh3-3rFIES69X2jgAfSWLmZCdZx2zc";
const adsenseClient = /^ca-pub-\d{16}$/.test(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "") ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT : undefined;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16392f",
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_ORIGIN),
    title: { default: "Numora — Free Global Financial Calculators", template: "%s | Numora" },
    description: "Free global calculators for loans, mortgages, compound interest, savings goals, and investment returns.",
    keywords: ["financial calculator", "loan calculator", "mortgage calculator", "compound interest calculator", "savings calculator", "investment calculator"],
    openGraph: {
      title: "Numora — Make your money make sense",
      description: "Free, private financial calculators for clear money decisions.",
      type: "website",
      url: "/",
      siteName: "Numora",
      locale: "en_US",
      images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Numora global financial calculators" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Numora — Make your money make sense",
      description: "Free, private financial calculators for clear money decisions.",
      images: ["/og-card.png"],
    },
    category: "finance",
    applicationName: "Numora",
    authors: [{ name: "Shuxrat Asliddinov", url: "/authors/numora-editorial-team" }],
    creator: "Shuxrat Asliddinov",
    publisher: "Numora",
    referrer: "strict-origin-when-cross-origin",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      ],
      apple: [{ url: "/favicon.png", sizes: "64x64" }],
    },
    manifest: "/manifest.webmanifest",
    verification: { google: googleSiteVerification },
    other: adsenseClient ? { "google-adsense-account": adsenseClient } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ConsentManager gaId={googleAnalyticsId} adsenseClient={adsenseClient} />
      </body>
    </html>
  );
}
