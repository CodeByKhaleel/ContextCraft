import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Clock3,
  Code2,
  Diff,
  FileInput,
  FileOutput,
  Gauge,
  GitBranch,
  Boxes,
  Layers3,
  Library,
  MoreHorizontal,
  Newspaper,
  Play,
  Settings2,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { concepts } from "@/data/concepts";
import { prompts } from "@/data/prompts";
import { workflows } from "@/data/workflows";
import { getLatestAiNews } from "@/lib/ai-news";
import type { NewsArticle } from "@/types/news";

export const revalidate = 1800;

const cheatsheetTools = [
  { title: "Token Basics", description: "Understand cost, speed, and context limits", icon: Gauge, href: "/concepts/tokens" },
  { title: "Review Workflow", description: "Compare a change against risks and tests", icon: Diff, href: "/workflows#code-review-system" },
];

const templates = [
  { title: "Debugging Request", description: "Configure the debugging request", icon: Workflow, href: "/prompts?prompt=debug-error-context" },
  { title: "Code Review", description: "Review code with constraints", icon: Code2, href: "/prompts?prompt=code-review-pass" },
  { title: "Structured Output", description: "Build a response contract", icon: TerminalSquare, href: "/prompts?prompt=structured-output-json" },
];

const tokenChips = [
  ["Analyze", "bg-sky-50 text-sky-700 border-sky-200"],
  ["the", "bg-violet-50 text-violet-700 border-violet-200"],
  ["error", "bg-amber-50 text-amber-700 border-amber-200"],
  ["identify", "bg-blue-50 text-blue-700 border-blue-200"],
  ["is", "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200"],
  ["unrelated", "bg-emerald-50 text-emerald-700 border-emerald-200"],
  ["tokens", "bg-rose-50 text-rose-700 border-rose-200"],
  ["Contract", "bg-violet-50 text-violet-700 border-violet-200"],
  ["writer", "bg-slate-50 text-slate-700 border-slate-200"],
];

const featureCards = [
  {
    href: "/prompt-engineering",
    title: "Prompt Engineering",
    description: "Design task frames, examples, rubrics, and output contracts.",
    icon: Braces,
    metric: "43 templates",
  },
  {
    href: "/context-engineering",
    title: "Context Pipelines",
    description: "Pack goals, evidence, constraints, source facts, and checks.",
    icon: GitBranch,
    metric: `${concepts.length} concepts`,
  },
  {
    href: "/workflows",
    title: "AI Workflows",
    description: "Repeatable systems for debugging, review, research, and planning.",
    icon: Workflow,
    metric: `${workflows.length} flows`,
  },
  {
    href: "/prompts",
    title: "Prompt Library",
    description: "Copy-ready prompts organized by job, difficulty, and concept.",
    icon: Library,
    metric: `${prompts.length} prompts`,
  },
  {
    href: "/tools",
    title: "AI Tools & Agents",
    description: "Compare Cursor, Claude Code, Codex, opencode, Gemini CLI, and model platforms.",
    icon: Boxes,
    metric: "8 tools",
  },
];

