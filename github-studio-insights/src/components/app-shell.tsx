"use client";

import { BarChart3, FolderGit2, Gauge, Home, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

type SectionTab = "overview" | "performance" | "traffic" | "repositories";

export function AppShell({
  children,
  activeTab,
  onTabChange,
}: {
  children: React.ReactNode;
  activeTab: SectionTab;
  onTabChange: (tab: SectionTab) => void;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="border-r border-black/10 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-900/70">
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="rounded-xl bg-blue-500/90 p-2 text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">GitHub Studio</p>
              <p className="text-xs text-zinc-500">Insights</p>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarButton icon={<Home size={16} />} label="Overview" active={activeTab === "overview"} onClick={() => onTabChange("overview")} />
            <SidebarButton icon={<Gauge size={16} />} label="Performance" active={activeTab === "performance"} onClick={() => onTabChange("performance")} />
            <SidebarButton icon={<BarChart3 size={16} />} label="Traffic" active={activeTab === "traffic"} onClick={() => onTabChange("traffic")} />
            <SidebarButton icon={<FolderGit2 size={16} />} label="Repositories" active={activeTab === "repositories"} onClick={() => onTabChange("repositories")} />
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70 md:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-semibold">Github Studio Analytics</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Quick visibility overview across your public repositories</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="px-4 py-5 md:px-6">{children}</main>
        </section>
      </div>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
        active
          ? "bg-blue-500 text-white shadow"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}