export type BreakdownSegment = {
  label: string;
  value: number;
};

const colors = ["#d9ef76", "#82c7a5", "#f5c978", "#9db9dc"];

export function ResultBreakdownChart({
  label,
  segments,
  formatValue,
}: {
  label: string;
  segments: BreakdownSegment[];
  formatValue: (value: number) => string;
}) {
  const visibleSegments = segments.filter((segment) => Number.isFinite(segment.value) && segment.value > 0);
  const total = visibleSegments.reduce((sum, segment) => sum + segment.value, 0);

  if (!total || visibleSegments.length < 2) return null;

  const items = visibleSegments.map((segment, index) => {
    const percent = segment.value / total * 100;
    const start = visibleSegments.slice(0, index).reduce((sum, item) => sum + item.value / total * 100, 0);
    return { ...segment, percent, start, end: start + percent, color: colors[index % colors.length] };
  });
  const gradient = `conic-gradient(${items.map((item) => `${item.color} ${item.start.toFixed(2)}% ${item.end.toFixed(2)}%`).join(", ")})`;
  const largest = items.reduce((current, item) => item.percent > current.percent ? item : current, items[0]);
  const accessibleSummary = items.map((item) => `${item.label} ${item.percent.toFixed(1)} percent`).join(", ");

  return (
    <figure className="result-breakdown">
      <figcaption>{label}</figcaption>
      <div className="breakdown-layout">
        <div
          aria-label={`${label}: ${accessibleSummary}`}
          className="breakdown-donut"
          role="img"
          style={{ background: gradient }}
        >
          <span>
            <strong>{largest.percent.toFixed(0)}%</strong>
            <small>{largest.label}</small>
          </span>
        </div>
        <ul className="breakdown-legend">
          {items.map((item) => (
            <li key={item.label}>
              <i aria-hidden="true" style={{ background: item.color }} />
              <span><b>{item.label}</b><small>{formatValue(item.value)}</small></span>
              <strong>{item.percent.toFixed(1)}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