export default async function HomePage() {
  const { articles, updatedAt } = await getLatestAiNews();
  const topNews = articles.slice(0, 8);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="px-2 pb-8 pt-4 sm:px-5 sm:pb-10 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-5xl px-2 pb-6 pt-8 text-center sm:px-4 sm:pb-8 sm:pt-16">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Practical AI Prompts, Context, and Workflows
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              ContextCraft helps developers turn vague AI requests into clear prompts, packed
              context, and repeatable workflows. Now featuring interactive prompt templates.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
              <Link
                href="/prompts"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-blue-700"
              >
                Browse Prompts
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/workflows"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-blue-300 hover:bg-accent hover:text-accent-foreground"
              >
                Open Workflows
              </Link>
              <Link
                href="/basics"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold text-muted-foreground transition hover:border-blue-300 hover:bg-accent hover:text-accent-foreground"
              >
                Learn Basics
              </Link>
            </div>
          </div>

          <AiNewsScroller articles={topNews} updatedAt={updatedAt} />

          <div className="grid overflow-hidden rounded-lg border border-border bg-card shadow-soft lg:min-h-[520px] lg:grid-cols-[290px_minmax(420px,1fr)_minmax(380px,0.95fr)]">
            <aside className="border-b border-border bg-muted/40 p-4 lg:border-b-0 lg:border-r">
              <h2 className="text-base font-semibold">Cheatsheet</h2>
              <p className="mt-3 text-sm text-muted-foreground">Developer Tools</p>
              <div className="mt-3 space-y-3">
                {cheatsheetTools.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:border-blue-300 hover:bg-accent"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-blue-700">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-8 text-sm text-muted-foreground">Templates</p>
              <div className="mt-3 space-y-3">
                {templates.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition hover:border-violet-300 hover:bg-violet-50"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-violet-50 text-violet-700">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </aside>

            <section className="border-b border-border bg-card lg:border-b-0 lg:border-r">
              <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2 sm:h-14 sm:flex-nowrap sm:py-0">
                <h2 className="font-semibold">Prompt Playground</h2>
                <div className="flex items-center gap-2">
                  <button className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                    <Play className="h-3.5 w-3.5" />
                    Pin
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                    <Settings2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-5">
                <div className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Input Prompt</span>
                    <span className="text-xs text-slate-500">draft</span>
                  </div>
                  <pre className="min-h-40 whitespace-pre-wrap rounded-lg border border-border bg-card p-3 font-mono text-xs leading-6 text-foreground sm:min-h-[220px] sm:p-5 sm:text-sm">
{`1  Analyze the regression in payment reconciliation
2  against serialized logs and contract tests.
3  Identify the smallest safe change and include
4  verification steps for the release process.`}
                  </pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>Real-time tokenization:</span>
                  <span>Tokens: 35</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tokenChips.map(([label, className]) => (
                    <span key={label} className={`rounded-md border px-2.5 py-1 text-xs ${className}`}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-card">
              <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2 sm:h-14 sm:flex-nowrap sm:py-0">
                <h2 className="font-semibold">Context Pipeline</h2>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Animated
                  </span>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-5">
                <div className="relative hidden min-h-[360px] overflow-hidden rounded-xl border border-border bg-muted/40 sm:block">
                  <div className="absolute left-[8%] top-[42%] flex items-center gap-3">
                    <PipelineNode icon={FileInput} label="Input" sublabel="Data" />
                    <NeonLine className="w-12" />
                    <PipelineNode icon={Gauge} label="Tokenizer" />
                    <NeonLine className="w-12" />
                    <div className="rounded-lg border border-blue-200 bg-blue-50 px-8 py-5 text-center">
                      <Layers3 className="mx-auto h-8 w-8 text-blue-700" />
                      <p className="mt-2 text-xs font-medium text-blue-700">Context</p>
                      <p className="text-xs text-muted-foreground">Window</p>
                    </div>
                  </div>
                  <div className="absolute right-[9%] top-[41%] flex items-center gap-3">
                    <Bot className="h-12 w-12 text-blue-700" />
                    <NeonLine className="w-10" />
                    <PipelineNode icon={FileOutput} label="Output" sublabel="Generation" />
                  </div>
                  <div className="absolute left-1/2 top-[14%] -translate-x-1/2">
                    <PipelineNode icon={FileInput} label="Data" />
                  </div>
                  <div className="absolute bottom-[13%] left-1/2 -translate-x-1/2">
                    <PipelineNode icon={FileInput} label="Data" sublabel="packets" />
                  </div>
                  <div className="absolute left-[22%] top-[23%] h-28 w-[56%] rounded-t-full border-x-2 border-t-2 border-blue-300" />
                  <div className="absolute bottom-[22%] left-[19%] h-24 w-[62%] rounded-b-2xl border-x-2 border-b-2 border-blue-300" />
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-4 sm:hidden">
                  <div className="grid gap-3">
                    {[
                      { icon: FileInput, label: "Goal", sublabel: "What the answer must solve" },
                      { icon: Gauge, label: "Evidence", sublabel: "Logs, code, facts, examples" },
                      { icon: Layers3, label: "Context", sublabel: "Only the useful parts" },
                      { icon: Bot, label: "Model", sublabel: "Reason from packed input" },
                      { icon: FileOutput, label: "Output", sublabel: "Fix, risks, and checks" },
                    ].map((item, index, list) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-700">
                            <item.icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                            <span className="block text-xs leading-5 text-muted-foreground">{item.sublabel}</span>
                          </span>
                        </div>
                        {index < list.length - 1 ? (
                          <div className="ml-5 h-4 w-px bg-blue-200" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1440px] gap-4 px-3 pb-16 sm:grid-cols-2 sm:px-5 xl:grid-cols-5 xl:px-8">
        {featureCards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-border bg-card p-5 text-foreground shadow-soft transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                {item.metric}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Open
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function AiNewsScroller({
  articles,
  updatedAt,
}: {
  articles: NewsArticle[];
  updatedAt: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="mb-5 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <Newspaper className="h-4 w-4 text-primary" />
            AI News
          </span>
          <Link href="/news" className="font-medium text-primary transition hover:text-blue-700">
            Open news
          </Link>
        </div>
      </div>
    );
  }

  const scrollingArticles = [...articles, ...articles];

  return (
    <section
      aria-label="Latest AI news"
      className="mb-5 overflow-hidden rounded-lg border border-border bg-card shadow-soft"
    >
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <Link
          href="/news"
          className="flex shrink-0 items-center justify-between gap-4 rounded-md border border-border bg-muted/60 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-blue-300 hover:bg-accent"
        >
          <span className="inline-flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-primary" />
            AI News
          </span>
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </Link>

        <div className="relative min-w-0 flex-1 overflow-hidden py-1">
          <div className="ai-news-marquee flex w-max items-center gap-3">
            {scrollingArticles.map((article, index) => (
              <Link
                key={`${article.id}-${index}`}
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-10 max-w-[86vw] items-center gap-2 rounded-md border border-border bg-muted/60 px-3 text-sm text-foreground transition hover:border-blue-300 hover:bg-accent sm:max-w-[360px]"
              >
                <span className="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[11px] font-medium text-blue-700">
                  {article.source.name}
                </span>
                <span className="truncate">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5 text-primary" />
          <span>Updated {formatNewsTimestamp(updatedAt)}</span>
        </div>
      </div>
    </section>
  );
}

function formatNewsTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(value));
}

function PipelineNode({
  icon: Icon,
  label,
  sublabel,
}: {
  icon: typeof FileInput;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-2 text-xs font-medium text-blue-700">{label}</p>
      {sublabel ? <p className="text-xs text-muted-foreground">{sublabel}</p> : null}
    </div>
  );
}

function NeonLine({ className }: { className?: string }) {
  return <span className={`h-0.5 bg-blue-300 ${className}`} />;
}
