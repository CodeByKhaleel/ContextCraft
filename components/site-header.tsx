"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, BookOpen, Bot, Braces, Boxes, GitBranch, Menu, Newspaper, Search, Workflow, X } from "lucide-react";
import { useState } from "react";
import { concepts } from "@/data/concepts";

const navItems = [
  { href: "/basics", label: "Basics", icon: BookOpen },
  { href: "/prompt-engineering", label: "Prompting", icon: Braces },
  { href: "/context-engineering", label: "Context", icon: GitBranch },
  { href: "/prompts", label: "Prompts", icon: Bot },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/tools", label: "Tools", icon: Boxes },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/limitations", label: "Limits", icon: AlertTriangle },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card px-2 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex h-14 items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              C
            </span>
            <span className="truncate">
              Context<span className="text-primary">Craft</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive(pathname, item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              href="/search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-blue-300 hover:bg-accent hover:text-accent-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-blue-300 hover:bg-accent hover:text-accent-foreground xl:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <nav className="grid grid-cols-2 gap-2 border-t border-border p-2 sm:grid-cols-3 xl:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-12 items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  isActive(pathname, item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function isActive(pathname: string, href: string) {
  if (pathname === href) return true;
  if (pathname.startsWith("/concepts/")) {
    const slug = pathname.split("/").filter(Boolean).pop();
    const concept = concepts.find((item) => item.slug === slug);
    if (!concept) return false;
    return `/${concept.section}` === href;
  }
  return href !== "/prompts" && pathname.startsWith(`${href}/`);
}
