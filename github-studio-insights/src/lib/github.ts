const API_BASE = "https://api.github.com";

type Repo = {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  pushed_at: string;
  private: boolean;
};

type TrafficViewsResponse = {
  count: number;
  uniques: number;
  views: { timestamp: string; count: number; uniques: number }[];
};

type TrafficClonesResponse = {
  count: number;
  uniques: number;
  clones: { timestamp: string; count: number; uniques: number }[];
};

export type ReferrerRow = {
  referrer: string;
  count: number;
  uniques: number;
};

export type PopularPathRow = {
  path: string;
  title: string;
  count: number;
  uniques: number;
};

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;

if (!token) throw new Error("Missing GITHUB_TOKEN");
if (!username) throw new Error("Missing GITHUB_USERNAME");

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status} on ${path}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function getPublicRepos(): Promise<Repo[]> {
  const page1 = await gh<Repo[]>(`/users/${username}/repos?per_page=100&type=public&sort=updated&page=1`);
  const page2 = await gh<Repo[]>(`/users/${username}/repos?per_page=100&type=public&sort=updated&page=2`);
  return [...page1, ...page2].filter((r) => !r.private);
}

export async function getRepoViews(repo: string): Promise<TrafficViewsResponse> {
  return gh<TrafficViewsResponse>(`/repos/${username}/${repo}/traffic/views`);
}

export async function getRepoClones(repo: string): Promise<TrafficClonesResponse> {
  return gh<TrafficClonesResponse>(`/repos/${username}/${repo}/traffic/clones`);
}

export async function getRepoReferrers(repo: string): Promise<ReferrerRow[]> {
  try {
    return await gh<ReferrerRow[]>(`/repos/${username}/${repo}/traffic/popular/referrers`);
  } catch {
    return [];
  }
}

export async function getRepoPopularPaths(repo: string): Promise<PopularPathRow[]> {
  try {
    return await gh<PopularPathRow[]>(`/repos/${username}/${repo}/traffic/popular/paths`);
  } catch {
    return [];
  }
}

export function daysSince(dateIso: string) {
  const d = new Date(dateIso).getTime();
  const now = Date.now();
  return Math.max(0, (now - d) / (1000 * 60 * 60 * 24));
}