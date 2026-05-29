import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { titleCase } from "@/lib/utils";
import type { PromptTemplate } from "@/types/content";

export function PromptCard({ prompt }: { prompt: PromptTemplate }) {
  return (
    <article className="glass-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="glass-chip">
              {titleCase(prompt.category)}
            </span>
            <span className="glass-chip">
              {titleCase(prompt.difficulty)}
            </span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white">{prompt.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{prompt.description}</p>
        </div>
        <CopyButton value={prompt.prompt} />
      </div>
      <div className="mt-4 rounded-lg border border-cyan-200/10 bg-[#0b1024]/70 p-4 shadow-[inset_0_0_24px_rgba(14,165,233,0.06)]">
        <pre className="max-h-56 overflow-auto whitespace-pre-wrap text-sm leading-6 text-slate-300">
          {prompt.prompt}
        </pre>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
            {tag}
          </span>
        ))}
      </div>
      {prompt.relatedConcepts?.length ? (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="text-slate-400">Related:</span>
          {prompt.relatedConcepts.map((slug) => (
            <Link key={slug} href={`/concepts/${slug}`} className="font-medium text-cyan-200 hover:underline">
              {titleCase(slug)}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
