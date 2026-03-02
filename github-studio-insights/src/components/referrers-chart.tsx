"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./chart-tooltip";

type Row = { source: string; count: number; uniques: number };

export function ReferrersChart({ data }: { data: Row[] }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/60">
      <h3 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">Top traffic sources</h3>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} />
            <XAxis dataKey="source" stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" name="Visits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}