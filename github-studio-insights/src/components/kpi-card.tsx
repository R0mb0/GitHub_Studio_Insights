"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  spark?: number[];
  trendPct?: number;
};

function toSparkData(values: number[]) {
  return values.map((v, i) => ({ i, v }));
}

function TrendBadge({ pct }: { pct?: number }) {
  if (pct === undefined || Number.isNaN(pct)) return null;
  const up = pct >= 0;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        up
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-rose-500/15 text-rose-400"
      }`}
    >
      {up ? "↑" : "↓"} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

export function KpiCard({ label, value, hint, spark = [], trendPct }: Props) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/60">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
        <TrendBadge pct={trendPct} />
      </div>

      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}

      <div className="mt-3 h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={toSparkData(spark)}>
            <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}