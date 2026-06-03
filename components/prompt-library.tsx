"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PromptCard } from "@/components/prompt-card";
import { cn, titleCase } from "@/lib/utils";
import type { PromptCategory, PromptTemplate } from "@/types/content";

const categories: ("all" | PromptCategory)[] = [
  "all",
  "coding",
  "research",
  "learning",
  "productivity",
  "writing",
];

const difficulties = ["all", "beginner", "intermediate", "advanced"] as const;

export function PromptLibrary({
  prompts,
}: {
  prompts: PromptTemplate[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("all");
  const [selectedPromptId, setSelectedPromptId] = useState<string>();

  const fuse = useMemo(
    () =>
      new Fuse(prompts, {
        keys: ["title", "description", "tags", "useCase", "prompt"],
        threshold: 0.35,
      }),
    [prompts],
  );

  const filtered = useMemo(() => {
    const base = query.trim() ? fuse.search(query).map((result) => result.item) : prompts;
    return base.filter((prompt) => {
      const categoryMatch = category === "all" || prompt.category === category;
      const difficultyMatch = difficulty === "all" || prompt.difficulty === difficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [category, difficulty, fuse, prompts, query]);

  useEffect(() => {
    const promptId = new URLSearchParams(window.location.search).get("prompt");
    if (!promptId) return;

    setSelectedPromptId(promptId);
    window.requestAnimationFrame(() => {
      document.getElementById(promptId)?.scrollIntoView({ block: "start" });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prompts by use case, tag, or instruction..."
            className="h-11 w-full rounded-md border border-white/10 bg-slate-950/45 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/25"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as typeof category)}
            className="h-10 w-full rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-100 sm:w-auto"
            aria-label="Prompt category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {titleCase(item)}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as typeof difficulty)}
            className="h-10 w-full rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-100 sm:w-auto"
            aria-label="Prompt difficulty"
          >
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {titleCase(item)}
              </option>
            ))}
          </select>
          <span className="self-center text-sm text-slate-400">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className={cn("grid gap-5", filtered.length > 1 && "xl:grid-cols-2")}>
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} highlighted={prompt.id === selectedPromptId} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-8 text-center text-slate-400 backdrop-blur-xl">
          No prompts match those filters.
        </div>
      ) : null}
    </div>
  );
}
