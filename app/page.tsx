import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Code2,
  Diff,
  FileInput,
  FileOutput,
  Gauge,
  GitBranch,
  Layers3,
  Library,
  MoreHorizontal,
  Play,
  Settings2,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { concepts } from "@/data/concepts";
import { prompts } from "@/data/prompts";
import { workflows } from "@/data/workflows";

const cheatsheetTools = [
  { title: "Token Counter", description: "Type the token detail counter", icon: Gauge },
  { title: "Diff Viewer", description: "Compare prompt and API components", icon: Diff },
];

const templates = [
  { title: "Debugging Request", description: "Configure the debugging request", icon: Workflow },
  { title: "Code Review", description: "Review code with constraints", icon: Code2 },
  { title: "System Prompt", description: "Build a system prompt contract", icon: TerminalSquare },
];

const tokenChips = [
  ["Analyze", "bg-sky-400/25 text-sky-100 border-sky-300/30"],
  ["the", "bg-violet-400/25 text-violet-100 border-violet-300/30"],
  ["error", "bg-amber-400/25 text-amber-100 border-amber-300/30"],
  ["identify", "bg-cyan-400/25 text-cyan-100 border-cyan-300/30"],
  ["is", "bg-fuchsia-400/25 text-fuchsia-100 border-fuchsia-300/30"],
  ["unrelated", "bg-emerald-400/25 text-emerald-100 border-emerald-300/30"],
  ["tokens", "bg-rose-400/25 text-rose-100 border-rose-300/30"],
  ["Contract", "bg-violet-400/25 text-violet-100 border-violet-300/30"],
  ["writer", "bg-slate-400/20 text-slate-200 border-slate-300/20"],
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
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02030d] text-white">
      <section className="relative px-3 pb-10 pt-5 sm:px-5 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.22),transparent_34rem),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.2),transparent_30rem),linear-gradient(180deg,#030414_0%,#050617_52%,#02030d_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 border-t border-cyan-300/60 shadow-[inset_0_1px_0_rgba(125,211,252,0.8),0_0_80px_rgba(14,165,233,0.32)]" />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center sm:pt-16">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Interactive AI Playground & Workflows
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Token-aware prompt design, context pipelines, and reusable AI workflows inside one
              glassmorphic developer interface.
            </p>
          </div>

          <div className="grid min-h-[520px] overflow-hidden rounded-xl border border-white/12 bg-white/[0.035] shadow-[0_28px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:grid-cols-[290px_minmax(420px,1fr)_minmax(380px,0.95fr)]">
            <aside className="border-b border-white/10 bg-slate-950/20 p-4 lg:border-b-0 lg:border-r">
              <h2 className="text-base font-semibold">Cheatsheet</h2>
              <p className="mt-3 text-sm text-slate-400">Developer Tools</p>
              <div className="mt-3 space-y-3">
                {cheatsheetTools.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-white/[0.065] text-cyan-200">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-100">{item.title}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-8 text-sm text-slate-400">Templates</p>
              <div className="mt-3 space-y-3">
                {templates.map((item) => (
                  <Link
                    key={item.title}
                    href="/prompts"
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition hover:border-violet-300/40 hover:bg-violet-300/10"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-white/[0.065] text-violet-200">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-100">{item.title}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </aside>

            <section className="border-b border-white/10 bg-slate-950/16 lg:border-b-0 lg:border-r">
              <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
                <h2 className="font-semibold">Prompt Playground</h2>
                <div className="flex items-center gap-2">
                  <button className="inline-flex h-8 items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 text-xs text-slate-300">
                    <Play className="h-3.5 w-3.5" />
                    Pin
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-slate-300">
                    <Settings2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-slate-300">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="rounded-lg border border-white/10 bg-slate-900/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-200">Input Prompt</span>
                    <span className="text-xs text-slate-500">draft</span>
                  </div>
                  <pre className="min-h-[220px] whitespace-pre-wrap rounded-lg border border-cyan-200/10 bg-[#0b1024]/70 p-5 font-mono text-sm leading-6 text-slate-300 shadow-[inset_0_0_24px_rgba(14,165,233,0.06)]">
{`1  Analyze the regression in payment reconciliation
2  against serialized logs and contract tests.
3  Identify the smallest safe change and include
4  verification steps for the release process.`}
                  </pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
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

            <section className="bg-slate-950/16">
              <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
                <h2 className="font-semibold">Context Pipeline</h2>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                    Animated
                  </span>
                  <button className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-slate-300">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-cyan-200/12 bg-[#030716]/72 shadow-[inset_0_0_80px_rgba(14,165,233,0.08)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18),transparent_38%),linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:auto,34px_34px,34px_34px]" />
                  <div className="absolute left-[8%] top-[42%] flex items-center gap-3">
                    <PipelineNode icon={FileInput} label="Input" sublabel="Data" />
                    <NeonLine className="w-12" />
                    <PipelineNode icon={Gauge} label="Tokenizer" />
                    <NeonLine className="w-12" />
                    <div className="rounded-lg border border-cyan-300/55 bg-cyan-300/12 px-8 py-5 text-center shadow-[0_0_32px_rgba(34,211,238,0.45),inset_0_0_20px_rgba(34,211,238,0.14)]">
                      <Layers3 className="mx-auto h-8 w-8 text-cyan-200" />
                      <p className="mt-2 text-xs text-cyan-100">Context</p>
                      <p className="text-xs text-slate-400">Window</p>
                    </div>
                  </div>
                  <div className="absolute right-[9%] top-[41%] flex items-center gap-3">
                    <Bot className="h-12 w-12 text-cyan-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    <NeonLine className="w-10" />
                    <PipelineNode icon={FileOutput} label="Output" sublabel="Generation" />
                  </div>
                  <div className="absolute left-1/2 top-[14%] -translate-x-1/2">
                    <PipelineNode icon={FileInput} label="Data" />
                  </div>
                  <div className="absolute bottom-[13%] left-1/2 -translate-x-1/2">
                    <PipelineNode icon={FileInput} label="Data" sublabel="packets" />
                  </div>
                  <div className="absolute left-[22%] top-[23%] h-28 w-[56%] rounded-t-full border-x-2 border-t-2 border-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
                  <div className="absolute bottom-[22%] left-[19%] h-24 w-[62%] rounded-b-2xl border-x-2 border-b-2 border-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1440px] gap-4 px-5 pb-16 lg:grid-cols-4 lg:px-8">
        {featureCards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-white/10 bg-white/[0.045] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:shadow-[0_24px_80px_rgba(14,165,233,0.18)]"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                {item.metric}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200">
              Open
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
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
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/60 bg-cyan-300/12 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.48),inset_0_0_18px_rgba(34,211,238,0.12)]">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-2 text-xs text-cyan-100">{label}</p>
      {sublabel ? <p className="text-xs text-slate-400">{sublabel}</p> : null}
    </div>
  );
}

function NeonLine({ className }: { className?: string }) {
  return <span className={`h-0.5 bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.85)] ${className}`} />;
}
