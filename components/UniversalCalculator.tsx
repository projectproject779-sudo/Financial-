"use client";

import { useMemo, useRef, useState } from "react";
import type { CalculatorConfig, ResultFormat } from "../lib/calculators";
import { calculate } from "../lib/calculators";

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "INR", "JPY", "AED", "SGD", "NZD", "CHF", "ZAR", "MYR"] as const;

function format(value: number, type: ResultFormat, currency: string) {
  if (!Number.isFinite(value)) return "—";
  if (type === "currency") return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: Math.abs(value) < 100 ? 2 : 0 }).format(value);
  if (type === "percent") return `${value.toLocaleString("en", { maximumFractionDigits: 2 })}%`;
  if (type === "months") return `${Math.ceil(value).toLocaleString("en")} month${Math.ceil(value) === 1 ? "" : "s"}`;
  if (type === "years") return `${value.toLocaleString("en", { maximumFractionDigits: 1 })} years`;
  return value.toLocaleString("en", { maximumFractionDigits: 2 });
}

const suffix: Record<string, string> = { percent: "%", years: "years", months: "months", hours: "hours", number: "" };

function trackCalculatorEvent(eventName: string, calculatorSlug: string, extra: Record<string, string> = {}) {
  const win = window as Window & { gtag?: (command: "event", name: string, params: Record<string, string>) => void };
  win.gtag?.("event", eventName, { calculator_slug: calculatorSlug, ...extra });
}

export function UniversalCalculator({ config, defaultCurrency = "USD" }: { config: CalculatorConfig; defaultCurrency?: string }) {
  const [currency, setCurrency] = useState(currencies.includes(defaultCurrency as (typeof currencies)[number]) ? defaultCurrency : "USD");
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(config.fields.map((field) => [field.key, field.defaultValue])));
  const [copied, setCopied] = useState(false);
  const hasTrackedUse = useRef(false);
  const result = useMemo(() => calculate(config.slug, values), [config.slug, values]);

  const setField = (key: string, next: number, min: number, max: number) => {
    if (!hasTrackedUse.current) {
      hasTrackedUse.current = true;
      trackCalculatorEvent("calculator_use", config.slug, { calculator_category: config.category });
    }
    setValues((current) => ({ ...current, [key]: Math.min(max, Math.max(min, Number.isFinite(next) ? next : 0)) }));
  };

  const copySummary = async () => {
    const rows = result.rows.map((row) => `${row.label}: ${format(row.value, row.format, currency)}`).join("\n");
    await navigator.clipboard?.writeText(`${config.title}\n${result.headline}: ${format(result.headlineValue, result.headlineFormat, currency)}\n${rows}\n\nEducational estimate from Numora.`);
    trackCalculatorEvent("calculator_copy_summary", config.slug);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="universal-calculator" aria-label={`${config.title} inputs and results`}>
      <div className="universal-inputs">
        <div className="calc-heading-row">
          <div><p className="eyebrow">Live scenario</p><h2>Enter your numbers</h2></div>
          <label className="currency-select"><span className="sr-only">Currency</span><select value={currency} onChange={(event) => { setCurrency(event.target.value); trackCalculatorEvent("calculator_currency_change", config.slug, { currency: event.target.value }); }}>{currencies.map((code) => <option key={code}>{code}</option>)}</select></label>
        </div>
        <div className="universal-fields">
          {config.fields.map((field) => (
            <label className="calc-field" key={field.key}>
              <span>{field.label}</span>
              {field.help && <small>{field.help}</small>}
              <span className="number-wrap">
                <input className="number-input" type="number" inputMode="decimal" value={values[field.key]} min={field.min} max={field.max} step={field.step} onChange={(event) => setField(field.key, Number(event.target.value), field.min, field.max)} />
                <span className="input-suffix">{field.unit === "currency" ? currency : suffix[field.unit]}</span>
              </span>
              <input className="range-input" aria-label={`${field.label} slider`} type="range" value={values[field.key]} min={field.min} max={field.max} step={field.step} onChange={(event) => setField(field.key, Number(event.target.value), field.min, field.max)} />
            </label>
          ))}
        </div>
      </div>
      <div className="calc-result universal-result" aria-live="polite">
        <p className="result-kicker">Your scenario</p>
        {result.warning && <p className="result-warning">{result.warning}</p>}
        <p className="result-label">{result.headline}</p>
        <p className="result-number">{format(result.headlineValue, result.headlineFormat, currency)}</p>
        <div className="result-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, Math.max(2, result.progress ?? 55))}%` }} /></div>
        <dl className="result-list">
          {result.rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{format(row.value, row.format, currency)}</dd></div>)}
        </dl>
        <p className="result-insight">{result.insight}</p>
        <div className="result-actions"><button type="button" onClick={copySummary}>{copied ? "Copied" : "Copy summary"}</button><button type="button" onClick={() => { trackCalculatorEvent("calculator_print", config.slug); window.print(); }}>Print result</button></div>
        <p className="result-disclaimer">Educational estimate only. It excludes provider-specific fees, taxes, rules, and market uncertainty unless explicitly stated.</p>
      </div>
    </section>
  );
}
