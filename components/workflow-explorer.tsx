"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { titleCase } from "@/lib/utils";
import type { PromptTemplate, Workflow } from "@/types/content";

const audiences: ("all" | Workflow["audience"])[] = ["all", "developer", "professional", "student"];

export function WorkflowExplorer({
  workflows,
  prompts,
}: {
  workflows: Workflow[];
  prompts: PromptTemplate[];
}) {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<(typeof audiences)[number]>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const audienceMatch = audience === "all" || workflow.audience === audience;
      const haystack = [
        workflow.title,
        workflow.description,
        workflow.audience,
        ...workflow.steps.flatMap((step) => [step.title, step.goal, step.prompt ?? ""]),
      ]
        .join(" ")
        .toLowerCase();

      return audienceMatch && (!needle || haystack.includes(needle));
    });
  }, [audience, query, workflows]);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search workflows by task, step, or prompt..."
            className="h-11 w-full rounded-md border border-white/10 bg-slate-950/45 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/25"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
          <select
            value={audience}
            onChange={(event) => setAudience(event.target.value as typeof audience)}
            className="h-10 w-full rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-100 sm:w-auto"
            aria-label="Workflow audience"
          >
            {audiences.map((item) => (
              <option key={item} value={item}>
                {titleCase(item)}
              </option>
            ))}
          </select>
          <span className="self-center text-sm text-slate-400">
            {filtered.length} workflow{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((workflow) => (
          <article key={workflow.id} id={workflow.id} className="glass-card scroll-mt-24 p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="glass-chip">{titleCase(workflow.audience)}</span>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{workflow.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{workflow.description}</p>
              </div>
            </div>
            <ol className="grid gap-3">
              {workflow.steps.map((step, index) => {
                const linkedPrompt = findPromptForStep(step.prompt, prompts);

                return (
                  <li key={step.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                    <div className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-medium text-slate-100">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{step.goal}</p>
                        {step.prompt ? (
                          <p className="mt-2 text-sm font-medium text-cyan-100">
                            {linkedPrompt ? (
                              <Link href={`/prompts?prompt=${linkedPrompt.id}`} className="hover:underline">
                                {step.prompt}
                              </Link>
                            ) : (
                              step.prompt
                            )}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-8 text-center text-slate-400 backdrop-blur-xl">
          No workflows match those filters.
        </div>
      ) : null}
    </div>
  );
}

function findPromptForStep(stepPrompt: string | undefined, prompts: PromptTemplate[]) {
  if (!stepPrompt) return undefined;
  return prompts.find((prompt) => stepPrompt.toLowerCase().includes(prompt.title.toLowerCase()));
}
