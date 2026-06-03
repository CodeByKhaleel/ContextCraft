import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { WorkflowExplorer } from "@/components/workflow-explorer";
import { prompts } from "@/data/prompts";
import { workflows } from "@/data/workflows";

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
      <WorkflowExplorer workflows={workflows} prompts={prompts} />
    </SectionShell>
  );
}
