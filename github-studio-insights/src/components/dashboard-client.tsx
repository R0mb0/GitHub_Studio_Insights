"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { RepoTable } from "@/components/repo-table";
import { ReferrersChart } from "@/components/referrers-chart";
import { PopularPathsChart } from "@/components/popular-paths-chart";
import { TrendChart } from "@/components/trend-chart";
import { TopPerformingList } from "@/components/top-performing-list";

type Repo = {
  name: string;
  url: string;
  views14: number;
  uniques14: number;
  clones14: number;
  stars: number;
  forks: number;
  score: number;
  last7Views: number;
  prev7Views: number;
};

type Daily = { date: string; views: number; uniques: number; clones: number };
type SectionTab = "overview" | "performance" | "traffic" | "repositories";

function pct(last: number, prev: number) {
  if (prev <= 0 && last > 0) return 100;
  if (prev <= 0) return 0;
  return ((last - prev) / prev) * 100;
}

export function DashboardClient({
  trend,
  repos,
  topByScore,
  topByViews,
  topByCommunity,
  topReferrers,
  topPaths,
  topPerforming,
  totals,
  sparks,
}: {
  trend: Daily[];
  repos: Repo[];
  topByScore: Repo[];
  topByViews: Repo[];
  topByCommunity: Repo[];
  topReferrers: { source: string; count: number; uniques: number }[];
  topPaths: { label: string; count: number }[];
  topPerforming: Repo[];
  totals: { views14: number; uniques14: number; clones14: number; repos: number };
  sparks: { views: number[]; uniques: number[]; clones: number[] };
}) {
  const [days, setDays] = useState<7 | 14>(14);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SectionTab>("overview");

  const trendFiltered = useMemo(() => trend.slice(-days), [trend, days]);

  const filterRows = (rows: Repo[]) =>
    rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  const last7 = trend.slice(-7).reduce((s, d) => s + d.views, 0);
  const prev7 = trend.slice(-14, -7).reduce((s, d) => s + d.views, 0);
  const last7U = trend.slice(-7).reduce((s, d) => s + d.uniques, 0);
  const prev7U = trend.slice(-14, -7).reduce((s, d) => s + d.uniques, 0);
  const last7C = trend.slice(-7).reduce((s, d) => s + d.clones, 0);
  const prev7C = trend.slice(-14, -7).reduce((s, d) => s + d.clones, 0);

  return (
    <AppShell activeTab={tab} onTabChange={setTab}>
      <div className="space-y-5">
        {(tab === "overview" || tab === "performance") && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Total views (14d)" value={totals.views14} spark={sparks.views} trendPct={pct(last7, prev7)} />
            <KpiCard label="Unique visitors (14d)" value={totals.uniques14} spark={sparks.uniques} trendPct={pct(last7U, prev7U)} />
            <KpiCard label="Total clones (14d)" value={totals.clones14} spark={sparks.clones} trendPct={pct(last7C, prev7C)} />
            <KpiCard label="Analyzed repos" value={totals.repos} spark={sparks.views} hint="Public repositories with traffic data" />
          </section>
        )}

        {(tab === "overview" || tab === "performance") && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setDays(7)} className={`rounded-xl px-3 py-1 text-sm ${days === 7 ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-300"}`}>7d</button>
              <button onClick={() => setDays(14)} className={`rounded-xl px-3 py-1 text-sm ${days === 14 ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-300"}`}>14d</button>
            </div>
            <TrendChart data={trendFiltered} />
            <TopPerformingList rows={topPerforming} />
          </>
        )}

        {(tab === "overview" || tab === "traffic") && (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <ReferrersChart data={topReferrers} />
            <PopularPathsChart data={topPaths} />
          </div>
        )}

        {(tab === "overview" || tab === "repositories") && (
          <>
            <div className="flex justify-end">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search repository..."
                className="w-full max-w-xs rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <RepoTable title="Top by final score" rows={filterRows(topByScore)} />
              <RepoTable title="Top by views" rows={filterRows(topByViews)} />
              <RepoTable title="Top by community (stars + forks)" rows={filterRows(topByCommunity)} />
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}