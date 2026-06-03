"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { AiTool, ConceptPage, PromptTemplate, Workflow } from "@/types/content";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: string;
};

export function GlobalSearch({
  prompts,
  concepts,
  workflows,
  tools,
}: {
  prompts: PromptTemplate[];
  concepts: ConceptPage[];
  workflows: Workflow[];
  tools: AiTool[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo<SearchItem[]>(
    () => [
      ...prompts.map((item) => ({
        title: item.title,
        description: item.description,
        href: "/prompts",
        type: "Prompt",
      })),
      ...concepts.map((item) => ({
        title: item.title,
        description: item.summary,
        href: `/concepts/${item.slug}`,
        type: "Concept",
      })),
      ...workflows.map((item) => ({
        title: item.title,
        description: item.description,
        href: `/workflows#${item.id}`,
        type: "Workflow",
      })),
      ...tools.map((item) => ({
        title: item.name,
        description: item.summary,
        href: "/tools",
        type: "Tool",
      })),
    ],
    [concepts, prompts, tools, workflows],
  );

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["title", "description", "type"], threshold: 0.35 }),
    [items],
  );

  const results = query.trim() ? fuse.search(query).slice(0, 8).map((result) => result.item) : items.slice(0, 6);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) {
        event.preventDefault();
        setOpen(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 p-2 backdrop-blur sm:p-4">
      <div className="mx-auto mt-3 max-w-2xl rounded-lg border border-border bg-card shadow-soft sm:mt-20">
        <div className="flex items-center gap-2 border-b border-border p-3 sm:gap-3 sm:p-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ContextCraft..."
            className="h-10 min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md hover:bg-accent"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[78vh] overflow-auto p-2 sm:max-h-[55vh]">
          {results.map((item) => (
            <Link
              key={`${item.type}-${item.title}`}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md p-3 transition hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{item.title}</h3>
                <span className="shrink-0 rounded border border-border px-2 py-1 text-xs text-muted-foreground">
                  {item.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </Link>
          ))}
          {results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">No results found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
