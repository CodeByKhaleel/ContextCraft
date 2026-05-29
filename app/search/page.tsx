import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { PromptLibrary } from "@/components/prompt-library";
import { SectionShell } from "@/components/section-shell";
import { prompts } from "@/data/prompts";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ContextCraft prompts and references.",
};

export default function SearchPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="Search"
        title="Find a practical starting point"
        description="Use the global search shortcut with / or search the prompt library below."
      />
      <PromptLibrary prompts={prompts} />
    </SectionShell>
  );
}
