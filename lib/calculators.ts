export type CalculatorCategory = "Borrowing" | "Saving" | "Investing" | "Planning";
export type FieldUnit = "currency" | "percent" | "years" | "months" | "hours" | "number";
export type ResultFormat = "currency" | "percent" | "months" | "years" | "number";

export type CalculatorField = {
  key: string;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  unit: FieldUnit;
  help?: string;
};

export type CalculatorSource = {
  label: string;
  url: string;
};

export type CalculatorConfig = {
  slug: string;
  title: string;
  shortTitle: string;
  category: CalculatorCategory;
  description: string;
  intro: string;
  outcome: string;
  formula: string;
  fields: CalculatorField[];
  assumptions: string[];
  steps: string[];
  faqs: Array<[string, string]>;
  sources: CalculatorSource[];
  related: string[];
  keywords: string[];
};

export type CalculatorResult = {
  headline: string;
  headlineValue: number;
  headlineFormat: ResultFormat;
  rows: Array<{ label: string; value: number; format: ResultFormat }>;
  insight: string;
  progress?: number;
  warning?: string;
};

const moneyField = (key: string, label: string, defaultValue: number, max = 2_000_000, step = 500): CalculatorField => ({
  key, label, defaultValue, min: 0, max, step, unit: "currency",
});
const rateField = (key: string, label: string, defaultValue: number, max = 40): CalculatorField => ({
  key, label, defaultValue, min: 0, max, step: 0.1, unit: "percent",
});
const yearField = (key: string, label: string, defaultValue: number, max = 50): CalculatorField => ({
  key, label, defaultValue, min: 1, max, step: 1, unit: "years",
});

