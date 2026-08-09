import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { ContentPage } from "../../../components/ContentPage";

export const metadata: Metadata = { title: "APR vs Interest Rate: What Is the Difference?", description: "A plain-English guide to interest rates, APR, fees, and the real cost of borrowing.", alternates: { canonical: "/guides/apr-vs-interest-rate" } };

export default function Page() {
  return <ContentPage eyebrow="Borrowing basics · 5 min read" title="APR vs interest rate: the difference that changes your real cost" lede="Two loans can advertise the same interest rate and still cost very different amounts. APR helps reveal why.">
    <p className="updated">Educational guide · Global edition</p>
    <h2>Interest rate is only one part of the price</h2>
    <p>The interest rate is the percentage a lender charges on the amount you borrow. It drives the interest portion of your payment, but it may not include origination fees, mandatory service charges, or certain other costs.</p>
    <h2>APR is designed for comparison</h2>
    <p>Annual percentage rate, or APR, aims to express interest and eligible borrowing costs as one annualized percentage. The exact legal definition varies by country, so always check which fees are included in the disclosure you receive.</p>
    <div className="guide-callout">When comparing similar loans, look at the APR, total repayment, monthly payment, and early-repayment rules together.</div>
    <h2>A simple comparison method</h2>
    <ol><li>Use the same loan amount and term for every offer.</li><li>Record the advertised rate, APR, all fees, and total repayment.</li><li>Check whether the rate is fixed or variable.</li><li>Ask what happens if you repay early or miss a payment.</li></ol>
    <p><Link className="text-link" href="/calculators/loan-payment">Test an offer with the loan calculator →</Link></p>
  </ContentPage>;
}
