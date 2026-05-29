import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { workflows } from "@/data/workflows";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Workflows",
  description: "Repeatable AI workflows for debugging, code review, research, learning, and planning.",
};

export default function WorkflowsPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="AI Workflows"
        title="Repeatable systems for common AI tasks"
        description="Use these workflows when you need a process, not a one-off prompt."
      />
      <div className="space-y-6">
        {workflows.map((workflow) => (
          <article
            key={workflow.id}
            id={workflow.id}
            className="glass-card scroll-mt-24 p-5"
          >
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="glass-chip">
                  {titleCase(workflow.audience)}
                </span>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{workflow.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{workflow.description}</p>
              </div>
            </div>
            <ol className="grid gap-3">
              {workflow.steps.map((step, index) => (
                <li key={step.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-slate-100">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.goal}</p>
                      {step.prompt ? <p className="mt-2 text-sm font-medium text-cyan-100">{step.prompt}</p> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
