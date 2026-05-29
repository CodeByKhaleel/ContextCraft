import Link from "next/link";
import { titleCase } from "@/lib/utils";
import type { ConceptPage } from "@/types/content";

export function ConceptList({ concepts }: { concepts: ConceptPage[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {concepts.map((concept) => (
        <Link
          key={concept.slug}
          href={`/concepts/${concept.slug}`}
          className="glass-card glass-card-hover p-5"
        >
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="glass-chip">
              {titleCase(concept.difficulty)}
            </span>
            <span className="glass-chip">
              {titleCase(concept.section)}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-white">{concept.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{concept.summary}</p>
        </Link>
      ))}
    </div>
  );
}
