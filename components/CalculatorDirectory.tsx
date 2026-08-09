"use client";

import Link from "@/components/SafeLink";
import { useMemo, useState } from "react";
import { calculatorCategories, calculators } from "../lib/calculators";

export function CalculatorDirectory({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visible = useMemo(() => calculators.filter((tool) => {
    const categoryMatch = category === "All" || tool.category === category;
    const text = `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`.toLowerCase();
    return categoryMatch && text.includes(query.trim().toLowerCase());
  }).slice(0, compact ? 8 : undefined), [category, compact, query]);

  return (
    <div className="directory">
      {!compact && <div className="directory-controls">
        <label className="directory-search"><span className="sr-only">Search calculators</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search loan, savings, retirement…" /></label>
        <div className="filter-pills" aria-label="Filter calculators by category">
          {["All", ...calculatorCategories].map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>}
      <div className="directory-grid">
        {visible.map((tool, index) => <Link className="directory-card" href={`/calculators/${tool.slug}`} key={tool.slug}>
          <span className="directory-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="category-tag">{tool.category}</span>
          <h2>{tool.shortTitle}</h2>
          <p>{tool.description}</p>
          <span className="card-link">Open calculator <b>→</b></span>
        </Link>)}
      </div>
      {!visible.length && <p className="empty-state">No calculator matches that search. Try a broader term.</p>}
    </div>
  );
}
