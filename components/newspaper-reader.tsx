"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";
import type { NewsArticle } from "@/types/news";

const articlesPerPage = 6;
const turnDuration = 520;
type TurnDirection = "forward" | "backward" | null;

export function NewspaperReader({ articles }: { articles: NewsArticle[] }) {
  const [page, setPage] = useState(0);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>(null);
  const pages = useMemo(() => chunkArticles(articles, articlesPerPage), [articles]);
  const currentArticles = pages[page] ?? [];
  const lead = currentArticles[0];
  const secondary = currentArticles.slice(1, 3);
  const briefs = currentArticles.slice(3);
  const canGoBack = page > 0;
  const canGoForward = page < pages.length - 1;

  function turnPage(direction: Exclude<TurnDirection, null>) {
    turnToPage(direction === "forward" ? page + 1 : page - 1);
  }

  function turnToPage(nextPage: number) {
    if (nextPage < 0 || nextPage >= pages.length || nextPage === page || turnDirection) {
      return;
    }

    const direction = nextPage > page ? "forward" : "backward";

    setTurnDirection(direction);
    window.setTimeout(() => {
      setPage(nextPage);
      setTurnDirection(null);
    }, turnDuration);
  }

  if (articles.length === 0) {
    return (
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
    );
  }

  return (
    <section className="newsprint-surface overflow-hidden rounded-sm border border-neutral-950 bg-[#e7e5dc] text-neutral-950 shadow-[0_20px_60px_-36px_rgb(0_0_0_/_0.7)]">
      <div className="border-b-4 border-double border-neutral-950 px-4 py-5 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-700">
          ContextCraft Daily AI Edition
        </p>
        <h2 className="mt-2 font-serif text-4xl font-black leading-none tracking-tight text-black sm:text-6xl">
          The AI Gazette
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-y border-neutral-500 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
          <span>Latest dispatches</span>
          <span>Page {page + 1} of {pages.length}</span>
          <span>{articles.length} stories</span>
        </div>
      </div>

      <div className="relative [perspective:1800px]">
        <button
          type="button"
          onClick={() => turnPage("backward")}
          disabled={!canGoBack || Boolean(turnDirection)}
          className="group absolute inset-y-0 left-0 z-20 hidden w-16 cursor-w-resize items-center justify-start bg-gradient-to-r from-black/15 to-transparent pl-3 text-black opacity-0 transition hover:opacity-100 disabled:pointer-events-none lg:flex"
          aria-label="Turn to previous newspaper page"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-900 bg-[#e7e5dc]/95 shadow-soft transition group-hover:-translate-x-0.5">
            <ArrowLeft className="h-4 w-4" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => turnPage("forward")}
          disabled={!canGoForward || Boolean(turnDirection)}
          className="group absolute inset-y-0 right-0 z-20 hidden w-16 cursor-e-resize items-center justify-end bg-gradient-to-l from-black/15 to-transparent pr-3 text-black opacity-0 transition hover:opacity-100 disabled:pointer-events-none lg:flex"
          aria-label="Turn to next newspaper page"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-900 bg-[#e7e5dc]/95 shadow-soft transition group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>

        <div
          key={`${page}-${turnDirection ?? "settled"}`}
          className={`newspaper-page grid min-h-[540px] gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] ${
            turnDirection === "forward"
              ? "newspaper-page-turn-forward"
              : turnDirection === "backward"
                ? "newspaper-page-turn-backward"
                : ""
          }`}
        >
          <div className="border-neutral-500 p-4 sm:p-6 lg:border-r">
            {lead ? <LeadStory article={lead} /> : null}

            <div className="mt-6 grid gap-5 border-t border-neutral-500 pt-5 md:grid-cols-2">
              {secondary.map((article) => (
                <ColumnStory key={article.id} article={article} />
              ))}
            </div>
          </div>

          <aside className="newsprint-sidebar border-t border-neutral-500 bg-[#d6d6cf] p-4 sm:p-6 lg:border-t-0">
            <div className="border-b-2 border-neutral-950 pb-2">
              <h3 className="font-serif text-2xl font-black">Briefs</h3>
            </div>
            <div className="divide-y divide-neutral-500">
              {briefs.map((article) => (
                <BriefStory key={article.id} article={article} />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="newsprint-sidebar flex flex-col gap-3 border-t-4 border-double border-neutral-950 bg-[#d6d6cf] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => turnToPage(index)}
              className={`h-9 min-w-9 rounded-sm border px-3 text-sm font-semibold transition ${
                index === page
                  ? "border-black bg-black text-white"
                  : "border-neutral-700 bg-[#e7e5dc] text-neutral-900 hover:border-black hover:bg-[#d0d0ca]"
              }`}
              aria-label={`Open newspaper page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => turnPage("backward")}
            disabled={!canGoBack || Boolean(turnDirection)}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-neutral-700 bg-[#e7e5dc] px-3 text-sm font-semibold text-neutral-900 transition hover:border-black hover:bg-[#d0d0ca] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={() => turnPage("forward")}
            disabled={!canGoForward || Boolean(turnDirection)}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-black bg-black px-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next page
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function LeadStory({ article }: { article: NewsArticle }) {
  return (
    <article>
      <StoryMeta article={article} />
      <h3 className="mt-3 font-serif text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
        {article.title}
      </h3>
      {article.description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-800 sm:text-lg">
          {article.description}
        </p>
      ) : null}
      <ReadLink article={article} className="mt-5" />
    </article>
  );
}

function ColumnStory({ article }: { article: NewsArticle }) {
  return (
    <article className="border-neutral-500 md:border-l md:pl-5 first:md:border-l-0 first:md:pl-0">
      <StoryMeta article={article} />
      <h3 className="mt-3 font-serif text-2xl font-black leading-tight">
        {article.title}
      </h3>
      {article.description ? (
        <p className="mt-3 text-sm leading-6 text-neutral-800">{article.description}</p>
      ) : null}
      <ReadLink article={article} className="mt-4" />
    </article>
  );
}

function BriefStory({ article }: { article: NewsArticle }) {
  return (
    <article className="py-4">
      <StoryMeta article={article} compact />
      <h3 className="mt-2 font-serif text-xl font-black leading-tight">{article.title}</h3>
      <ReadLink article={article} className="mt-3" />
    </article>
  );
}

function StoryMeta({
  article,
  compact = false,
}: {
  article: NewsArticle;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 font-semibold uppercase tracking-[0.14em] text-neutral-700 ${
        compact ? "text-[10px]" : "text-xs"
      }`}
    >
      <span>{article.source.name}</span>
      <span className="text-neutral-500">/</span>
      <span className="inline-flex items-center gap-1">
        <Clock3 className="h-3 w-3" />
        {formatPublishedDate(article.publishedAt)}
      </span>
    </div>
  );
}

function ReadLink({
  article,
  className = "",
}: {
  article: NewsArticle;
  className?: string;
}) {
  return (
    <Link
      href={article.href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 border-b border-black text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white ${className}`}
    >
      Read story
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

function chunkArticles(articles: NewsArticle[], size: number): NewsArticle[][] {
  const chunks: NewsArticle[][] = [];
  for (let index = 0; index < articles.length; index += size) {
    chunks.push(articles.slice(index, index + size));
  }
  return chunks;
}

function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
