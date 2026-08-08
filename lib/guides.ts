export type Guide = {
  slug: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  reviewed: string;
  takeaways: string[];
  sections: Array<{ heading: string; paragraphs: string[]; checklist?: string[] }>;
  sources: Array<{ label: string; url: string }>;
};

export const guides: Guide[] = [
  {
    slug: "compare-loans-by-total-cost", category: "Borrowing", title: "How to compare loans by total cost—not the advertised payment", description: "A practical framework for comparing APR, fees, term, payment, and flexibility across competing loan offers.", readTime: "8 min", reviewed: "August 9, 2026",
    takeaways: ["Put every offer on the same amount and term", "Separate contractual interest from fees", "Stress-test affordability before choosing the cheapest scenario"],
    sections: [
      { heading: "Start with a like-for-like comparison", paragraphs: ["A low monthly payment can be produced by stretching repayment over more years. That may improve short-term cash flow while increasing lifetime interest. Compare the same amount borrowed, repayment schedule, and term wherever possible.", "Record the amount you receive, the amount financed, the regular payment, the number of payments, every required fee, and the total repayable. If one lender cannot provide those figures clearly, treat that as decision-relevant information."] },
      { heading: "Understand rate, APR, and fees", paragraphs: ["The contractual interest rate drives periodic interest. APR or a local equivalent is designed to help express certain borrowing costs on an annual basis, but its legal definition varies by jurisdiction and product.", "List origination, application, valuation, broker, insurance, late-payment, account, and early-repayment charges separately. Optional products should not be silently treated as required."], checklist: ["Interest rate and whether it can change", "APR or local comparison rate", "Upfront and recurring fees", "Late and early-repayment rules"] },
      { heading: "Model the cash-flow risk", paragraphs: ["Affordability is not the same as lender approval. Test the payment against after-tax income and unavoidable expenses, including irregular annual costs.", "For a variable-rate loan, calculate at a meaningfully higher rate. For income that is seasonal or uncertain, test a weaker month rather than an average month."] },
      { heading: "Value flexibility explicitly", paragraphs: ["The mathematically cheapest offer may not be the best fit if it prevents extra repayments, carries a severe exit charge, or requires collateral you cannot risk.", "Read the regulated disclosure and contract before accepting. A calculator is a scenario tool; the signed terms determine the real obligation."] },
    ],
    sources: [{ label: "CFPB consumer tools", url: "https://www.consumerfinance.gov/consumer-tools/" }, { label: "MoneyHelper — borrowing", url: "https://www.moneyhelper.org.uk/en/everyday-money/credit-and-purchases" }],
  },
  {
    slug: "mortgage-affordability-beyond-payment", category: "Home buying", title: "Mortgage affordability: the costs your payment calculator cannot see", description: "Build a complete home budget around repayments, taxes, insurance, fees, maintenance, and rate risk.", readTime: "9 min", reviewed: "August 9, 2026",
    takeaways: ["Principal and interest are only the core payment", "Upfront cash needs a separate budget", "A higher-rate scenario reveals fragility"],
    sections: [
      { heading: "Build the recurring housing cost", paragraphs: ["Start with principal and interest, then add every cost required to keep the home: property tax or rates, building and contents insurance, mortgage insurance where applicable, HOA or strata charges, utilities, and realistic maintenance.", "Some costs rise over time even when a fixed mortgage payment does not. Keep them as separate budget lines so increases remain visible."] },
      { heading: "Protect the upfront cash plan", paragraphs: ["A deposit is not the full cash requirement. Legal work, inspection, valuation, lender charges, transfer taxes or stamp duty, moving, immediate repairs, and a post-completion emergency reserve can all matter.", "Avoid using every liquid dollar for completion. A home creates new, sometimes urgent, repair risk from day one."], checklist: ["Deposit", "Closing and government charges", "Inspection and professional services", "Emergency reserve after completion"] },
      { heading: "Stress-test rate and income", paragraphs: ["Model the mortgage at the offered rate and at one or more higher rates. The objective is not to predict exactly; it is to expose whether the budget survives an adverse but plausible scenario.", "Also test a period of lower household income. If the plan only works with bonuses or overtime, identify a backup before committing."] },
      { heading: "Compare the ownership horizon", paragraphs: ["Buying and selling have friction costs. If you may move soon, compare total ownership costs and likely sale costs with renting over the same horizon.", "Do not assume price appreciation will rescue an unaffordable plan. Treat it as uncertain rather than required."] },
    ],
    sources: [{ label: "CFPB — mortgages", url: "https://www.consumerfinance.gov/consumer-tools/mortgages/" }, { label: "ASIC Moneysmart — home loans", url: "https://moneysmart.gov.au/home-loans" }],
  },
  {
    slug: "build-emergency-fund", category: "Saving", title: "How to build an emergency fund that matches your actual risk", description: "Size a cash buffer from essential expenses, income stability, dependants, insurance, and access needs.", readTime: "7 min", reviewed: "August 9, 2026",
    takeaways: ["Start from essential expenses, not gross income", "Choose coverage from your risk—not a slogan", "Keep emergency cash accessible"],
    sections: [
      { heading: "Define a real emergency", paragraphs: ["An emergency fund is for necessary, unpredictable costs or an income interruption. Planned annual bills, holidays, and routine maintenance belong in separate sinking funds.", "That separation prevents ordinary spending from repeatedly emptying the safety buffer."] },
      { heading: "Calculate essential monthly expenses", paragraphs: ["List housing, basic food, utilities, transport needed for work, insurance, minimum debt payments, essential healthcare, and unavoidable dependant costs. Exclude expenses you could pause quickly.", "Use actual statements rather than memory. An understated baseline produces false security."], checklist: ["Housing and utilities", "Essential food and transport", "Insurance and healthcare", "Minimum debt and dependant obligations"] },
      { heading: "Choose a coverage range", paragraphs: ["Income volatility, job concentration, dependants, health exposure, insurance deductibles, and access to family support all affect the appropriate number of months.", "Use a lower and higher target rather than pretending one universal number is correct. Build the first month quickly, then extend in stages."] },
      { heading: "Prioritise safety and access", paragraphs: ["Emergency money has a different job from long-term investments. It should be liquid, understandable, and held with an appropriately protected institution where possible.", "Review the target after a move, job change, new dependant, major debt, or insurance change."] },
    ],
    sources: [{ label: "FCAC — saving for emergencies", url: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/setting-up-emergency-funds.html" }, { label: "ASIC Moneysmart — saving", url: "https://moneysmart.gov.au/saving" }],
  },
  {
    slug: "debt-avalanche-vs-snowball", category: "Debt", title: "Debt avalanche vs snowball: choosing a payoff system you can sustain", description: "Compare interest-first and balance-first payoff methods, then build a plan that survives real life.", readTime: "8 min", reviewed: "August 9, 2026",
    takeaways: ["Avalanche usually minimises interest", "Snowball may create faster visible wins", "The best plan preserves minimum payments and avoids new debt"],
    sections: [
      { heading: "Stabilise before accelerating", paragraphs: ["List each balance, rate, required minimum, due date, and whether it is secured. Bring essential obligations and minimums current before directing extra cash aggressively.", "If payments are already unmanageable, contact creditors or a qualified nonprofit or regulated debt adviser early. A calculator cannot negotiate hardship terms."] },
      { heading: "How the avalanche works", paragraphs: ["Pay every minimum, then direct all extra money to the highest-rate balance. After it clears, roll its payment into the next-highest rate.", "Because expensive interest is attacked first, avalanche generally minimises total interest when payments and timing are otherwise equal."] },
      { heading: "How the snowball works", paragraphs: ["Pay every minimum, then target the smallest balance regardless of rate. The early closure of an account can create momentum and simplify the plan.", "The trade-off is that higher-rate balances may remain longer, increasing interest compared with avalanche."], checklist: ["Automate every minimum", "Stop adding new revolving balances", "Choose one target debt", "Roll each cleared payment forward"] },
      { heading: "Choose using behaviour and risk", paragraphs: ["Compare the interest difference, but also be honest about which system you will repeat for months or years. A hybrid can clear one small balance before switching to the highest rate.", "Keep a small emergency buffer so one surprise does not force new borrowing and break the payoff plan."] },
    ],
    sources: [{ label: "CFPB — debt collection and credit", url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/" }, { label: "MoneyHelper — dealing with debt", url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt" }],
  },
  {
    slug: "retirement-scenario-planning", category: "Retirement", title: "Retirement projections without false precision", description: "Use ranges for returns, inflation, fees, contributions, and retirement length instead of relying on one optimistic number.", readTime: "10 min", reviewed: "August 9, 2026",
    takeaways: ["A return assumption is not a forecast", "Inflation and fees compound too", "Run a weak, base, and strong scenario"],
    sections: [
      { heading: "Separate inputs you control", paragraphs: ["Contribution rate, savings consistency, asset allocation, fees, and retirement spending are partly controllable. Market return, inflation, lifespan, and policy are not.", "A useful plan focuses on repeatable actions while displaying uncertainty around outcomes."] },
      { heading: "Build three scenarios", paragraphs: ["Run a conservative, central, and stronger return case using the same starting balance and contributions. Avoid choosing the strongest case simply because it reaches the target.", "Reduce nominal return by inflation to reason about future purchasing power, and subtract investment and advice fees where the calculator does not include them."], checklist: ["Lower-return scenario", "Inflation-adjusted view", "Fee impact", "Contribution interruptions"] },
      { heading: "Test the retirement phase", paragraphs: ["Accumulation is only half the plan. Retirement length, withdrawal timing, market losses early in retirement, tax, healthcare, and reliable pension income influence sustainability.", "A simple portfolio multiple or withdrawal rate is a starting scenario, not a guarantee."] },
      { heading: "Review instead of predicting", paragraphs: ["Update the plan after material income, family, health, pension, or market changes. Annual review is usually more useful than daily reaction.", "For regulated or tax-specific advice, use a qualified professional in your jurisdiction."] },
    ],
    sources: [{ label: "SEC Investor.gov — retirement", url: "https://www.investor.gov/additional-resources/retirement-toolkit" }, { label: "SEBI Investor — calculators", url: "https://investor.sebi.gov.in/calculators/index.html" }],
  },
  {
    slug: "inflation-and-real-returns", category: "Investing", title: "Inflation, nominal returns, and the number that matters: purchasing power", description: "Understand why a growing account can still buy less, and compare investments on a real-return basis.", readTime: "7 min", reviewed: "August 9, 2026",
    takeaways: ["Nominal growth is before inflation", "Real return is approximately return minus inflation", "Your personal inflation can differ from a national index"],
    sections: [
      { heading: "Nominal and real are different questions", paragraphs: ["Nominal return measures how the account value changed in money terms. Real return adjusts that change for inflation and estimates the change in purchasing power.", "The precise relationship is (1 + nominal return) divided by (1 + inflation), minus 1. Simple subtraction is only an approximation."] },
      { heading: "Inflation compounds over time", paragraphs: ["A constant annual increase has a cumulative effect: future cost equals today's cost multiplied by one plus inflation, raised to the number of years.", "Long plans should be viewed in both future money and today's purchasing-power terms to avoid confusing a larger number with a better lifestyle."] },
      { heading: "Use a relevant range", paragraphs: ["Official consumer-price indices describe a broad basket. Your mix of housing, healthcare, education, energy, and travel may change at a different rate.", "Run more than one inflation scenario and avoid assuming a recent extreme will persist forever."], checklist: ["Official national index", "Personal high-weight expenses", "Investment fees and tax", "Time horizon"] },
      { heading: "Apply the insight to goals", paragraphs: ["Inflate future goal costs or express investment results in today's money. Be consistent—do not compare a nominal future portfolio with a goal stated in today's prices.", "Review long-term assumptions periodically rather than changing them in response to every monthly data release."] },
    ],
    sources: [{ label: "US Bureau of Labor Statistics — CPI", url: "https://www.bls.gov/cpi/" }, { label: "UK Office for National Statistics — inflation", url: "https://www.ons.gov.uk/economy/inflationandpriceindices" }],
  },
  {
    slug: "freelance-rate-guide", category: "Income", title: "How to set a freelance rate that covers the work clients never see", description: "Convert take-home income, non-billable time, business costs, tax, leave, and risk into a sustainable rate floor.", readTime: "8 min", reviewed: "August 9, 2026",
    takeaways: ["Billable hours are less than working hours", "Business costs and unpaid leave belong in the rate", "A calculated floor is not the final price"],
    sections: [
      { heading: "Start from sustainable take-home income", paragraphs: ["Choose the annual personal income the business must support. Then estimate business overhead, professional services, insurance, equipment, software, payment fees, and training.", "Add a tax reserve using local professional guidance. Tax treatment is jurisdiction- and structure-specific."] },
      { heading: "Estimate billable capacity honestly", paragraphs: ["Working weeks are reduced by leave, illness, holidays, administration, marketing, proposals, client communication, and skill development.", "Multiply realistic billable hours per week by realistic working weeks. Overstating capacity creates a rate that looks competitive but fails to fund the year."], checklist: ["Unpaid leave", "Sales and administration", "Project gaps", "Rework and scope risk"] },
      { heading: "Calculate a floor, then price the engagement", paragraphs: ["Required annual revenue divided by billable hours creates a baseline hourly rate. It is a sustainability floor, not a universal quote.", "Complexity, urgency, value, intellectual property, scope uncertainty, and market conditions may justify a higher price or a fixed project fee."] },
      { heading: "Protect the assumptions in writing", paragraphs: ["Define deliverables, exclusions, revision limits, dates, payment milestones, late terms, expenses, and change control. Good scope protects both client and freelancer.", "Review actual billable utilisation and profit quarterly, then update the rate model with evidence."] },
    ],
    sources: [{ label: "US Small Business Administration — planning", url: "https://www.sba.gov/business-guide/plan-your-business" }, { label: "UK government — self-employment", url: "https://www.gov.uk/working-for-yourself" }],
  },
  {
    slug: "investment-fees-compound", category: "Investing", title: "The quiet compounding cost of investment fees", description: "See how recurring fees reduce the capital that remains available to compound over long horizons.", readTime: "7 min", reviewed: "August 9, 2026",
    takeaways: ["A small annual percentage can create a large long-term gap", "Compare total costs, not one fee line", "Cost matters alongside risk, service, tax, and suitability"],
    sections: [
      { heading: "Fees reduce the compounding base", paragraphs: ["A recurring percentage fee is charged again as the portfolio changes. Money removed for costs is no longer available to earn future returns.", "The long-horizon effect is therefore larger than adding the annual fee percentages together."] },
      { heading: "Map the full cost stack", paragraphs: ["Costs can include fund expense ratios, platform or administration fees, advice fees, trading costs, spreads, performance fees, foreign exchange, tax drag, and exit charges.", "Some appear directly on statements; others reduce fund performance or transaction proceeds."], checklist: ["Product cost", "Platform and advice", "Trading and FX", "Performance and exit terms"] },
      { heading: "Compare with consistent assumptions", paragraphs: ["Project the same starting balance, contributions, gross return, and time period, then subtract each offer's total recurring and one-off costs.", "Do not assume the cheapest option is automatically suitable. Risk, diversification, tracking, tax, service, and behavior support also matter."] },
      { heading: "Ask for money and percentage figures", paragraphs: ["Request expected annual cost in both currency and percentage terms for your actual balance. Ask which costs can vary and what happens if you transfer or close the account.", "Use regulated disclosures and official registers to verify products and providers before sending money."] },
    ],
    sources: [{ label: "SEC Investor.gov — impact of fees", url: "https://www.investor.gov/introduction-investing/getting-started/understanding-fees" }, { label: "FCA — investment costs and charges", url: "https://www.fca.org.uk/consumers/investment-fees" }],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
