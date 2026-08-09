import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Numora Financial Calculators",
    short_name: "Numora",
    description: "Free global financial calculators and plain-English money guides.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#16392f",
    icons: [
      { src: "/favicon.png", sizes: "64x64", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
