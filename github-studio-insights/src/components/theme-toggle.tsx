"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
    return;
  }
  root.classList.toggle("dark", mode === "dark");
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const saved = (localStorage.getItem("theme-mode") as ThemeMode | null) ?? "auto";
    setMode(saved);
    applyTheme(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = (localStorage.getItem("theme-mode") as ThemeMode | null) ?? "auto";
      if (current === "auto") applyTheme("auto");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function update(next: ThemeMode) {
    setMode(next);
    localStorage.setItem("theme-mode", next);
    applyTheme(next);
  }

  const btn = (value: ThemeMode, label: string) => (
    <button
      onClick={() => update(value)}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
        mode === value
          ? "bg-blue-500 text-white"
          : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-zinc-900/70">
      {btn("light", "Light")}
      {btn("dark", "Dark")}
      {btn("auto", "Auto")}
    </div>
  );
}