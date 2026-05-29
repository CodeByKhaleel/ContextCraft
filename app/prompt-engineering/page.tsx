import type { Metadata } from "next";
import { ConceptList } from "@/components/concept-list";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { prompts } from "@/data/prompts";
import { concepts } from "@/data/concepts";
import { PromptCard } from "@/components/prompt-card";

export const metadata: Metadata = {
  title: "Prompt Engineering",
  description: "Learn practical prompt engineering patterns for reliable AI output.",
};

export default function PromptEngineeringPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="Prompt Engineering"
        title="Prompts that specify task, context, constraints, and output"
        description="Good prompts reduce ambiguity. The useful patterns are practical: roles, examples, constraints, and structured outputs."
      />
      <ConceptList concepts={concepts.filter((concept) => concept.section === "prompt-engineering")} />
      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">Useful prompt patterns</h2>
        <div className="grid gap-5 xl:grid-cols-2">
          {prompts.filter((prompt) => ["prompting", "json", "review"].some((tag) => prompt.tags.includes(tag))).map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
