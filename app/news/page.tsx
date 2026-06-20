import type { Metadata } from "next";
import Link from "next/link";
import { Radio, RefreshCw } from "lucide-react";
import { NewspaperReader } from "@/components/newspaper-reader";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { getLatestAiNews } from "@/lib/ai-news";

export const metadata: Metadata = {
  title: "Latest AI News",
  description:
    "Recent AI announcements and industry reporting from leading AI labs and technology publications.",
};

export const revalidate = 1800;

export default async function NewsPage() {
  const { articles, availableSources, unavailableSources, updatedAt } =
    await getLatestAiNews();

  return (
    <SectionShell>
      <PageHeading
        eyebrow="Live AI Newspaper"
        title="Read the latest AI news like a front page"
        description="A newspaper-style edition built from regularly refreshed AI announcements, research updates, company news, and industry reporting."
      >
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="glass-chip inline-flex items-center gap-2">
            <RefreshCw className="h-3.5 w-3.5 text-primary" />
            Updated {formatTimestamp(updatedAt)}
          </span>
          <span className="glass-chip inline-flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-emerald-600" />
            {availableSources.length} sources online
          </span>
        </div>
      </PageHeading>

      <section className="glass-panel mb-8 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-foreground">Sources</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Official publisher feeds, refreshed every 30 minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSources.map((source) => (
              <Link
                key={source.id}
                href={source.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:border-emerald-300"
              >
                {source.name}
                <span className="text-emerald-600">{source.kind}</span>
              </Link>
            ))}
          </div>
        </div>

        {unavailableSources.length > 0 ? (
          <p className="mt-4 border-t border-border pt-4 text-xs text-amber-700">
            Temporarily unavailable:{" "}
            {unavailableSources.map((source) => source.name).join(", ")}. Other
            feeds are still shown.
          </p>
        ) : null}
      </section>

      <NewspaperReader articles={articles} />
    </SectionShell>
  );
}

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(value));
}
