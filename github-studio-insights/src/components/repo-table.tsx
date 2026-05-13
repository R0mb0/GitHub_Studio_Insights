"use client";

import { useMemo, useState } from "react";

type Row = {
  name: string;
  url: string;
  views14: number;
  uniques14: number;
  clones14: number;
  stars: number;
  forks: number;
  score: number;
};

type SortKey = "name" | "views14" | "uniques14" | "clones14" | "stars" | "forks" | "score";
type SortDir = "asc" | "desc";

type HeaderCellProps = {
  k: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

function shortName(input: string, max = 28) {
  return input.length > max ? `${input.slice(0, max)}…` : input;
}

function HeaderCell({ k, label, sortKey, sortDir, onSort }: HeaderCellProps) {
  return (
    <th className="px-3 py-2 text-right font-semibold">
      <button onClick={() => onSort(k)} className="inline-flex items-center gap-1 hover:text-blue-400">
        {label}
        <span className="text-[10px] opacity-70">{sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "·"}</span>
      </button>
    </th>
  );
}

export function RepoTable({ title, rows }: { title: string; rows: Row[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function onSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(nextKey);
    setSortDir(nextKey === "name" ? "asc" : "desc");
  }

  const sorted = useMemo(() => {
    const arr = [...rows];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }

      const na = Number(av);
      const nb = Number(bv);
      return sortDir === "asc" ? na - nb : nb - na;
    });
    return arr;
  }, [rows, sortKey, sortDir]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/60">
      <h3 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">{title}</h3>
      <div className="overflow-auto rounded-xl border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-zinc-100/90 text-zinc-700 backdrop-blur dark:bg-zinc-900/95 dark:text-zinc-100">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">
                <button onClick={() => onSort("name")} className="inline-flex items-center gap-1 hover:text-blue-400">
                  Repo
                  <span className="text-[10px] opacity-70">{sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : "·"}</span>
                </button>
              </th>
              <HeaderCell k="views14" label="Views" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <HeaderCell k="uniques14" label="Unique" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <HeaderCell k="clones14" label="Clones" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <HeaderCell k="stars" label="Stars" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <HeaderCell k="forks" label="Forks" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <HeaderCell k="score" label="Score" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.name} className="border-t border-black/5 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                <td className="px-3 py-2 max-w-[260px] truncate" title={r.name}>
                  <a className="hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">
                    {shortName(r.name)}
                  </a>
                </td>
                <td className="px-3 py-2 text-right">{r.views14}</td>
                <td className="px-3 py-2 text-right">{r.uniques14}</td>
                <td className="px-3 py-2 text-right">{r.clones14}</td>
                <td className="px-3 py-2 text-right">{r.stars}</td>
                <td className="px-3 py-2 text-right">{r.forks}</td>
                <td className="px-3 py-2 text-right">{r.score.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
