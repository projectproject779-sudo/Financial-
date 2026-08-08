import type { Metadata } from "next";
import { ToolPage } from "../../components/ToolPage";

export const metadata: Metadata = {
  title: "Free Investment Return Calculator",
  description: "Project investment growth using your starting amount, monthly contributions, return, and time horizon.",
  alternates: { canonical: "/investment-return-calculator" },
};

export default function Page() { return <ToolPage tool="investment" />; }
