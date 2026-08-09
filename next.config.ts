import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/loan-calculator", destination: "/calculators/loan-payment", permanent: true },
      { source: "/mortgage-calculator", destination: "/calculators/mortgage-payment", permanent: true },
      { source: "/compound-interest-calculator", destination: "/calculators/compound-interest", permanent: true },
      { source: "/savings-goal-calculator", destination: "/calculators/savings-goal", permanent: true },
      { source: "/investment-return-calculator", destination: "/calculators/investment-return", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
