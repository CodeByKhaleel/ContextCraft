import type { Metadata } from "next";
import { ConceptList } from "@/components/concept-list";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { concepts } from "@/data/concepts";

export const metadata: Metadata = {
  title: "AI Mistakes and Limitations",
  description: "Understand hallucinations, weak context, false citations, and verification gaps.",
};

export default function LimitationsPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="Limitations"
        title="Use AI output with verification, not blind trust"
        description="AI systems can be useful and wrong at the same time. Build workflows that separate evidence, assumptions, and decisions."
      />
      <ConceptList concepts={concepts.filter((concept) => concept.section === "limitations")} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Verify current facts against primary sources.",
          "Ask for assumptions and unknowns separately.",
          "Require citations only when source material is available.",
        ].map((item) => (
          <div key={item} className="rounded-lg border border-border bg-card p-5 text-sm leading-6">
            {item}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
