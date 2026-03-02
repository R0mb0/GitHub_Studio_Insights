import {
  daysSince,
  getPublicRepos,
  getRepoClones,
  getRepoPopularPaths,
  getRepoReferrers,
  getRepoViews,
} from "./github";

export type RepoMetrics = {
  name: string;
  url: string;
  views14: number;
  uniques14: number;
  clones14: number;
  cloneUniques14: number;
  stars: number;
  forks: number;
  openIssues: number;
  pushedAt: string;
  recencyBoost: number;
  score: number;
  last7Views: number;
  prev7Views: number;
};

export type DailyPoint = {
  date: string;
  views: number;
  uniques: number;
  clones: number;
};

type Totals = {
  views14: number;
  uniques14: number;
  clones14: number;
  repos: number;
};

export async function getDashboardData() {
  const repos = await getPublicRepos();

  const repoMetrics: RepoMetrics[] = [];
  const dailyMap = new Map<string, DailyPoint>();
  const referrerMap = new Map<string, { source: string; count: number; uniques: number }>();
  const pathMap = new Map<string, { label: string; count: number }>();

  for (const repo of repos) {
    try {
      const [views, clones, referrers, paths] = await Promise.all([
        getRepoViews(repo.name),
        getRepoClones(repo.name),
        getRepoReferrers(repo.name),
        getRepoPopularPaths(repo.name),
      ]);

      const viewsSeries = views.views ?? [];
      const clonesSeries = clones.clones ?? [];

      for (const v of viewsSeries) {
        const day = v.timestamp.slice(0, 10);
        const prev = dailyMap.get(day) ?? { date: day, views: 0, uniques: 0, clones: 0 };
        prev.views += v.count;
        prev.uniques += v.uniques;
        dailyMap.set(day, prev);
      }

      for (const c of clonesSeries) {
        const day = c.timestamp.slice(0, 10);
        const prev = dailyMap.get(day) ?? { date: day, views: 0, uniques: 0, clones: 0 };
        prev.clones += c.count;
        dailyMap.set(day, prev);
      }

      for (const r of referrers) {
        const prev = referrerMap.get(r.referrer) ?? { source: r.referrer, count: 0, uniques: 0 };
        prev.count += r.count;
        prev.uniques += r.uniques;
        referrerMap.set(r.referrer, prev);
      }

      for (const p of paths) {
        const key = `${repo.name}:${p.path}`;
        const prev = pathMap.get(key) ?? { label: `${repo.name} ${p.path}`, count: 0 };
        prev.count += p.count;
        pathMap.set(key, prev);
      }

      // confronto trend: ultimi 7 vs precedenti 7
      const ordered = [...viewsSeries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      const last7 = ordered.slice(-7).reduce((s, x) => s + x.count, 0);
      const prev7 = ordered.slice(-14, -7).reduce((s, x) => s + x.count, 0);

      const recencyBoost = Math.max(0, 30 - daysSince(repo.pushed_at)) / 30;
      const score =
        views.count * 0.45 +
        views.uniques * 0.2 +
        repo.stargazers_count * 0.15 +
        repo.forks_count * 0.1 +
        recencyBoost * 100 * 0.1;

      repoMetrics.push({
        name: repo.name,
        url: repo.html_url,
        views14: views.count ?? 0,
        uniques14: views.uniques ?? 0,
        clones14: clones.count ?? 0,
        cloneUniques14: clones.uniques ?? 0,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        pushedAt: repo.pushed_at,
        recencyBoost,
        score,
        last7Views: last7,
        prev7Views: prev7,
      });
    } catch {
      continue;
    }
  }

  const totals: Totals = repoMetrics.reduce(
    (acc, r) => {
      acc.views14 += r.views14;
      acc.uniques14 += r.uniques14;
      acc.clones14 += r.clones14;
      acc.repos += 1;
      return acc;
    },
    { views14: 0, uniques14: 0, clones14: 0, repos: 0 }
  );

  const trend = [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date));
  const topByScore = [...repoMetrics].sort((a, b) => b.score - a.score);
  const topByViews = [...repoMetrics].sort((a, b) => b.views14 - a.views14);
  const topByCommunity = [...repoMetrics].sort((a, b) => b.stars + b.forks - (a.stars + a.forks));
  const topReferrers = [...referrerMap.values()].sort((a, b) => b.count - a.count).slice(0, 8);
  const topPaths = [...pathMap.values()].sort((a, b) => b.count - a.count).slice(0, 8);

  const topPerforming = [...repoMetrics]
    .sort((a, b) => (b.last7Views - b.prev7Views) - (a.last7Views - a.prev7Views))
    .slice(0, 8);

  // sparkline per KPI (14 giorni)
  const sparkViews = trend.map((d) => d.views);
  const sparkUniques = trend.map((d) => d.uniques);
  const sparkClones = trend.map((d) => d.clones);

  return {
    totals,
    trend,
    repos: repoMetrics,
    topByScore,
    topByViews,
    topByCommunity,
    topReferrers,
    topPaths,
    topPerforming,
    sparks: {
      views: sparkViews,
      uniques: sparkUniques,
      clones: sparkClones,
    },
  };
}