import type { Metadata } from "next";
import { ToolPage } from "../../components/ToolPage";

export const metadata: Metadata = {
  title: "Free Mortgage Calculator",
  description: "Estimate a monthly mortgage payment and see principal, interest, and lifetime repayment costs.",
  alternates: { canonical: "/mortgage-calculator" },
};

export default function Page() { return <ToolPage tool="mortgage" />; }
