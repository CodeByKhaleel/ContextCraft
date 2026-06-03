import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { titleCase } from "@/lib/utils";
import type { PromptTemplate } from "@/types/content";

export function PromptCard({
  prompt,
  highlighted = false,
}: {
  prompt: PromptTemplate;
  highlighted?: boolean;
}) {
  return (
    <article
      id={prompt.id}
      className={`glass-card scroll-mt-24 p-4 sm:p-5 ${
        highlighted ? "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_36px_rgba(34,211,238,0.18)]" : ""
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
          <h3 className="text-lg font-semibold tracking-tight text-white">{prompt.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{prompt.description}</p>
        </div>
        <div className="sm:shrink-0">
          <CopyButton value={prompt.prompt} />
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-cyan-200/10 bg-[#0b1024]/70 p-3 shadow-[inset_0_0_24px_rgba(14,165,233,0.06)] sm:p-4">
        <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-300 sm:text-sm">
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
