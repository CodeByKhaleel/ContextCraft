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
  const nextPrompt = relatedPrompts[0];
  const nextWorkflow = relatedWorkflows[0];

  return (
    <SectionShell>
      <div className="mb-8 max-w-3xl">
        <Link href={`/${concept.section}`} className="text-sm font-medium text-primary hover:underline">
          {titleCase(concept.section)}
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{concept.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{concept.summary}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <article className="space-y-5">
          <section className="glass-card p-4 sm:p-5">
            <h2 className="text-xl font-semibold text-foreground">Why it matters</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{concept.whyItMatters}</p>
          </section>
          <section className="glass-card p-4 sm:p-5">
            <h2 className="text-xl font-semibold text-foreground">Practical example</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{concept.example}</p>
          </section>
          <section className="glass-card p-4 sm:p-5">
            <h2 className="text-xl font-semibold text-foreground">Common mistakes</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
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
          <div className="glass-card p-4 sm:p-5">
            <h2 className="font-semibold text-foreground">Related workflows</h2>
            <div className="mt-3 space-y-2">
              {relatedWorkflows.length ? (
                relatedWorkflows.map((workflow) => (
                  <Link key={workflow.id} href={`/workflows#${workflow.id}`} className="block text-sm font-medium text-primary hover:underline">
                    {workflow.title}
                  </Link>
                ))
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">No workflow is linked yet.</p>
              )}
            </div>
          </div>
          <div className="glass-card p-4 sm:p-5">
            <h2 className="font-semibold text-foreground">Next practical step</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Apply this concept with a copy-ready prompt or a repeatable workflow.
            </p>
            <div className="mt-4 grid gap-2">
              {nextPrompt ? (
                <Link
                  href={`/prompts?prompt=${nextPrompt.id}`}
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-blue-700"
                >
                  Use {nextPrompt.title}
                </Link>
              ) : null}
              {nextWorkflow ? (
                <Link
                  href={`/workflows#${nextWorkflow.id}`}
                  className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-blue-300 hover:bg-accent hover:text-accent-foreground"
                >
                  Open {nextWorkflow.title}
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      {relatedPrompts.length ? (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Related prompts</h2>
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
