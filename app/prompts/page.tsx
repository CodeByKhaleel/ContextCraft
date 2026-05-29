import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { PromptLibrary } from "@/components/prompt-library";
import { SectionShell } from "@/components/section-shell";
import { prompts } from "@/data/prompts";

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "Search and copy practical AI prompt templates.",
};

export default function PromptsPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="Prompt Library"
        title="Copy-ready prompts for real tasks"
        description="Search, filter, and reuse prompt templates for coding, research, productivity, learning, and writing."
      />
      <PromptLibrary prompts={prompts} />
    </SectionShell>
  );
}
