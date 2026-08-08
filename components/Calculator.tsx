"use client";

import { useMemo, useState } from "react";

export type ToolId = "loan" | "mortgage" | "interest" | "savings" | "investment";

type Currency = {
  code: string;
  symbol: string;
  locale: string;
};

const currencies: Currency[] = [
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
  { code: "CAD", symbol: "C$", locale: "en-CA" },
  { code: "AUD", symbol: "A$", locale: "en-AU" },
  { code: "INR", symbol: "₹", locale: "en-IN" },
  { code: "JPY", symbol: "¥", locale: "ja-JP" },
  { code: "AED", symbol: "د.إ", locale: "en-AE" },
];

const tools: { id: ToolId; label: string; short: string }[] = [
  { id: "loan", label: "Loan", short: "LN" },
  { id: "mortgage", label: "Mortgage", short: "MT" },
  { id: "interest", label: "Compound interest", short: "CI" },
  { id: "savings", label: "Savings goal", short: "SG" },
  { id: "investment", label: "Investment return", short: "IR" },
];

function payment(principal: number, annualRate: number, years: number) {
  const months = Math.max(1, years * 12);
  const rate = annualRate / 100 / 12;
  if (!rate) return principal / months;
  return principal * (rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);
}

function Field({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const safeChange = (raw: string) => {
    const next = Number(raw);
    if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)));
  };

  return (
    <label className="calc-field">
      <span>{label}</span>
      <span className="number-wrap">
        <input
          aria-label={label}
          className="number-input"
          type="number"
          min={min}
          max={max}
          step={step}
          inputMode="decimal"
          value={value}
          onChange={(event) => safeChange(event.target.value)}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </span>
      <input
        aria-label={`${label} slider`}
        className="range-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(event) => safeChange(event.target.value)}
      />
      <span className="range-labels"><span>{min.toLocaleString()}</span><span>{max.toLocaleString()}</span></span>
    </label>
  );
}

