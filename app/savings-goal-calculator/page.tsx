import type { Metadata } from "next";
import { ToolPage } from "../../components/ToolPage";

export const metadata: Metadata = {
  title: "Free Savings Goal Calculator",
  description: "Calculate how much to save each month to reach a future money goal on time.",
  alternates: { canonical: "/savings-goal-calculator" },
};

export default function Page() { return <ToolPage tool="savings" />; }
