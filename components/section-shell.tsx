import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sidebar = [
  { href: "/basics", label: "AI Basics" },
  { href: "/prompt-engineering", label: "Prompt Engineering" },
  { href: "/context-engineering", label: "Context Engineering" },
  { href: "/prompts", label: "Prompt Library" },
  { href: "/workflows", label: "AI Workflows" },
  { href: "/tools", label: "AI Tools & Agents" },
  { href: "/news", label: "Latest AI News" },
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
    <div className="min-h-screen bg-background px-3 pb-16 pt-8 text-foreground sm:px-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1 rounded-xl border border-border bg-card p-2 shadow-soft">
            {sidebar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
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
