"use client";

type Row = {
  name: string;
  url: string;
  last7Views: number;
  prev7Views: number;
  views14: number;
};

function deltaPct(last7: number, prev7: number) {
  if (prev7 <= 0 && last7 > 0) return 100;
  if (prev7 <= 0) return 0;
  return ((last7 - prev7) / prev7) * 100;
}

function shortName(input: string, max = 34) {
  return input.length > max ? `${input.slice(0, max)}…` : input;
}

export function TopPerformingList({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/60">
      <h3 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">Top performing content this period</h3>
      <ul className="space-y-2">
        {rows.map((r) => {
          const pct = deltaPct(r.last7Views, r.prev7Views);
          const up = pct >= 0;
          return (
            <li key={r.name} className="flex items-center justify-between gap-3 rounded-xl border border-black/10 px-3 py-2 dark:border-white/10">
              <a href={r.url} target="_blank" rel="noreferrer" className="truncate text-sm hover:underline" title={r.name}>
                {shortName(r.name)}
              </a>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500">14d: {r.views14}</span>
                <span className={up ? "text-emerald-400" : "text-rose-400"}>
                  {up ? "↑" : "↓"} {Math.abs(pct).toFixed(1)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}