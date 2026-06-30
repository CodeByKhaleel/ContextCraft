import type { Metadata } from "next";
import { ConceptExplorer } from "@/components/concept-explorer";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { prompts } from "@/data/prompts";
import { concepts } from "@/data/concepts";
import { PromptCard } from "@/components/prompt-card";

export const metadata: Metadata = {
  title: "Prompt Engineering",
  description: "Learn practical prompt engineering patterns for reliable AI output.",
};

const promptFormula = [
  {
    label: "Task",
    detail: "State the exact job the model should do, including the decision or artifact you need.",
  },
  {
    label: "Context",
    detail: "Provide only the facts, examples, code, files, audience, and constraints that change the answer.",
  },
  {
    label: "Criteria",
    detail: "Name quality bars, non-goals, edge cases, and the tradeoffs the model should optimize for.",
  },
  {
    label: "Format",
    detail: "Specify the response structure so the answer is easy to review, copy, parse, or compare.",
  },
];

const improvementExamples = [
  {
    weak: "Write tests for this code.",
    stronger:
      "Write unit tests for the `parseInvoice` function. Cover valid invoices, missing tax fields, malformed dates, and currency rounding. Use Vitest syntax and return only the test file.",
  },
  {
    weak: "Make this better.",
    stronger:
      "Rewrite this onboarding email for first-time developers. Keep it under 150 words, use a direct but friendly tone, preserve the setup link, and return the final copy plus 3 subject lines.",
  },
  {
    weak: "Explain RAG.",
    stronger:
      "Explain RAG to a backend engineer who knows search indexes but not embeddings. Include a mental model, one architecture diagram description, failure modes, and a checklist for evaluating answer quality.",
  },
];

const checklist = [
  "Does the prompt say what a successful answer should look like?",
  "Did you include the minimum evidence needed to avoid guessing?",
  "Are constraints and non-goals visible before the task begins?",
  "Is the output format explicit enough to verify quickly?",
  "Have you told the model what to do when information is missing?",
  "Can you reuse the prompt by replacing variables instead of rewriting it?",
];

export default function PromptEngineeringPage() {
  const promptEngineeringConcepts = concepts.filter((concept) => concept.section === "prompt-engineering");
  const featuredPrompts = prompts.filter((prompt) =>
    ["prompting", "json", "review", "examples", "evaluation", "decomposition"].some((tag) => prompt.tags.includes(tag)),
  );

  return (
    <SectionShell>
      <PageHeading
        eyebrow="Prompt Engineering"
        title="Prompts that specify task, context, constraints, and output"
        description="Good prompts reduce ambiguity. Use them to define the job, pack the right evidence, set boundaries, and make the response easy to verify."
      />

      <section className="glass-panel mb-8 p-5">
        <div className="mb-5 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">The practical prompt formula</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Most reliable prompts are not clever. They are explicit about the work, the evidence, the boundaries, and the expected shape of the answer.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promptFormula.map((item, index) => (
            <div key={item.label} className="rounded-lg border border-border bg-muted/50 p-4">
              <span className="text-xs font-medium text-primary">Part {index + 1}</span>
              <h3 className="mt-2 font-semibold text-foreground">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="glass-panel p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Weak prompt to strong prompt</h2>
          <div className="mt-5 space-y-4">
            {improvementExamples.map((example) => (
              <div key={example.weak} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-2">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Weak</span>
                  <p className="mt-2 text-sm leading-6 text-foreground">{example.weak}</p>
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">Stronger</span>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{example.stronger}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Prompt quality checklist</h2>
          <ul className="mt-5 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-muted/50 p-3 text-sm leading-6 text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConceptExplorer concepts={promptEngineeringConcepts} lockedSection="prompt-engineering" />

      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">Useful prompt patterns</h2>
        <div className="grid gap-5 xl:grid-cols-2">
          {featuredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
