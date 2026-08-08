import type { Metadata } from "next";
import { ToolPage } from "../../components/ToolPage";

export const metadata: Metadata = {
  title: "Free Compound Interest Calculator",
  description: "Calculate compound growth from a starting balance, monthly contributions, annual return, and time horizon.",
  alternates: { canonical: "/compound-interest-calculator" },
};

export default function Page() { return <ToolPage tool="interest" />; }
