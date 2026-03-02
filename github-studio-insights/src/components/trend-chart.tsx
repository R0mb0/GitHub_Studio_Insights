"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./chart-tooltip";

type Point = { date: string; views: number; uniques: number; clones: number };

export function TrendChart({ data }: { data: Point[] }) {
  return (
    <div className="h-[320px] w-full rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/60">
      <h3 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">Visibility trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} />
          <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
          <YAxis stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="uniques" stroke="#22c55e" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="clones" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}