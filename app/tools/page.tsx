import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  GitPullRequest,
  Laptop,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { SectionShell } from "@/components/section-shell";
import { aiTools } from "@/data/tools";
import { titleCase } from "@/lib/utils";
import type { ToolCategory } from "@/types/content";

export const metadata: Metadata = {
  title: "AI Tools and Agents",
  description: "Compare AI coding agents, terminal tools, IDE assistants, and model platforms.",
};

const categoryIcons = {
  "ide-agent": Laptop,
  "terminal-agent": TerminalSquare,
  "cloud-agent": Cloud,
  "model-platform": Bot,
} satisfies Record<ToolCategory, typeof Bot>;

const playbooks = [
  {
    title: "Inside the editor",
    description: "Use Cursor or Copilot when you want tight edit-review loops without leaving the IDE.",
    icon: Code2,
  },
  {
    title: "Inside the terminal",
    description: "Use Claude Code, opencode, Gemini CLI, or Codex CLI-style workflows when files, commands, and tests are the core loop.",
    icon: TerminalSquare,
  },
  {
    title: "Inside GitHub",
    description: "Use Copilot cloud agent or Codex-style background agents for issue-to-branch and pull request workflows.",
    icon: GitPullRequest,
  },
  {
    title: "Self-hosted or open model layer",
    description: "Use Hermes/Nous-style models when model control, local inference, or open-weight evaluation matters.",
    icon: ShieldCheck,
  },
];

export default function ToolsPage() {
  return (
    <SectionShell>
      <PageHeading
        eyebrow="AI Tools & Agents"
        title="Choose the right agent surface for the job"
        description="AI tools are not interchangeable. Some live in your editor, some operate from the terminal, some work in cloud branches, and some are model layers you pair with your own agent harness."
      />

      <div className="glass-panel mb-8 grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
        {playbooks.map((item) => (
          <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <item.icon className="h-5 w-5 text-cyan-200" />
            <h2 className="mt-3 font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {aiTools.map((tool) => {
          const Icon = categoryIcons[tool.category];

          return (
            <article key={tool.id} className="glass-card p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="glass-chip">{titleCase(tool.category)}</span>
                      <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{tool.name}</h2>
                    </div>
                    <Link
                      href={tool.href}
                      className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-3 text-sm font-medium text-slate-200 transition hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{tool.summary}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <h3 className="text-sm font-semibold text-slate-100">Best for</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tool.bestFor.map((item) => (
                      <span key={item} className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <h3 className="text-sm font-semibold text-slate-100">Context style</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{tool.contextStyle}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                  <h3 className="text-sm font-semibold text-slate-100">Watch out</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{tool.caution}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
