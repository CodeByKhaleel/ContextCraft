"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Bot, GitBranch, Search, Workflow } from "lucide-react";

const navItems = [
  { href: "/prompts", label: "Playground", icon: Bot },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/basics", label: "Docs", icon: BookOpen },
  { href: "/context-engineering", label: "Context", icon: GitBranch },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[#02030d] px-3 pt-2 sm:px-5 lg:px-8">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 rounded-[22px] border border-cyan-300/45 bg-slate-950/50 px-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_34px_rgba(14,165,233,0.5),inset_0_0_28px_rgba(14,165,233,0.1)] backdrop-blur-2xl">
        <Link href="/" className="flex min-w-fit items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-300 text-sm font-bold text-white shadow-[0_0_24px_rgba(56,189,248,0.55)]">
            C
          </span>
          <span>
            Context<span className="text-cyan-300">Craft</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                pathname === item.href || (item.href !== "/prompts" && pathname.startsWith(item.href))
                  ? "border border-cyan-300/45 bg-cyan-300/18 text-white shadow-[0_0_18px_rgba(56,189,248,0.38)]"
                  : "text-slate-400 hover:bg-white/8 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-slate-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100 sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
