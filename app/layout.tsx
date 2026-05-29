import type { Metadata } from "next";
import "./globals.css";
import { GlobalSearch } from "@/components/global-search";
import { SiteHeader } from "@/components/site-header";
import { concepts } from "@/data/concepts";
import { prompts } from "@/data/prompts";
import { workflows } from "@/data/workflows";

export const metadata: Metadata = {
  title: {
    default: "ContextCraft",
    template: "%s | ContextCraft",
  },
  description:
    "A practical developer guide to AI systems, prompt engineering, and context engineering.",
  metadataBase: new URL("https://contextcraft.dev"),
  openGraph: {
    title: "ContextCraft",
    description:
      "A practical developer guide to AI systems, prompt engineering, and context engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        {children}
        <GlobalSearch prompts={prompts} concepts={concepts} workflows={workflows} />
      </body>
    </html>
  );
}
