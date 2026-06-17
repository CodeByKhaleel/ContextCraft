import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, Newspaper, Radio, RefreshCw } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { getLatestAiNews } from "@/lib/ai-news";
import type { NewsArticle } from "@/types/news";

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
        eyebrow="Live AI News"
        title="The latest developments in AI"
        description="A regularly refreshed feed of product announcements, research updates, company news, and industry reporting from trusted AI sources."
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

      {articles.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} featured={index === 0} />
          ))}
        </div>
      ) : (
        <div className="glass-panel grid min-h-64 place-items-center p-8 text-center">
          <div>
            <Newspaper className="mx-auto h-8 w-8 text-slate-500" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              News feeds are temporarily unavailable
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              The page will retry its sources automatically on the next refresh.
            </p>
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function NewsCard({
  article,
  featured,
}: {
  article: NewsArticle;
  featured: boolean;
}) {
  return (
    <article
      className={`glass-card glass-card-hover flex h-full flex-col p-4 sm:p-5 ${
        featured ? "border-blue-300 xl:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-md border px-2 py-1 ${
            article.source.kind === "Official"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
          }`}
        >
          {article.source.name}
        </span>
        {article.category ? <span className="glass-chip">{article.category}</span> : null}
        <span className="ml-auto inline-flex items-center gap-1.5 text-slate-500">
          <Clock3 className="h-3.5 w-3.5" />
          <time dateTime={article.publishedAt}>
            {formatPublishedDate(article.publishedAt)}
          </time>
        </span>
      </div>

      <h2
        className={`mt-4 font-semibold tracking-tight text-foreground ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        {article.title}
      </h2>

      {article.description ? (
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
          {article.description}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="text-xs text-slate-500">
          {article.author ? `By ${article.author}` : article.source.kind}
        </span>
        <Link
          href={article.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-blue-700"
        >
          Read original
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
