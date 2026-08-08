import type { Metadata } from "next";
import { ToolPage } from "../../components/ToolPage";

export const metadata: Metadata = {
  title: "Free Loan Calculator",
  description: "Estimate monthly loan payments, total interest, and total repayment in eight major currencies.",
  alternates: { canonical: "/loan-calculator" },
};

export default function Page() { return <ToolPage tool="loan" />; }
