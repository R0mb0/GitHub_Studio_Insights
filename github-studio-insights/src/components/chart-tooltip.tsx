"use client";

type PayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
};

export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[180px] rounded-xl border border-white/10 bg-zinc-950/95 p-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-zinc-200">{label}</p>
      <div className="space-y-1">
        {payload.map((item, idx) => (
          <div key={`${item.dataKey}-${idx}`} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color ?? "#60a5fa" }} />
              {item.name ?? item.dataKey}
            </span>
            <span className="font-semibold text-zinc-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}