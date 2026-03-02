"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Row = { label: string; count: number };

export function PopularPathsChart({ data }: { data: Row[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-300">Top popular paths</h3>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" opacity={0.35} />
            <XAxis type="number" stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis type="category" dataKey="label" width={180} stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: 12 }}
              labelStyle={{ color: "#e4e4e7" }}
              itemStyle={{ color: "#34d399" }}
            />
            <Bar dataKey="count" name="Visits" fill="#10b981" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}