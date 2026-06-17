"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { replaceVariables, titleCase } from "@/lib/utils";
import type { PromptTemplate } from "@/types/content";

export function PromptCard({
  prompt,
  highlighted = false,
}: {
  prompt: PromptTemplate;
  highlighted?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  const processedPrompt = replaceVariables(prompt.prompt, values);

  return (
    <article
      id={prompt.id}
      className={`glass-card scroll-mt-24 p-4 sm:p-5 ${
        highlighted ? "border-blue-300 bg-blue-50 shadow-md" : ""
      }`}
    >
      <div className="grid gap-4 sm:flex sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="glass-chip">
              {titleCase(prompt.category)}
            </span>
            <span className="glass-chip">
              {titleCase(prompt.difficulty)}
            </span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{prompt.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{prompt.description}</p>
        </div>
        <div className="sm:shrink-0">
          <CopyButton value={processedPrompt} />
        </div>
      </div>

      {prompt.variables && prompt.variables.length > 0 && (
        <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
          {prompt.variables.map((variable) => (
            <div key={variable.name} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                {variable.name} <span className="text-slate-500">— {variable.description}</span>
              </label>
              <input
                type="text"
                placeholder={`e.g. ${variable.example}`}
                value={values[variable.name] || ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [variable.name]: e.target.value }))
                }
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Prompt Preview
          </span>
          {Object.keys(values).length > 0 && (
            <button
              onClick={() => setValues({})}
              className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-blue-700"
            >
              Reset
            </button>
          )}
        </div>
        <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-foreground sm:text-sm">
          {processedPrompt}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            {tag}
          </span>
        ))}
      </div>

      {prompt.relatedConcepts?.length ? (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">Related:</span>
          {prompt.relatedConcepts.map((slug) => (
            <Link key={slug} href={`/concepts/${slug}`} className="font-medium text-primary hover:underline">
              {titleCase(slug)}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