export function Calculator({ defaultTool = "loan" }: { defaultTool?: ToolId }) {
  const [tool, setTool] = useState<ToolId>(defaultTool);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [amount, setAmount] = useState(defaultTool === "mortgage" ? 400000 : 25000);
  const [rate, setRate] = useState(defaultTool === "mortgage" ? 6.5 : 8.5);
  const [years, setYears] = useState(defaultTool === "mortgage" ? 30 : 5);
  const [deposit, setDeposit] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [goal, setGoal] = useState(50000);
  const [copyStatus, setCopyStatus] = useState("Copy result");

  const currency = currencies.find((item) => item.code === currencyCode) ?? currencies[0];
  const money = (value: number, digits = 0) => new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

  const result = useMemo(() => {
    if (tool === "loan" || tool === "mortgage") {
      const monthlyPayment = payment(amount, rate, years);
      const total = monthlyPayment * years * 12;
      return {
        hero: monthlyPayment,
        heroLabel: "Estimated monthly payment",
        rows: [
          ["Principal", amount],
          ["Total interest", Math.max(0, total - amount)],
          ["Total repayment", total],
        ],
        percent: total ? (amount / total) * 100 : 100,
      };
    }

    if (tool === "interest" || tool === "investment") {
      const monthlyRate = rate / 100 / 12;
      const months = years * 12;
      const initialGrowth = deposit * (1 + monthlyRate) ** months;
      const contributionGrowth = monthlyRate
        ? monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate)
        : monthly * months;
      const total = initialGrowth + contributionGrowth;
      const contributed = deposit + monthly * months;
      return {
        hero: total,
        heroLabel: tool === "investment" ? "Projected portfolio value" : "Future balance",
        rows: [
          ["Your contributions", contributed],
          ["Estimated growth", Math.max(0, total - contributed)],
          ["Total balance", total],
        ],
        percent: total ? (contributed / total) * 100 : 100,
      };
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const grownDeposit = deposit * (1 + monthlyRate) ** months;
    const remaining = Math.max(0, goal - grownDeposit);
    const factor = monthlyRate ? (((1 + monthlyRate) ** months - 1) / monthlyRate) : months;
    const requiredMonthly = remaining / Math.max(1, factor);
    const contributed = deposit + requiredMonthly * months;
    return {
      hero: requiredMonthly,
      heroLabel: "Monthly amount to save",
      rows: [
        ["Starting balance", deposit],
        ["Your contributions", contributed - deposit],
        ["Target balance", goal],
      ],
      percent: goal ? Math.min(100, (contributed / goal) * 100) : 100,
    };
  }, [tool, amount, rate, years, deposit, monthly, goal]);

  const switchTool = (next: ToolId) => {
    setTool(next);
    if (next === "mortgage") {
      setAmount(400000);
      setRate(6.5);
      setYears(30);
    } else if (next === "loan") {
      setAmount(25000);
      setRate(8.5);
      setYears(5);
    } else {
      setRate(7);
      setYears(10);
    }
    setCopyStatus("Copy result");
  };

  const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tools.length) % tools.length;
    const next = tools[nextIndex];
    switchTool(next.id);
    document.getElementById(`tool-tab-${next.id}`)?.focus();
  };

  const copyResult = async () => {
    const toolName = tools.find((item) => item.id === tool)?.label ?? "Financial";
    const summary = `${toolName} estimate from Numora: ${result.heroLabel} — ${money(result.hero, 0)}. Educational estimate only.`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy result"), 1800);
    } catch {
      setCopyStatus("Copy unavailable");
    }
  };

  const isDebt = tool === "loan" || tool === "mortgage";
  const isSavings = tool === "savings";

  return (
    <div className="calculator-card">
      <div className="tool-tabs" role="tablist" aria-label="Choose a calculator">
        {tools.map((item, index) => (
          <button
            className={tool === item.id ? "tool-tab active" : "tool-tab"}
            id={`tool-tab-${item.id}`}
            key={item.id}
            onClick={() => switchTool(item.id)}
            onKeyDown={(event) => handleTabKey(event, index)}
            role="tab"
            aria-selected={tool === item.id}
            aria-controls="calculator-panel"
            tabIndex={tool === item.id ? 0 : -1}
          >
            <span className="tab-icon" aria-hidden="true">{item.short}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="calc-grid" id="calculator-panel" role="tabpanel" aria-labelledby={`tool-tab-${tool}`}>
        <div className="calc-controls">
          <div className="calc-heading-row">
            <div>
              <p className="eyebrow">Free calculator</p>
              <h2>{tools.find((item) => item.id === tool)?.label} calculator</h2>
            </div>
            <label className="currency-select">
              <span className="sr-only">Currency</span>
              <select value={currencyCode} onChange={(event) => setCurrencyCode(event.target.value)}>
                {currencies.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
              </select>
            </label>
          </div>

          {isDebt ? (
            <>
              <Field label={tool === "mortgage" ? "Mortgage principal" : "Loan amount"} value={amount} min={1000} max={tool === "mortgage" ? 2000000 : 250000} step={1000} suffix={currency.symbol} onChange={setAmount} />
              <Field label="Annual interest rate" value={rate} min={0} max={35} step={0.1} suffix="%" onChange={setRate} />
              <Field label="Loan term" value={years} min={1} max={tool === "mortgage" ? 40 : 15} step={1} suffix="years" onChange={setYears} />
            </>
          ) : (
            <>
              <Field label={isSavings ? "Current savings" : "Starting amount"} value={deposit} min={0} max={500000} step={500} suffix={currency.symbol} onChange={setDeposit} />
              {isSavings ? (
                <Field label="Savings goal" value={goal} min={1000} max={1000000} step={1000} suffix={currency.symbol} onChange={setGoal} />
              ) : (
                <Field label="Monthly contribution" value={monthly} min={0} max={10000} step={50} suffix={currency.symbol} onChange={setMonthly} />
              )}
              <Field label="Expected annual return" value={rate} min={0} max={20} step={0.1} suffix="%" onChange={setRate} />
              <Field label="Time horizon" value={years} min={1} max={40} step={1} suffix="years" onChange={setYears} />
            </>
          )}
        </div>

        <aside className="calc-result" aria-live="polite">
          <p className="result-kicker">Your estimate</p>
          <p className="result-label">{result.heroLabel}</p>
          <p className="result-number">{money(result.hero, 0)}</p>
          <div className="result-bar" aria-hidden="true">
            <span style={{ width: `${Math.max(8, Math.min(92, result.percent))}%` }} />
          </div>
          <div className="result-legend">
            <span><i className="dot dot-dark" />Principal / contributions</span>
            <span><i className="dot dot-light" />Interest / growth</span>
          </div>
          <dl className="result-list">
            {result.rows.map(([label, value]) => (
              <div key={label as string}>
                <dt>{label}</dt>
                <dd>{money(value as number)}</dd>
              </div>
            ))}
          </dl>
          <div className="result-actions">
            <button type="button" onClick={() => void copyResult()}>{copyStatus}</button>
            <button type="button" onClick={() => window.print()}>Print / save</button>
          </div>
          <p className="result-disclaimer">Illustrative estimate. Rates, fees, taxes, and compounding rules vary by provider and country.</p>
        </aside>
      </div>
    </div>
  );
}
