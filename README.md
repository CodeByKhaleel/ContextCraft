# ContextCraft

ContextCraft is a practical developer guide to AI systems, prompt engineering, and context engineering. It is built as a documentation-first web app with searchable prompts, concise concept pages, and repeatable AI workflows.

## Features

- AI basics reference pages
- Prompt engineering and context engineering guides
- Searchable prompt library with copy actions
- Workflow pages for debugging, code review, research, learning, and planning
- Global keyboard search with `/` or `Ctrl+K`
- Dark and light mode
- Responsive documentation layout

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Fuse.js
- Lucide icons
- MDX-ready configuration

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run build
```

## Project Structure

```txt
app/          Routes and global app shell
components/   Reusable UI and content components
data/         Prompt, concept, and workflow data
lib/          Shared utilities
types/        Shared TypeScript content models
```

## Scope

The current version focuses on the MVP: static content, prompt search, workflow guidance, and strong navigation. Accounts, saved prompts, AI API calls, and community submissions are intentionally left for later versions.
