import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { DM_Sans, Manrope } from "next/font/google";
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
    alternates: { canonical: "/" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
