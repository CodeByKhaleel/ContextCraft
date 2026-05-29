import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sidebar = [
  { href: "/basics", label: "AI Basics" },
  { href: "/prompt-engineering", label: "Prompt Engineering" },
  { href: "/context-engineering", label: "Context Engineering" },
  { href: "/prompts", label: "Prompt Library" },
  { href: "/workflows", label: "AI Workflows" },
  { href: "/limitations", label: "Limitations" },
];

export function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02030d] px-3 pb-16 pt-8 text-white sm:px-5 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.18),transparent_34rem),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.18),transparent_30rem),linear-gradient(180deg,#030414_0%,#050617_52%,#02030d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 border-t border-cyan-300/45 shadow-[inset_0_1px_0_rgba(125,211,252,0.55),0_0_70px_rgba(14,165,233,0.22)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1 rounded-xl border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl">
            {sidebar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className={cn("min-w-0", className)}>{children}</main>
      </div>
    </div>
  );
}
