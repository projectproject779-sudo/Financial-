import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "../../../components/ContentPage";

export const metadata: Metadata = { title: "How Compound Interest Builds Wealth", description: "Understand compounding, time, contributions, and investment growth with simple examples.", alternates: { canonical: "/guides/compound-interest" } };

export default function Page() {
  return <ContentPage eyebrow="Investing basics · 6 min read" title="How compound interest actually builds wealth" lede="Compounding means earning a return on both your original money and the returns already added to it.">
    <p className="updated">Educational guide · Global edition</p>
    <h2>The three ingredients</h2>
    <p>Compound growth is shaped by your starting balance, the return earned over time, and how long the money remains invested. Regular contributions add a fourth and often more controllable ingredient.</p>
    <h2>Why time matters so much</h2>
    <p>Growth is rarely linear. In later years, returns have a larger balance to work on, so the same percentage can create a larger currency gain. This is why starting earlier can matter more than finding a perfect moment.</p>
    <div className="guide-callout">Expected return is an assumption, not a promise. Real investments fluctuate, fees reduce returns, and taxes vary by country.</div>
    <h2>Use a range, not one forecast</h2>
    <p>Try conservative, moderate, and optimistic return assumptions. If your plan only works under the optimistic scenario, consider a higher contribution, a longer horizon, or a smaller target.</p>
    <p><Link className="text-link" href="/compound-interest-calculator">Explore compound growth →</Link></p>
  </ContentPage>;
}
