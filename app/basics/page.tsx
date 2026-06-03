import type { Metadata } from "next";
import { ConceptExplorer } from "@/components/concept-explorer";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { concepts } from "@/data/concepts";

export const metadata: Metadata = {
  title: "AI Basics",
  description: "Learn core AI concepts such as LLMs, tokens, context windows, and embeddings.",
};

export default function BasicsPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="AI Basics"
        title="Core ideas before advanced prompting"
        description="Learn the vocabulary and mental models behind effective AI work."
      />
      <ConceptExplorer concepts={concepts} lockedSection="basics" />
    </SectionShell>
  );
}
