"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn, titleCase } from "@/lib/utils";
import type { ConceptPage, Difficulty } from "@/types/content";

type ConceptSection = ConceptPage["section"];

const sections: ("all" | ConceptSection)[] = [
  "all",
  "basics",
  "prompt-engineering",
  "context-engineering",
  "limitations",
];

const difficulties: ("all" | Difficulty)[] = ["all", "beginner", "intermediate", "advanced"];

export function ConceptExplorer({
  concepts,
  lockedSection,
}: {
  concepts: ConceptPage[];
  lockedSection?: ConceptSection;
}) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<"all" | ConceptSection>(lockedSection ?? "all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return concepts.filter((concept) => {
      const sectionMatch = lockedSection
        ? concept.section === lockedSection
        : section === "all" || concept.section === section;
      const difficultyMatch = difficulty === "all" || concept.difficulty === difficulty;
      const queryMatch =
        !needle ||
        [concept.title, concept.summary, concept.whyItMatters, concept.example]
          .join(" ")
          .toLowerCase()
          .includes(needle);

      return sectionMatch && difficultyMatch && queryMatch;
    });
  }, [concepts, difficulty, lockedSection, query, section]);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search concepts, examples, or mistakes..."
            className="h-11 w-full rounded-md border border-white/10 bg-slate-950/45 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/25"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          {!lockedSection ? (
            <select
              value={section}
              onChange={(event) => setSection(event.target.value as typeof section)}
              className="h-10 rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-100"
              aria-label="Concept section"
            >
              {sections.map((item) => (
                <option key={item} value={item}>
                  {titleCase(item)}
                </option>
              ))}
            </select>
          ) : null}
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as typeof difficulty)}
            className="h-10 rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-100"
            aria-label="Concept difficulty"
          >
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {titleCase(item)}
              </option>
            ))}
          </select>
          <span className="self-center text-sm text-slate-400">
            {filtered.length} concept{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className={cn("grid gap-4", filtered.length > 1 && "md:grid-cols-2")}>
        {filtered.map((concept) => (
          <Link key={concept.slug} href={`/concepts/${concept.slug}`} className="glass-card glass-card-hover p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="glass-chip">{titleCase(concept.difficulty)}</span>
              <span className="glass-chip">{titleCase(concept.section)}</span>
            </div>
            <h2 className="text-lg font-semibold text-white">{concept.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{concept.summary}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-8 text-center text-slate-400 backdrop-blur-xl">
          No concepts match those filters.
        </div>
      ) : null}
    </div>
  );
}
