export type CountryConfig = {
  slug: string;
  name: string;
  flag: string;
  currency: string;
  currencyName: string;
  intro: string;
  note: string;
  topics: Array<{ title: string; copy: string }>;
  resources: Array<{ label: string; url: string; note: string }>;
  featured: string[];
};

export const countries: CountryConfig[] = [
  {
    slug: "united-states", name: "United States", flag: "US", currency: "USD", currencyName: "US dollar",
    intro: "Plan borrowing, housing, saving, and investing with US-dollar defaults and links to federal consumer resources.",
    note: "Rules can differ by state and provider. Federal resources below are a starting point, not a substitute for the disclosures that apply to your transaction.",
    topics: [{ title: "Mortgages", copy: "Compare principal and interest, then add property tax, homeowners insurance, mortgage insurance, HOA fees, and closing costs." }, { title: "Consumer credit", copy: "Compare APR, finance charge, term, fees, and total of payments—not the monthly payment alone." }, { title: "Investing", copy: "Investment returns are uncertain. Review fees, tax treatment, diversification, and time horizon before acting." }],
    resources: [{ label: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/consumer-tools/", note: "Mortgages, credit cards, loans, debt collection, and financial education." }, { label: "SEC Investor.gov", url: "https://www.investor.gov/", note: "Investing basics, fraud warnings, and investor tools." }, { label: "Federal Deposit Insurance Corporation", url: "https://www.fdic.gov/resources/deposit-insurance/", note: "Official deposit-insurance information." }],
    featured: ["mortgage-payment", "credit-card-payoff", "student-loan", "retirement-savings"],
  },
  {
    slug: "united-kingdom", name: "United Kingdom", flag: "UK", currency: "GBP", currencyName: "pound sterling",
    intro: "Explore money scenarios in pounds and start with impartial UK guidance for debt, pensions, savings, and home buying.",
    note: "Tax, pension, mortgage, and consumer-credit rules may change. Check the latest official guidance and the provider's regulated disclosure.",
    topics: [{ title: "Mortgages", copy: "Model the repayment, then consider product fees, valuation, conveyancing, insurance, service charges, and possible rate changes." }, { title: "Pensions", copy: "Separate personal projections from State Pension estimates and the specific rules of each workplace or private pension." }, { title: "Savings", copy: "Compare access, interest, tax treatment, protection limits, and inflation—not only the headline rate." }],
    resources: [{ label: "MoneyHelper", url: "https://www.moneyhelper.org.uk/en", note: "Free, impartial guidance backed by the UK government." }, { label: "Financial Conduct Authority", url: "https://www.fca.org.uk/consumers", note: "Consumer information, warnings, and firm register." }, { label: "Financial Services Compensation Scheme", url: "https://www.fscs.org.uk/", note: "Official compensation and protection information." }],
    featured: ["mortgage-payment", "debt-payoff", "retirement-savings", "savings-goal"],
  },
  {
    slug: "canada", name: "Canada", flag: "CA", currency: "CAD", currencyName: "Canadian dollar",
    intro: "Use Canadian-dollar defaults and official federal resources to plan credit, mortgages, budgets, saving, and investing.",
    note: "Provincial rules and provider terms can differ. Verify tax, securities, housing, and consumer-protection requirements where you live.",
    topics: [{ title: "Mortgages", copy: "Stress-test the payment and account for property tax, insurance, condo fees, closing costs, and renewal risk." }, { title: "Credit", copy: "Review interest, fees, payment allocation, insurance, and the consequences of missed payments." }, { title: "Budgeting", copy: "Build from after-tax cash flow and include annual or irregular costs that monthly budgets often miss." }],
    resources: [{ label: "Financial Consumer Agency of Canada", url: "https://www.canada.ca/en/financial-consumer-agency.html", note: "Official consumer information and financial tools." }, { label: "Canadian Securities Administrators", url: "https://www.securities-administrators.ca/investor-tools/", note: "Investment education and fraud prevention." }, { label: "Canada Deposit Insurance Corporation", url: "https://www.cdic.ca/", note: "Official deposit-protection information." }],
    featured: ["mortgage-payment", "budget-50-30-20", "credit-card-payoff", "compound-interest"],
  },
  {
    slug: "australia", name: "Australia", flag: "AU", currency: "AUD", currencyName: "Australian dollar",
    intro: "Plan in Australian dollars with links to ASIC, government, and deposit-protection information.",
    note: "Home-loan, superannuation, tax, credit, and investment rules are specific to Australia and can change. Confirm current official information.",
    topics: [{ title: "Home loans", copy: "Test repayment changes, then add stamp duty, lender fees, insurance, rates, strata costs, and maintenance." }, { title: "Superannuation", copy: "Treat generic retirement projections separately from your fund's fees, insurance, asset mix, contributions, and preservation rules." }, { title: "Investing", copy: "Check licensing, diversification, costs, risk, liquidity, tax, and whether an offer is on an official warning list." }],
    resources: [{ label: "ASIC Moneysmart", url: "https://moneysmart.gov.au/", note: "Official calculators and guidance on money, debt, insurance, and investing." }, { label: "Australian Taxation Office — Super", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families", note: "Official superannuation information." }, { label: "Australian Prudential Regulation Authority — FCS", url: "https://www.apra.gov.au/financial-claims-scheme-0", note: "Financial Claims Scheme information." }],
    featured: ["mortgage-payment", "retirement-savings", "debt-to-income", "investment-return"],
  },
  {
    slug: "india", name: "India", flag: "IN", currency: "INR", currencyName: "Indian rupee",
    intro: "Explore loan, savings, and investment scenarios in rupees and use RBI and SEBI resources for current rules and investor education.",
    note: "Rates, taxes, product terms, eligibility, and regulation vary by product and provider. Use official disclosures and verify that intermediaries are registered.",
    topics: [{ title: "Loans and EMI", copy: "Compare the reducing-balance cost, processing fees, prepayment rules, insurance, floating-rate risk, and total repayment." }, { title: "Investing", copy: "Check registration, risk, expense ratios, exit loads, tax treatment, and product documents before committing money." }, { title: "Emergency savings", copy: "Size the reserve from essential monthly expenses and keep emergency money accessible rather than return-maximised." }],
    resources: [{ label: "Reserve Bank of India — Financial Education", url: "https://www.rbi.org.in/financialeducation/", note: "Official banking, borrowing, and fraud-awareness resources." }, { label: "SEBI Investor", url: "https://investor.sebi.gov.in/", note: "Investor education, calculators, and intermediary checks." }, { label: "DICGC", url: "https://www.dicgc.org.in/", note: "Official deposit-insurance information." }],
    featured: ["loan-payment", "mortgage-payment", "compound-interest", "savings-goal"],
  },
];

export function getCountry(slug: string) { return countries.find((country) => country.slug === slug); }
