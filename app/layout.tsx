import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { DM_Sans, Manrope } from "next/font/google";
import { ConsentManager } from "../components/ConsentManager";
import "./globals.css";

const bodyFont = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const displayFont = Manrope({ variable: "--font-display", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16392f",
};

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: "Numora — Free Global Financial Calculators", template: "%s | Numora" },
    description: "Free global calculators for loans, mortgages, compound interest, savings goals, and investment returns.",
    keywords: ["financial calculator", "loan calculator", "mortgage calculator", "compound interest calculator", "savings calculator", "investment calculator"],
    openGraph: {
      title: "Numora — Make your money make sense",
      description: "Free, private financial calculators for clear money decisions.",
      type: "website",
      siteName: "Numora",
      images: [{ url: `${baseUrl}/og.png`, width: 1536, height: 1024, alt: "Numora global financial calculators" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Numora — Make your money make sense",
      description: "Free, private financial calculators for clear money decisions.",
      images: [`${baseUrl}/og.png`],
    },
    category: "finance",
    creator: "Numora",
    publisher: "Numora",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    icons: { icon: "/og.png", apple: "/og.png" },
    alternates: { canonical: "/" },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
        <ConsentManager gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} adsenseClient={process.env.NEXT_PUBLIC_ADSENSE_CLIENT} />
      </body>
    </html>
  );
}