const globalLoanSources: CalculatorSource[] = [
  { label: "U.S. Consumer Financial Protection Bureau — consumer credit guidance", url: "https://www.consumerfinance.gov/consumer-tools/" },
  { label: "Financial Consumer Agency of Canada — financial tools", url: "https://www.canada.ca/en/services/finance/tools.html" },
];
const investingSources: CalculatorSource[] = [
  { label: "SEC Investor.gov — compound interest calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  { label: "SEBI Investor — financial calculators", url: "https://investor.sebi.gov.in/calculators/index.html" },
];
const budgetingSources: CalculatorSource[] = [
  { label: "Financial Consumer Agency of Canada — making a budget", url: "https://www.canada.ca/en/financial-consumer-agency/services/make-budget.html" },
  { label: "ASIC Moneysmart — budgeting and money tools", url: "https://moneysmart.gov.au/budgeting" },
];

export const calculators: CalculatorConfig[] = [
  {
    slug: "loan-payment", title: "Loan payment calculator", shortTitle: "Loan payment", category: "Borrowing",
    description: "Estimate the monthly payment, lifetime interest, and total repayment for a fixed-rate loan.",
    intro: "A payment is only one part of a loan decision. This tool shows how principal, rate, and term work together so you can compare offers on the same basis.",
    outcome: "Use the monthly estimate to test affordability, then compare total repayment and fees in the lender's official disclosure.",
    formula: "Uses the standard fixed-rate amortization formula with monthly payments: P × [r(1+r)^n] ÷ [(1+r)^n−1].",
    fields: [moneyField("principal", "Loan amount", 25_000, 500_000, 500), rateField("rate", "Annual interest rate", 8.5), yearField("years", "Loan term", 5, 20)],
    assumptions: ["Fixed annual rate for the full term", "Twelve equal payments per year", "No origination fee, tax, penalty, or insurance included"],
    steps: ["Enter the amount you would actually borrow.", "Use the annual rate shown in the offer.", "Change the term to see the payment-versus-interest trade-off."],
    faqs: [["Does this include APR fees?", "No. Enter the contractual rate; compare APR and disclosed fees separately."], ["Why does a longer term cost more?", "The payment may fall, but interest is charged for more months."], ["Can I use this for any currency?", "Yes. Currency changes presentation, not the formula."]],
    sources: globalLoanSources, related: ["effective-interest-rate", "debt-to-income", "debt-payoff"], keywords: ["loan payment calculator", "monthly loan payment", "loan interest calculator"],
  },
  {
    slug: "mortgage-payment", title: "Mortgage payment calculator", shortTitle: "Mortgage", category: "Borrowing",
    description: "Estimate principal-and-interest mortgage payments from a home price, deposit, rate, and term.",
    intro: "A mortgage quote should be tested as both a monthly commitment and a lifetime cost. This calculator isolates principal and interest so country-specific taxes and insurance stay visible as separate decisions.",
    outcome: "Compare several terms and rates, then add local property tax, insurance, and lender fees before deciding what is affordable.",
    formula: "Subtracts the deposit from the purchase price, then applies the standard monthly amortization formula to the mortgage principal.",
    fields: [moneyField("homePrice", "Home price", 400_000, 3_000_000, 5_000), moneyField("downPayment", "Deposit / down payment", 80_000, 1_500_000, 5_000), rateField("rate", "Annual interest rate", 6.5, 20), yearField("years", "Mortgage term", 30, 40)],
    assumptions: ["Principal-and-interest repayment mortgage", "Fixed rate and monthly payments", "Excludes property tax, insurance, HOA/strata fees, and closing costs"],
    steps: ["Enter the expected purchase price.", "Add the cash deposit you plan to contribute.", "Test at least three rate scenarios before comparing lenders."],
    faqs: [["Does this show the full housing payment?", "No. It shows principal and interest; add local taxes, insurance, and property fees."], ["What if my mortgage rate can change?", "Use a higher-rate scenario to stress-test affordability."], ["Should I choose the lowest monthly payment?", "Not automatically. A longer term can produce much more lifetime interest."]],
    sources: [{ label: "CFPB — shopping for a mortgage", url: "https://www.consumerfinance.gov/consumer-tools/mortgages/shopping-for-a-mortgage/" }, { label: "ASIC Moneysmart — mortgage calculator", url: "https://moneysmart.gov.au/home-loans/mortgage-calculator" }], related: ["rent-affordability", "refinance-break-even", "debt-to-income"], keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment"],
  },
  {
    slug: "auto-loan", title: "Auto loan calculator", shortTitle: "Auto loan", category: "Borrowing",
    description: "Calculate an estimated car payment after a deposit and trade-in value.",
    intro: "Vehicle affordability depends on the financed price, not only the advertised purchase price. Separate your upfront contribution and trade-in from the balance that accrues interest.",
    outcome: "Use the result alongside insurance, registration, maintenance, and fuel or charging costs to build a full vehicle budget.",
    formula: "Financed balance = price − deposit − trade-in. The balance is then amortized with equal monthly payments.",
    fields: [moneyField("price", "Vehicle price", 35_000, 250_000, 500), moneyField("downPayment", "Cash deposit", 5_000, 100_000, 500), moneyField("tradeIn", "Trade-in value", 2_000, 100_000, 500), rateField("rate", "Annual interest rate", 7.5, 30), yearField("years", "Loan term", 5, 10)],
    assumptions: ["Trade-in value is applied fully to the purchase", "Fixed rate and monthly payments", "Excludes sales tax, registration, insurance, and dealer fees"],
    steps: ["Start with the all-in negotiated vehicle price where possible.", "Enter only confirmed trade-in value.", "Compare shorter terms before accepting a low-payment offer."],
    faqs: [["Are dealer fees included?", "No. Add them to the vehicle price if they will be financed."], ["Can the financed balance be negative?", "The calculator floors it at zero."], ["Why compare total interest?", "Long terms can hide a high total cost behind a smaller payment."]],
    sources: [{ label: "CFPB — auto loans", url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" }, ...globalLoanSources.slice(1)], related: ["loan-payment", "debt-to-income", "effective-interest-rate"], keywords: ["car loan calculator", "auto payment calculator", "vehicle finance calculator"],
  },
  {
    slug: "student-loan", title: "Student loan calculator", shortTitle: "Student loan", category: "Borrowing",
    description: "Estimate monthly repayments and interest for a standard fixed-payment education loan.",
    intro: "Education-loan rules differ widely, but the core repayment trade-off remains the same: a longer term usually lowers the payment while increasing total interest.",
    outcome: "Compare the estimate with the official repayment plan, grace period, subsidy, income-based option, and currency rules that apply to your loan.",
    formula: "Applies standard monthly amortization to the outstanding balance using the selected annual rate and repayment term.",
    fields: [moneyField("principal", "Outstanding balance", 30_000, 500_000, 500), rateField("rate", "Annual interest rate", 5.5, 25), yearField("years", "Repayment term", 10, 30)],
    assumptions: ["Repayment begins immediately", "Fixed rate and equal monthly payments", "No grace period, subsidy, forgiveness, or income-based cap"],
    steps: ["Use the balance at the start of repayment.", "Enter the contractual—not promotional—rate.", "Check the official plan for special repayment rules."],
    faqs: [["Does this model income-based repayment?", "No. Those rules depend on the specific country and program."], ["What about a grace period?", "Interest during a grace period is not included unless you add it to the starting balance."], ["Can I model extra payments?", "Use the debt payoff calculator for a custom monthly payment."]],
    sources: [{ label: "U.S. Federal Student Aid — loan simulator", url: "https://studentaid.gov/loan-simulator/" }, { label: "Reserve Bank of India — education loan FAQ", url: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=150" }], related: ["debt-payoff", "loan-payment", "budget-50-30-20"], keywords: ["student loan calculator", "education loan EMI", "student debt payment"],
  },
  {
    slug: "business-loan", title: "Business loan calculator", shortTitle: "Business loan", category: "Borrowing",
    description: "Estimate a business loan payment, upfront fee, and total financing cost.",
    intro: "A business loan should be evaluated against cash flow and the return the borrowed capital may create. Fees can materially change the effective cost.",
    outcome: "Compare the monthly obligation with conservative operating cash flow, then verify security, guarantees, fees, and early-repayment terms.",
    formula: "Amortizes the principal monthly and adds the selected origination fee as a separate upfront cost.",
    fields: [moneyField("principal", "Loan amount", 100_000, 2_000_000, 1_000), rateField("rate", "Annual interest rate", 9, 40), yearField("years", "Loan term", 5, 20), rateField("feeRate", "Origination fee", 2, 10)],
    assumptions: ["Fixed rate and equal monthly payments", "Fee is charged on original principal", "Excludes tax effects, collateral costs, and variable charges"],
    steps: ["Enter the net capital required by the business.", "Add the documented origination fee.", "Stress-test the payment against a weaker revenue month."],
    faqs: [["Is the fee financed?", "This result shows it separately. If financed, add it to principal."], ["Does this calculate business ROI?", "No. Use the ROI calculator to test the expected return."], ["What else should I compare?", "Security, personal guarantees, covenants, late fees, and prepayment rules."]],
    sources: globalLoanSources, related: ["roi", "loan-payment", "effective-interest-rate"], keywords: ["business loan calculator", "commercial loan payment", "business finance cost"],
  },
  {
    slug: "credit-card-payoff", title: "Credit card payoff calculator", shortTitle: "Card payoff", category: "Borrowing",
    description: "See how long a credit-card balance may take to clear with a fixed monthly payment.",
    intro: "Revolving balances become expensive when the payment barely exceeds monthly interest. A fixed payment plan makes the timeline and interest cost visible.",
    outcome: "If the payment does not reduce principal, raise it or contact the provider or a qualified debt adviser before the balance grows further.",
    formula: "Simulates monthly interest and a fixed payment until the balance reaches zero, up to a 100-year safety limit.",
    fields: [moneyField("balance", "Current balance", 8_000, 250_000, 100), rateField("rate", "Annual card rate", 22, 60), moneyField("payment", "Monthly payment", 300, 20_000, 25)],
    assumptions: ["No new spending", "Rate and payment remain constant", "Interest compounds monthly; fees are excluded"],
    steps: ["Use the latest statement balance and annual rate.", "Enter a payment you can repeat every month.", "Increase the payment to see the interest saved."],
    faqs: [["What if the tool says payment too low?", "Your payment does not cover the first month's interest, so the balance would not fall."], ["Does minimum payment work the same way?", "No. Minimum-payment formulas often change as the balance changes."], ["Can I include new purchases?", "No. This is a payoff plan assuming no new spending."]],
    sources: [{ label: "CFPB — credit cards", url: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" }, { label: "FCAC — credit card payment calculator", url: "https://itools-ioutils.fcac-acfc.gc.ca/CCPC-CPCC/CCPC-CPCC-eng.aspx" }], related: ["debt-payoff", "debt-to-income", "budget-50-30-20"], keywords: ["credit card payoff calculator", "card interest calculator", "debt free date"],
  },
  {
    slug: "debt-payoff", title: "Debt payoff calculator", shortTitle: "Debt payoff", category: "Borrowing",
    description: "Estimate a payoff date and total interest from a fixed balance, rate, and monthly payment.",
    intro: "A payoff plan becomes actionable when the monthly amount and finish line are explicit. This tool models one balance without new borrowing.",
    outcome: "Use the result as a baseline, then direct windfalls or extra monthly cash to shorten the schedule.",
    formula: "Simulates monthly interest followed by a fixed payment until the debt reaches zero.",
    fields: [moneyField("balance", "Debt balance", 20_000, 1_000_000, 250), rateField("rate", "Annual interest rate", 12, 50), moneyField("payment", "Monthly payment", 600, 50_000, 50)],
    assumptions: ["One fixed-rate balance", "No new borrowing or fees", "Payment is made once per month"],
    steps: ["Enter the current balance and rate.", "Choose a repeatable monthly payment.", "Test an extra-payment scenario before committing it to your budget."],
    faqs: [["Can I combine several debts?", "You can model the total only if a blended rate is meaningful; separate calculations are more accurate."], ["Which debt should I pay first?", "That depends on rates, minimums, and behavior. Compare avalanche and snowball strategies."], ["Why is the result an estimate?", "Daily interest, fees, and payment timing vary by provider."]],
    sources: globalLoanSources, related: ["credit-card-payoff", "budget-50-30-20", "debt-to-income"], keywords: ["debt payoff calculator", "debt free calculator", "payoff date calculator"],
  },
  {
    slug: "debt-to-income", title: "Debt-to-income ratio calculator", shortTitle: "Debt-to-income", category: "Borrowing",
    description: "Calculate the share of gross monthly income committed to recurring debt payments.",
    intro: "Debt-to-income ratio is a simple capacity indicator used by many lenders, but definitions and acceptable levels differ by product and country.",
    outcome: "Use the ratio as a conversation starter, not an approval prediction. Verify which debts and income sources a specific lender includes.",
    formula: "Monthly debt payments ÷ gross monthly income × 100.",
    fields: [moneyField("debtPayments", "Monthly debt payments", 1_200, 100_000, 50), moneyField("grossIncome", "Gross monthly income", 6_000, 250_000, 100)],
    assumptions: ["Uses gross income before tax", "Includes recurring debt, not all living costs", "Does not predict lender approval"],
    steps: ["Add required monthly debt payments.", "Use stable gross monthly income.", "Check the lender's exact DTI definition before applying."],
    faqs: [["Is rent included?", "Some underwriting systems treat housing separately. Follow the lender's definition."], ["What is a good DTI?", "There is no universal threshold; product and country rules differ."], ["Can irregular income be included?", "Only use income that a lender is likely to recognize and document."]],
    sources: [{ label: "CFPB — what is debt-to-income ratio?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" }], related: ["mortgage-payment", "loan-payment", "rent-affordability"], keywords: ["debt to income calculator", "DTI calculator", "loan affordability ratio"],
  },
  {
    slug: "refinance-break-even", title: "Refinance break-even calculator", shortTitle: "Refinance break-even", category: "Borrowing",
    description: "Estimate how long monthly savings may take to recover refinancing costs.",
    intro: "A lower payment is not automatically a better deal. Closing costs and a reset loan term can offset years of monthly savings.",
    outcome: "Compare the break-even period with how long you realistically expect to keep the loan or property.",
    formula: "Closing costs ÷ monthly payment savings.",
    fields: [moneyField("closingCosts", "Total refinancing costs", 6_000, 100_000, 100), moneyField("monthlySavings", "Expected monthly savings", 250, 10_000, 10)],
    assumptions: ["Monthly savings remain constant", "Excludes tax effects and opportunity cost", "Does not compare the remaining lifetime interest of both loans"],
    steps: ["Include every confirmed refinancing cost.", "Use net monthly savings after related charges.", "Compare break-even time with your expected holding period."],
    faqs: [["Is break-even enough to decide?", "No. Also compare term, lifetime interest, rate risk, and cash reserves."], ["What if costs are added to the new loan?", "They still have an economic cost and may also accrue interest."], ["Can savings change?", "Yes, especially with variable rates; test conservative savings."]],
    sources: [{ label: "CFPB — refinance considerations", url: "https://www.consumerfinance.gov/ask-cfpb/should-i-refinance-en-1667/" }], related: ["mortgage-payment", "effective-interest-rate", "loan-payment"], keywords: ["refinance break even calculator", "mortgage refinance calculator", "closing cost payback"],
  },
  {
    slug: "effective-interest-rate", title: "Effective interest rate calculator", shortTitle: "Effective rate", category: "Borrowing",
    description: "Convert a nominal annual rate and compounding frequency into an effective annual rate.",
    intro: "Two products with the same nominal rate can produce different outcomes when interest compounds at different frequencies.",
    outcome: "Use the effective rate for like-for-like comparison, while still checking fees and legally defined APR or comparison-rate disclosures.",
    formula: "Effective annual rate = (1 + nominal rate ÷ periods)^periods − 1.",
    fields: [rateField("nominalRate", "Nominal annual rate", 8, 100), { key: "periods", label: "Compounding periods per year", defaultValue: 12, min: 1, max: 365, step: 1, unit: "number" }],
    assumptions: ["Compounding periods are equal", "No fees or cash-flow timing differences", "Not a substitute for a jurisdiction's legal APR definition"],
    steps: ["Enter the quoted nominal rate.", "Choose the actual compounding frequency.", "Compare the resulting effective rate across products."],
    faqs: [["Is effective rate the same as APR?", "Not necessarily. Legal APR definitions may include fees and use prescribed methods."], ["What does monthly compounding mean?", "Interest is applied 12 times per year."], ["Can I compare savings and loans?", "Mathematically yes, but product disclosures and cash-flow timing still matter."]],
    sources: [{ label: "CFPB Regulation Z — APR calculations", url: "https://www.consumerfinance.gov/rules-policy/regulations/1026/" }], related: ["loan-payment", "compound-interest", "business-loan"], keywords: ["effective interest rate calculator", "nominal to effective rate", "EAR calculator"],
  },
  {
    slug: "compound-interest", title: "Compound interest calculator", shortTitle: "Compound interest", category: "Saving",
    description: "Project a balance from a starting amount, monthly contributions, return, and time.",
    intro: "Compounding lets returns build on earlier returns. Time and consistent contributions often matter more than small forecast changes.",
    outcome: "Test conservative, moderate, and optimistic return scenarios rather than relying on a single forecast.",
    formula: "Grows the initial balance monthly and treats regular contributions as end-of-month deposits.",
    fields: [moneyField("starting", "Starting balance", 10_000, 2_000_000, 500), moneyField("monthly", "Monthly contribution", 500, 50_000, 50), rateField("rate", "Expected annual return", 7, 25), yearField("years", "Time horizon", 10, 60)],
    assumptions: ["Monthly compounding", "Contributions at the end of each month", "Constant hypothetical return; fees and taxes excluded"],
    steps: ["Enter only money available to stay invested.", "Use a sustainable contribution.", "Run several return assumptions and compare the range."],
    faqs: [["Is the return guaranteed?", "No. It is a scenario input, not a prediction."], ["Are fees included?", "No. Reduce the expected return to model ongoing fees approximately."], ["When are contributions added?", "At the end of each month."]],
    sources: investingSources, related: ["savings-goal", "retirement-savings", "inflation"], keywords: ["compound interest calculator", "savings growth calculator", "investment compounding"],
  },
  {
    slug: "savings-goal", title: "Savings goal calculator", shortTitle: "Savings goal", category: "Saving",
    description: "Calculate the monthly contribution needed to reach a target by a chosen date.",
    intro: "A useful goal has a target, deadline, current balance, and repeatable contribution. This calculator connects all four.",
    outcome: "If the required amount is unrealistic, extend the deadline, adjust the target, or separate the goal into phases.",
    formula: "Grows the current balance monthly, then solves the future-value-of-an-annuity formula for the required contribution.",
    fields: [moneyField("current", "Current savings", 5_000, 2_000_000, 250), moneyField("goal", "Target amount", 50_000, 5_000_000, 1_000), rateField("rate", "Expected annual return", 4, 20), yearField("years", "Time to goal", 5, 50)],
    assumptions: ["Equal end-of-month contributions", "Constant return", "Target is not automatically adjusted for inflation, fees, or taxes"],
    steps: ["Define the full target including a safety margin.", "Enter current savings dedicated to this goal.", "Choose a realistic deadline and conservative return."],
    faqs: [["What if current savings already exceed the goal?", "The required monthly amount becomes zero."], ["Should I include inflation?", "For a future purchase, consider increasing the target with the inflation calculator."], ["Can I use a zero return?", "Yes. The tool then divides the remaining goal evenly across months."]],
    sources: investingSources, related: ["compound-interest", "emergency-fund", "inflation"], keywords: ["savings goal calculator", "monthly savings calculator", "save for a goal"],
  },
  {
    slug: "emergency-fund", title: "Emergency fund calculator", shortTitle: "Emergency fund", category: "Saving",
    description: "Build a cash-reserve target from essential monthly expenses and your chosen coverage period.",
    intro: "An emergency fund is a liquidity buffer, not an investment forecast. Its purpose is to protect essential spending when income or circumstances change unexpectedly.",
    outcome: "Choose a coverage period that reflects income stability, dependants, insurance, and access to other safe liquidity.",
    formula: "Target = essential monthly expenses × coverage months. Funding gap = target − current reserve.",
    fields: [moneyField("expenses", "Essential monthly expenses", 3_000, 100_000, 100), { key: "months", label: "Months of coverage", defaultValue: 6, min: 1, max: 24, step: 1, unit: "months" }, moneyField("current", "Current emergency savings", 5_000, 1_000_000, 250)],
    assumptions: ["Uses essential—not total—spending", "No investment return is assumed", "Does not replace suitable insurance"],
    steps: ["Add housing, food, utilities, transport, insurance, and minimum debt payments.", "Choose a coverage period based on your risk.", "Keep the reserve accessible and review it after major life changes."],
    faqs: [["How many months should I choose?", "There is no universal number. Consider job stability, dependants, health, and insurance."], ["Should the fund be invested?", "Emergency money usually prioritizes safety and access over return."], ["Do credit cards count as a fund?", "Borrowing capacity is not the same as owned cash and can disappear or become expensive."]],
    sources: [{ label: "CFPB — building an emergency savings fund", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" }, ...budgetingSources], related: ["budget-50-30-20", "savings-goal", "net-worth"], keywords: ["emergency fund calculator", "cash reserve calculator", "months of expenses"],
  },
  {
    slug: "retirement-savings", title: "Retirement savings calculator", shortTitle: "Retirement savings", category: "Saving",
    description: "Project a retirement balance from current savings, regular contributions, return, and years remaining.",
    intro: "A retirement projection is most useful as a range. Contributions, fees, inflation, tax rules, and market returns can all change over a long horizon.",
    outcome: "Compare the projected balance with a separate retirement-spending estimate and the public or employer benefits available in your country.",
    formula: "Combines compound growth of the current balance with the future value of monthly end-of-period contributions.",
    fields: [moneyField("current", "Current retirement savings", 50_000, 5_000_000, 1_000), moneyField("monthly", "Monthly contribution", 800, 50_000, 50), rateField("rate", "Expected annual return", 6, 20), yearField("years", "Years until retirement", 25, 60)],
    assumptions: ["Monthly compounding and contributions", "Constant nominal return", "Excludes inflation, taxes, employer matching, and withdrawal rules"],
    steps: ["Use the latest retirement-account balances.", "Include only regular contributions you expect to sustain.", "Run a lower-return scenario and compare with your target income."],
    faqs: [["Does this include state pension or Social Security?", "No. Add public benefits separately using official government estimates."], ["Is the result inflation-adjusted?", "No. Use the inflation calculator or a real return assumption."], ["What about employer matching?", "Add the expected match to your monthly contribution if it is reliable."]],
    sources: investingSources, related: ["fire-number", "compound-interest", "inflation"], keywords: ["retirement calculator", "retirement savings projection", "pension calculator"],
  },
  {
    slug: "budget-50-30-20", title: "50/30/20 budget calculator", shortTitle: "50/30/20 budget", category: "Planning",
    description: "Split monthly take-home income into needs, wants, and savings or debt goals.",
    intro: "The 50/30/20 framework is a starting point, not a rule. High housing costs, dependants, or aggressive debt repayment may require a different split.",
    outcome: "Use the targets to spot trade-offs, then replace them with a budget based on your real obligations and priorities.",
    formula: "Needs = 50%, wants = 30%, and saving or extra debt repayment = 20% of take-home income.",
    fields: [moneyField("income", "Monthly take-home income", 5_000, 250_000, 100)],
    assumptions: ["Income is after tax and payroll deductions", "Percentages are guidance, not eligibility or advice", "Minimum debt payments belong within essential commitments"],
    steps: ["Use dependable net monthly income.", "Compare the guide with actual spending.", "Adjust the categories to protect essentials and priority goals."],
    faqs: [["What counts as a need?", "Essential housing, food, utilities, transport, insurance, and required minimum payments."], ["What if needs exceed 50%?", "Use actual numbers; the framework should reveal pressure, not create shame."], ["Where do extra debt payments go?", "They can be treated as the 20% future-goals allocation."]],
    sources: budgetingSources, related: ["emergency-fund", "debt-payoff", "net-worth"], keywords: ["50 30 20 calculator", "budget calculator", "monthly budget planner"],
  },
  {
    slug: "net-worth", title: "Net worth calculator", shortTitle: "Net worth", category: "Planning",
    description: "Calculate net worth from total assets and total liabilities.",
    intro: "Net worth is a snapshot of what you own minus what you owe. Tracking the same definition over time matters more than comparing it with someone else.",
    outcome: "Update the snapshot periodically and focus on the drivers: saving, debt reduction, asset values, and concentration risk.",
    formula: "Net worth = total assets − total liabilities.",
    fields: [moneyField("assets", "Total assets", 250_000, 20_000_000, 1_000), moneyField("liabilities", "Total debts and liabilities", 120_000, 20_000_000, 1_000)],
    assumptions: ["Asset values are current reasonable estimates", "All outstanding liabilities are included", "Does not assess liquidity, tax, ownership shares, or asset risk"],
    steps: ["List cash, investments, property, business interests, and other assets consistently.", "Add every debt and obligation.", "Track the same method quarterly or annually."],
    faqs: [["Should I include my home?", "You can, if you also include the related mortgage and use a reasonable current value."], ["What if net worth is negative?", "It is a starting snapshot, not a judgment; focus on cash flow and high-cost debt."], ["Should pensions be included?", "Only if you can estimate a meaningful current value consistently."]],
    sources: [{ label: "SEBI Investor — net worth tools", url: "https://investor.sebi.gov.in/calculators/index.html" }, ...budgetingSources], related: ["budget-50-30-20", "debt-payoff", "retirement-savings"], keywords: ["net worth calculator", "assets minus liabilities", "personal balance sheet"],
  },
  {
    slug: "inflation", title: "Inflation calculator", shortTitle: "Inflation", category: "Planning",
    description: "Estimate a future price and the future purchasing power of today's money.",
    intro: "Inflation changes what a currency amount can buy. Long-term goals should be tested in both nominal and inflation-adjusted terms.",
    outcome: "Use a range of inflation assumptions and update the plan as actual prices and official inflation data change.",
    formula: "Future cost = present cost × (1 + inflation rate)^years. Purchasing power applies the inverse factor.",
    fields: [moneyField("amount", "Amount today", 10_000, 10_000_000, 500), rateField("rate", "Annual inflation assumption", 3, 30), yearField("years", "Years", 10, 60)],
    assumptions: ["Constant annual inflation", "Represents a broad price-level scenario", "Your personal spending basket may change differently"],
    steps: ["Enter the cost or savings amount in today's money.", "Use a conservative range, not one forecast.", "Revisit the target when official data or your spending changes."],
    faqs: [["Is this a forecast?", "No. The rate is your scenario assumption."], ["Why might my costs rise faster?", "Personal spending can differ from the official consumer-price basket."], ["Can I use this for retirement?", "Yes, to translate future nominal amounts into approximate today's purchasing power."]],
    sources: [{ label: "U.S. Bureau of Labor Statistics — CPI inflation calculator", url: "https://www.bls.gov/data/inflation_calculator.htm" }, { label: "Bank of England — inflation calculator", url: "https://www.bankofengland.co.uk/monetary-policy/inflation/inflation-calculator" }], related: ["real-investment-return", "retirement-savings", "savings-goal"], keywords: ["inflation calculator", "future cost calculator", "purchasing power calculator"],
  },
  {
    slug: "rent-affordability", title: "Rent affordability calculator", shortTitle: "Rent affordability", category: "Planning",
    description: "Estimate a rent ceiling from gross income, an affordability ratio, and recurring monthly debt.",
    intro: "A rent ratio is a planning screen, not a guarantee. Utilities, transport, deposits, taxes, insurance, and local market conditions can change what is sustainable.",
    outcome: "Compare the estimate with a complete after-tax budget and keep room for irregular expenses and savings.",
    formula: "Suggested rent ceiling = gross monthly income × selected ratio − monthly debt payments, floored at zero.",
    fields: [moneyField("grossIncome", "Gross monthly income", 6_000, 250_000, 100), rateField("ratio", "Housing ratio", 30, 60), moneyField("monthlyDebt", "Monthly debt payments", 500, 100_000, 50)],
    assumptions: ["Uses gross income", "Ratio is user-selected guidance", "Excludes utilities, deposits, moving costs, and local qualification rules"],
    steps: ["Use dependable gross monthly income.", "Choose a ratio that reflects local costs and your goals.", "Subtract debt and test the result in an after-tax budget."],
    faqs: [["Is 30% always affordable?", "No. It is a common reference point, not a universal rule."], ["Why subtract debt?", "Recurring debt reduces cash available for housing and other needs."], ["Will a landlord use this result?", "Not necessarily. Screening rules differ by property and country."]],
    sources: budgetingSources, related: ["budget-50-30-20", "debt-to-income", "mortgage-payment"], keywords: ["rent affordability calculator", "how much rent can I afford", "housing ratio"],
  },
  {
    slug: "freelance-rate", title: "Freelance hourly rate calculator", shortTitle: "Freelance rate", category: "Planning",
    description: "Turn a desired take-home income, business costs, tax reserve, and billable hours into a target rate.",
    intro: "A sustainable freelance rate must cover unpaid work, business expenses, taxes, leave, and the income you want to keep.",
    outcome: "Use the result as a floor for pricing, then adjust for expertise, demand, project risk, currency, and client value.",
    formula: "Required gross revenue = (desired take-home + annual costs) ÷ (1 − tax reserve). Hourly rate = revenue ÷ annual billable hours.",
    fields: [moneyField("income", "Desired annual take-home", 70_000, 2_000_000, 1_000), moneyField("costs", "Annual business costs", 12_000, 1_000_000, 500), rateField("taxRate", "Tax reserve", 25, 70), { key: "hours", label: "Annual billable hours", defaultValue: 1_200, min: 100, max: 3_000, step: 25, unit: "hours" }],
    assumptions: ["Tax reserve is a planning estimate, not tax advice", "Billable hours exclude administration and unpaid work", "Does not include profit margin beyond desired take-home"],
    steps: ["Set a realistic after-tax income goal.", "Include software, insurance, equipment, marketing, and professional costs.", "Estimate billable—not total working—hours conservatively."],
    faqs: [["Why are billable hours lower than work hours?", "Sales, administration, learning, leave, and gaps are usually unpaid."], ["Is the tax reserve accurate?", "It is your buffer; confirm local tax with a qualified adviser."], ["Should every client pay the same rate?", "Not necessarily. Scope, risk, urgency, and value can justify different pricing."]],
    sources: budgetingSources, related: ["budget-50-30-20", "emergency-fund", "roi"], keywords: ["freelance rate calculator", "consulting hourly rate", "self employed pricing"],
  },
  {
    slug: "investment-return", title: "Investment return calculator", shortTitle: "Investment return", category: "Investing",
    description: "Calculate profit and simple return on investment from an initial amount and ending value.",
    intro: "Simple return shows the gain relative to invested capital. It does not account for how long the investment was held or the timing of cash flows.",
    outcome: "Use CAGR for multi-year annualized comparison and include fees, taxes, and additional contributions before comparing products.",
    formula: "Profit = ending value − initial amount. ROI = profit ÷ initial amount × 100.",
    fields: [moneyField("initial", "Initial investment", 10_000, 10_000_000, 500), moneyField("ending", "Ending value", 13_500, 20_000_000, 500)],
    assumptions: ["No interim contributions or withdrawals", "No fees or taxes", "Simple return, not annualized return"],
    steps: ["Use the actual cash initially invested.", "Enter the value after costs where possible.", "Use CAGR if the holding period spans several years."],
    faqs: [["Is ROI annualized?", "No. It is the total return for the full holding period."], ["What about dividends?", "Add cash distributions to ending value if they are not already included."], ["Can ROI be negative?", "Yes, when the ending value is below the initial investment."]],
    sources: investingSources, related: ["cagr", "real-investment-return", "dividend-yield"], keywords: ["ROI calculator", "investment return calculator", "profit percentage calculator"],
  },
  {
    slug: "cagr", title: "CAGR calculator", shortTitle: "CAGR", category: "Investing",
    description: "Calculate the annualized growth rate between a starting and ending value.",
    intro: "Compound annual growth rate smooths a multi-year change into one annual rate. It is useful for comparison but hides volatility along the path.",
    outcome: "Use CAGR with drawdown, volatility, fees, and cash-flow information before judging investment quality.",
    formula: "CAGR = (ending value ÷ starting value)^(1 ÷ years) − 1.",
    fields: [moneyField("starting", "Starting value", 10_000, 10_000_000, 500), moneyField("ending", "Ending value", 18_000, 20_000_000, 500), yearField("years", "Holding period", 5, 60)],
    assumptions: ["No external cash flows", "Values are measured consistently", "Smooth annual rate does not show year-to-year risk"],
    steps: ["Enter comparable beginning and ending values.", "Use the exact holding period.", "Compare only investments measured on a consistent basis."],
    faqs: [["Does CAGR show volatility?", "No. Very different paths can have the same CAGR."], ["Can I use it with monthly contributions?", "Not accurately; cash-flow-aware return methods are needed."], ["Is CAGR guaranteed going forward?", "No. It describes a past or assumed period."]],
    sources: investingSources, related: ["investment-return", "real-investment-return", "compound-interest"], keywords: ["CAGR calculator", "annualized return calculator", "compound annual growth rate"],
  },
  {
    slug: "real-investment-return", title: "Real investment return calculator", shortTitle: "Real return", category: "Investing",
    description: "Estimate an inflation-adjusted return from a nominal return and inflation rate.",
    intro: "Nominal growth tells you how many currency units you gained; real growth estimates how purchasing power changed.",
    outcome: "Use real return for long-term planning, while remembering that personal inflation and investment fees may differ.",
    formula: "Real return = (1 + nominal return) ÷ (1 + inflation) − 1.",
    fields: [rateField("nominal", "Nominal annual return", 8, 100), rateField("inflation", "Annual inflation", 3, 50)],
    assumptions: ["Both rates cover the same period", "Inflation is represented by one broad rate", "Investment fees and taxes are excluded"],
    steps: ["Enter the investment's nominal annual return.", "Use a matching annual inflation measure or scenario.", "Reduce the result further for fees and taxes where relevant."],
    faqs: [["Why not simply subtract inflation?", "Subtraction is an approximation; the ratio formula is mathematically precise."], ["Can real return be negative?", "Yes, when purchasing power falls despite nominal growth."], ["Which inflation rate should I use?", "Use an official measure or a conservative scenario relevant to your spending."]],
    sources: [{ label: "U.S. Bureau of Labor Statistics — CPI", url: "https://www.bls.gov/cpi/" }, ...investingSources], related: ["inflation", "cagr", "retirement-savings"], keywords: ["real return calculator", "inflation adjusted return", "nominal vs real return"],
  },
  {
    slug: "dividend-yield", title: "Dividend yield calculator", shortTitle: "Dividend yield", category: "Investing",
    description: "Calculate indicated dividend yield and annual dividend income from a share price and holding.",
    intro: "Dividend yield relates expected annual distributions to the current share price. A high yield can reflect high income, a falling price, or an unsustainable distribution.",
    outcome: "Evaluate payout sustainability, business quality, taxes, currency, and total return—not yield alone.",
    formula: "Dividend yield = annual dividend per share ÷ share price. Annual income = dividend per share × shares held.",
    fields: [moneyField("dividend", "Annual dividend per share", 2.4, 10_000, 0.01), moneyField("sharePrice", "Current share price", 60, 1_000_000, 0.1), { key: "shares", label: "Number of shares", defaultValue: 100, min: 0, max: 10_000_000, step: 1, unit: "number" }],
    assumptions: ["Dividend remains unchanged", "Uses current share price", "Excludes tax, fees, withholding, and currency effects"],
    steps: ["Use the currently indicated annual dividend.", "Enter the current market price in the same currency.", "Check the issuer's distribution history and coverage."],
    faqs: [["Is a high yield always better?", "No. It may signal elevated risk or a dividend that could be cut."], ["Does this include price growth?", "No. Yield is only one component of total return."], ["What about quarterly dividends?", "Add the expected payments to get annual dividend per share."]],
    sources: [{ label: "SEC Investor.gov — stocks and dividends", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks" }, ...investingSources.slice(1)], related: ["investment-return", "cagr", "real-investment-return"], keywords: ["dividend yield calculator", "dividend income calculator", "stock yield"],
  },
  {
    slug: "fire-number", title: "Financial independence number calculator", shortTitle: "FIRE number", category: "Investing",
    description: "Estimate a portfolio target from annual spending and a chosen withdrawal-rate assumption.",
    intro: "A financial-independence number is a planning shorthand, not a guarantee. Longevity, taxes, sequence risk, inflation, fees, and changing spending can materially alter the result.",
    outcome: "Test several spending and withdrawal scenarios and seek regulated advice before relying on a portfolio for long-term income.",
    formula: "Target portfolio = annual spending ÷ withdrawal-rate assumption.",
    fields: [moneyField("spending", "Expected annual spending", 48_000, 2_000_000, 1_000), rateField("withdrawalRate", "Withdrawal-rate assumption", 4, 10)],
    assumptions: ["Spending is expressed in today's money", "Withdrawal rate is a user-selected scenario", "Excludes pensions, taxes, fees, and sequence-of-returns risk"],
    steps: ["Estimate sustainable annual spending.", "Test more than one withdrawal rate.", "Subtract reliable external income only after confirming its timing and terms."],
    faqs: [["Is 4% guaranteed?", "No. Any withdrawal rate can fail under some market, inflation, fee, or longevity outcomes."], ["Should I include a pension?", "Model reliable pension income separately and consider its start date."], ["What if spending changes?", "Run several phases or use the higher recurring-spending scenario."]],
    sources: investingSources, related: ["retirement-savings", "inflation", "real-investment-return"], keywords: ["FIRE calculator", "financial independence number", "retirement portfolio target"],
  },
];

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const months = Math.max(1, years * 12);
  const rate = annualRate / 100 / 12;
  if (!rate) return principal / months;
  return principal * (rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);
}

function compoundValue(starting: number, monthly: number, annualRate: number, years: number) {
  const periods = Math.max(1, years * 12);
  const rate = annualRate / 100 / 12;
  const grownStart = starting * (1 + rate) ** periods;
  const grownContributions = rate ? monthly * (((1 + rate) ** periods - 1) / rate) : monthly * periods;
  return grownStart + grownContributions;
}

function payoff(balance: number, annualRate: number, monthlyPaymentAmount: number) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyPaymentAmount <= balance * monthlyRate && balance > 0) return { months: 0, interest: 0, impossible: true };
  let remaining = balance;
  let interest = 0;
  let months = 0;
  while (remaining > 0.005 && months < 1_200) {
    const charge = remaining * monthlyRate;
    interest += charge;
    remaining = Math.max(0, remaining + charge - monthlyPaymentAmount);
    months += 1;
  }
  return { months, interest, impossible: remaining > 0.005 };
}

export function getCalculator(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}

export function calculate(slug: string, v: Record<string, number>): CalculatorResult {
  const currencyRow = (label: string, value: number) => ({ label, value, format: "currency" as const });
  const percentRow = (label: string, value: number) => ({ label, value, format: "percent" as const });

  if (["loan-payment", "student-loan"].includes(slug)) {
    const monthly = monthlyPayment(v.principal, v.rate, v.years);
    const total = monthly * v.years * 12;
    return { headline: "Estimated monthly payment", headlineValue: monthly, headlineFormat: "currency", rows: [currencyRow("Principal", v.principal), currencyRow("Total interest", total - v.principal), currencyRow("Total repayment", total)], insight: "A shorter term usually raises the payment but reduces lifetime interest.", progress: total ? v.principal / total * 100 : 100 };
  }
  if (slug === "mortgage-payment") {
    const principal = Math.max(0, v.homePrice - v.downPayment);
    const monthly = monthlyPayment(principal, v.rate, v.years);
    const total = monthly * v.years * 12;
    return { headline: "Principal & interest payment", headlineValue: monthly, headlineFormat: "currency", rows: [currencyRow("Mortgage principal", principal), currencyRow("Deposit", v.downPayment), currencyRow("Lifetime interest", total - principal)], insight: "Add local property tax, insurance, and property fees to estimate the full housing payment.", progress: v.homePrice ? v.downPayment / v.homePrice * 100 : 0 };
  }
  if (slug === "auto-loan") {
    const principal = Math.max(0, v.price - v.downPayment - v.tradeIn);
    const monthly = monthlyPayment(principal, v.rate, v.years);
    const total = monthly * v.years * 12;
    return { headline: "Estimated car payment", headlineValue: monthly, headlineFormat: "currency", rows: [currencyRow("Amount financed", principal), currencyRow("Total interest", total - principal), currencyRow("Total loan payments", total)], insight: "Compare this with the full ownership budget, including insurance, registration, maintenance, and energy.", progress: v.price ? (v.downPayment + v.tradeIn) / v.price * 100 : 0 };
  }
  if (slug === "business-loan") {
    const monthly = monthlyPayment(v.principal, v.rate, v.years);
    const total = monthly * v.years * 12;
    const fee = v.principal * v.feeRate / 100;
    return { headline: "Estimated monthly payment", headlineValue: monthly, headlineFormat: "currency", rows: [currencyRow("Origination fee", fee), currencyRow("Interest cost", total - v.principal), currencyRow("Total financing cost", total + fee - v.principal)], insight: "Test the payment against conservative cash flow, not only an average month.", progress: total ? v.principal / total * 100 : 100 };
  }
  if (["credit-card-payoff", "debt-payoff"].includes(slug)) {
    const p = payoff(v.balance, v.rate, v.payment);
    if (p.impossible) return { headline: "Payment is too low", headlineValue: 0, headlineFormat: "months", rows: [currencyRow("First-month interest", v.balance * v.rate / 100 / 12), currencyRow("Your payment", v.payment)], insight: "Increase the payment above monthly interest so the balance can begin to fall.", warning: "At this payment, the balance would not be repaid within the model." };
    return { headline: "Estimated time to debt-free", headlineValue: p.months, headlineFormat: "months", rows: [currencyRow("Starting balance", v.balance), currencyRow("Estimated interest", p.interest), currencyRow("Estimated total paid", v.balance + p.interest)], insight: "Even a modest repeatable extra payment can materially shorten the payoff period.", progress: Math.min(100, 120 / Math.max(1, p.months) * 100) };
  }
  if (slug === "debt-to-income") {
    const ratio = v.grossIncome ? v.debtPayments / v.grossIncome * 100 : 0;
    return { headline: "Debt-to-income ratio", headlineValue: ratio, headlineFormat: "percent", rows: [currencyRow("Monthly debt", v.debtPayments), currencyRow("Gross monthly income", v.grossIncome), currencyRow("Income after listed debt", Math.max(0, v.grossIncome - v.debtPayments))], insight: "Lenders use different definitions and thresholds, so confirm the specific underwriting method.", progress: ratio };
  }
  if (slug === "refinance-break-even") {
    const months = v.monthlySavings ? v.closingCosts / v.monthlySavings : 0;
    return { headline: "Estimated break-even time", headlineValue: months, headlineFormat: "months", rows: [currencyRow("Refinancing costs", v.closingCosts), currencyRow("Monthly savings", v.monthlySavings), { label: "Approximate years", value: months / 12, format: "years" }], insight: "A refinance is harder to justify if you expect to exit before this break-even point.", progress: Math.min(100, 60 / Math.max(1, months) * 100) };
  }
  if (slug === "effective-interest-rate") {
    const effective = ((1 + v.nominalRate / 100 / Math.max(1, v.periods)) ** Math.max(1, v.periods) - 1) * 100;
    return { headline: "Effective annual rate", headlineValue: effective, headlineFormat: "percent", rows: [percentRow("Nominal annual rate", v.nominalRate), { label: "Compounding periods", value: v.periods, format: "number" }, percentRow("Compounding uplift", effective - v.nominalRate)], insight: "Compare effective rates on the same basis, then review fees and legal APR disclosures separately.", progress: Math.min(100, effective) };
  }
  if (["compound-interest", "retirement-savings"].includes(slug)) {
    const starting = slug === "compound-interest" ? v.starting : v.current;
    const total = compoundValue(starting, v.monthly, v.rate, v.years);
    const contributed = starting + v.monthly * v.years * 12;
    return { headline: slug === "retirement-savings" ? "Projected retirement balance" : "Projected future balance", headlineValue: total, headlineFormat: "currency", rows: [currencyRow("Your contributions", contributed), currencyRow("Estimated growth", Math.max(0, total - contributed)), currencyRow("Projected total", total)], insight: "The return is a scenario, not a promise. Compare a lower-return case before relying on the result.", progress: total ? contributed / total * 100 : 100 };
  }
  if (slug === "savings-goal") {
    const months = v.years * 12;
    const rate = v.rate / 100 / 12;
    const grownCurrent = v.current * (1 + rate) ** months;
    const factor = rate ? ((1 + rate) ** months - 1) / rate : months;
    const required = Math.max(0, (v.goal - grownCurrent) / Math.max(1, factor));
    return { headline: "Required monthly contribution", headlineValue: required, headlineFormat: "currency", rows: [currencyRow("Current savings", v.current), currencyRow("Target", v.goal), currencyRow("Total future contributions", required * months)], insight: required ? "Automate a repeatable amount and review the target at least annually." : "Your current balance is projected to meet or exceed the selected goal.", progress: v.goal ? Math.min(100, grownCurrent / v.goal * 100) : 100 };
  }
  if (slug === "emergency-fund") {
    const target = v.expenses * v.months;
    const gap = Math.max(0, target - v.current);
    return { headline: "Emergency fund target", headlineValue: target, headlineFormat: "currency", rows: [currencyRow("Current reserve", v.current), currencyRow("Funding gap", gap), { label: "Coverage today", value: v.expenses ? v.current / v.expenses : 0, format: "months" }], insight: gap ? "Build the gap in stages while keeping emergency money safe and accessible." : "Your current reserve meets or exceeds this selected coverage target.", progress: target ? v.current / target * 100 : 100 };
  }
  if (slug === "budget-50-30-20") {
    return { headline: "Suggested future-goals allocation", headlineValue: v.income * .2, headlineFormat: "currency", rows: [currencyRow("Needs — 50%", v.income * .5), currencyRow("Wants — 30%", v.income * .3), currencyRow("Saving / extra debt — 20%", v.income * .2)], insight: "Treat these as reference points and build the final budget from your real obligations.", progress: 20 };
  }
  if (slug === "net-worth") {
    const net = v.assets - v.liabilities;
    return { headline: "Estimated net worth", headlineValue: net, headlineFormat: "currency", rows: [currencyRow("Total assets", v.assets), currencyRow("Total liabilities", v.liabilities), percentRow("Debt as share of assets", v.assets ? v.liabilities / v.assets * 100 : 0)], insight: "Track the same definition over time; direction is more useful than comparison with others.", progress: v.assets ? Math.max(0, net / v.assets * 100) : 0 };
  }
  if (slug === "inflation") {
    const factor = (1 + v.rate / 100) ** v.years;
    return { headline: "Estimated future cost", headlineValue: v.amount * factor, headlineFormat: "currency", rows: [currencyRow("Amount today", v.amount), currencyRow("Price increase", v.amount * factor - v.amount), currencyRow("Future purchasing power of today's amount", v.amount / factor)], insight: "This is a constant-rate scenario; your personal cost basket can change differently.", progress: Math.min(100, (factor - 1) * 100) };
  }
  if (slug === "rent-affordability") {
    const ceiling = Math.max(0, v.grossIncome * v.ratio / 100 - v.monthlyDebt);
    return { headline: "Planning rent ceiling", headlineValue: ceiling, headlineFormat: "currency", rows: [currencyRow("Gross monthly income", v.grossIncome), currencyRow("Debt adjustment", v.monthlyDebt), percentRow("Selected housing ratio", v.ratio)], insight: "Verify this ceiling in an after-tax budget that includes utilities, deposits, and irregular costs.", progress: v.ratio };
  }
  if (slug === "freelance-rate") {
    const retainedShare = Math.max(.01, 1 - v.taxRate / 100);
    const revenue = (v.income + v.costs) / retainedShare;
    const hourly = revenue / Math.max(1, v.hours);
    return { headline: "Target hourly rate", headlineValue: hourly, headlineFormat: "currency", rows: [currencyRow("Required annual revenue", revenue), currencyRow("Business costs", v.costs), currencyRow("Target take-home", v.income)], insight: "Use this as a sustainable floor, then adjust for scope, value, urgency, and market demand.", progress: v.taxRate };
  }
  if (slug === "investment-return") {
    const profit = v.ending - v.initial;
    const roi = v.initial ? profit / v.initial * 100 : 0;
    return { headline: "Simple return on investment", headlineValue: roi, headlineFormat: "percent", rows: [currencyRow("Profit / loss", profit), currencyRow("Initial investment", v.initial), currencyRow("Ending value", v.ending)], insight: "Simple ROI does not account for time. Use CAGR for multi-year annualized comparison.", progress: Math.max(0, roi) };
  }
  if (slug === "cagr") {
    const cagr = v.starting > 0 && v.ending >= 0 ? ((v.ending / v.starting) ** (1 / Math.max(1, v.years)) - 1) * 100 : 0;
    return { headline: "Compound annual growth rate", headlineValue: cagr, headlineFormat: "percent", rows: [currencyRow("Starting value", v.starting), currencyRow("Ending value", v.ending), { label: "Holding period", value: v.years, format: "years" }], insight: "CAGR smooths the path and does not show volatility, drawdowns, or interim cash flows.", progress: Math.max(0, cagr) };
  }
  if (slug === "real-investment-return") {
    const real = ((1 + v.nominal / 100) / (1 + v.inflation / 100) - 1) * 100;
    return { headline: "Inflation-adjusted return", headlineValue: real, headlineFormat: "percent", rows: [percentRow("Nominal return", v.nominal), percentRow("Inflation", v.inflation), percentRow("Purchasing-power change", real)], insight: "Fees and taxes can reduce the real return further.", progress: Math.max(0, real) };
  }
  if (slug === "dividend-yield") {
    const yieldRate = v.sharePrice ? v.dividend / v.sharePrice * 100 : 0;
    return { headline: "Indicated dividend yield", headlineValue: yieldRate, headlineFormat: "percent", rows: [currencyRow("Estimated annual income", v.dividend * v.shares), currencyRow("Position market value", v.sharePrice * v.shares), currencyRow("Dividend per share", v.dividend)], insight: "Yield can change when the price or distribution changes; assess sustainability and total return.", progress: Math.min(100, yieldRate) };
  }
  if (slug === "fire-number") {
    const target = v.withdrawalRate ? v.spending / (v.withdrawalRate / 100) : 0;
    return { headline: "Planning portfolio target", headlineValue: target, headlineFormat: "currency", rows: [currencyRow("Annual spending", v.spending), percentRow("Withdrawal assumption", v.withdrawalRate), { label: "Spending multiple", value: v.withdrawalRate ? 100 / v.withdrawalRate : 0, format: "number" }], insight: "This is a planning shorthand, not a safe or guaranteed withdrawal promise.", progress: v.withdrawalRate };
  }
  return { headline: "Estimate", headlineValue: 0, headlineFormat: "number", rows: [], insight: "Adjust the inputs to explore a scenario." };
}

export const calculatorCategories: CalculatorCategory[] = ["Borrowing", "Saving", "Investing", "Planning"];
