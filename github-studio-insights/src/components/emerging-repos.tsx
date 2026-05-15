type Row = {
  name: string;
  url: string;
  views14: number;
  clones14: number;
  recencyBoost: number;
};

export function EmergingRepos({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-300">Emerging repositories</h3>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">
            <a href={r.url} target="_blank" className="truncate hover:underline">
              {r.name}
            </a>
            <span className="text-xs text-zinc-400">
              V {r.views14} · C {r.clones14} · R {(r.recencyBoost * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}