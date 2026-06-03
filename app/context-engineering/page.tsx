import type { Metadata } from "next";
import { ConceptExplorer } from "@/components/concept-explorer";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { concepts } from "@/data/concepts";

export const metadata: Metadata = {
  title: "Context Engineering",
  description: "Learn context packing, retrieval, memory, and tool-aware AI workflows.",
};

export default function ContextEngineeringPage() {
  const contextConcepts = concepts.filter((concept) => concept.section === "context-engineering");

  return (
    <SectionShell>
      <PageHeading
        eyebrow="Context Engineering"
        title="Give the model the right evidence in the right shape"
        description="Context engineering is the discipline of selecting, ordering, and verifying the information an AI system uses."
      />
      <div className="glass-panel mb-8 grid gap-3 p-5 md:grid-cols-5">
        {["Goal", "Facts", "Evidence", "Tools", "Verification"].map((item, index) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <span className="text-xs text-cyan-200/80">Step {index + 1}</span>
            <h2 className="mt-2 font-semibold text-white">{item}</h2>
          </div>
        ))}
      </div>
      <ConceptExplorer concepts={contextConcepts} lockedSection="context-engineering" />
    </SectionShell>
  );
}
