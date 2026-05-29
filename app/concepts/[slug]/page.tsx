import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromptCard } from "@/components/prompt-card";
import { SectionShell } from "@/components/section-shell";
import { concepts } from "@/data/concepts";
import { prompts } from "@/data/prompts";
import { workflows } from "@/data/workflows";
import { titleCase } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = concepts.find((item) => item.slug === slug);

  if (!concept) return {};

  return {
    title: concept.title,
    description: concept.summary,
  };
}

export default async function ConceptPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = concepts.find((item) => item.slug === slug);

  if (!concept) notFound();

  const relatedPrompts = prompts.filter((prompt) => concept.relatedPrompts.includes(prompt.id));
  const relatedWorkflows = workflows.filter((workflow) => concept.relatedWorkflows.includes(workflow.id));

  return (
    <SectionShell>
      <div className="mb-8 max-w-3xl">
        <Link href={`/${concept.section}`} className="text-sm font-medium text-cyan-200/80 hover:underline">
          {titleCase(concept.section)}
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{concept.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-400">{concept.summary}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <article className="space-y-5">
          <section className="glass-card p-5">
            <h2 className="text-xl font-semibold text-white">Why it matters</h2>
            <p className="mt-3 leading-7 text-slate-400">{concept.whyItMatters}</p>
          </section>
          <section className="glass-card p-5">
            <h2 className="text-xl font-semibold text-white">Practical example</h2>
            <p className="mt-3 leading-7 text-slate-400">{concept.example}</p>
          </section>
          <section className="glass-card p-5">
            <h2 className="text-xl font-semibold text-white">Common mistakes</h2>
            <ul className="mt-3 space-y-2 text-slate-400">
              {concept.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <span aria-hidden="true">-</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <aside className="space-y-5">
          <div className="glass-card p-5">
            <h2 className="font-semibold text-white">Related workflows</h2>
            <div className="mt-3 space-y-2">
              {relatedWorkflows.map((workflow) => (
                <Link key={workflow.id} href={`/workflows#${workflow.id}`} className="block text-sm text-cyan-200 hover:underline">
                  {workflow.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {relatedPrompts.length ? (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">Related prompts</h2>
          <div className="grid gap-5 xl:grid-cols-2">
            {relatedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}
