import type { Workflow } from "@/types/content";

export const workflows: Workflow[] = [
  {
    id: "debugging-loop",
    title: "AI Debugging Loop",
    description: "A repeatable loop for diagnosing errors without hiding important context.",
    audience: "developer",
    steps: [
      { title: "Frame the failure", goal: "State what should happen and what actually happens." },
      { title: "Pack evidence", goal: "Include code, logs, versions, and attempts.", prompt: "Use the Debug an Error With Context prompt." },
      { title: "Ask for hypotheses", goal: "Request ranked causes before code changes." },
      { title: "Verify locally", goal: "Run the smallest test or reproduction that proves the cause." },
      { title: "Patch and review", goal: "Apply the smallest fix and ask for regression risks." },
    ],
  },
  {
    id: "code-review-system",
    title: "AI Code Review System",
    description: "Use AI as a review assistant focused on correctness and missing tests.",
    audience: "developer",
    steps: [
      { title: "Provide the change goal", goal: "Explain why the change exists." },
      { title: "Share the diff", goal: "Include the smallest useful diff plus tests." },
      { title: "Request findings first", goal: "Ask for bugs, regressions, and risk before style comments.", prompt: "Use the Senior Code Review prompt." },
      { title: "Resolve findings", goal: "Patch only confirmed issues or document why a finding is not valid." },
    ],
  },
  {
    id: "research-briefing",
    title: "Research Briefing Workflow",
    description: "Move from sources and notes to a decision-ready summary.",
    audience: "professional",
    steps: [
      { title: "Define the decision", goal: "Name the question the research must answer." },
      { title: "Collect source notes", goal: "Separate quotes, facts, and opinions." },
      { title: "Create the brief", goal: "Summarize evidence, risks, uncertainties, and recommendations.", prompt: "Use the Research Brief prompt." },
      { title: "Verify claims", goal: "Check all facts that could affect a decision." },
    ],
  },
  {
    id: "learning-loop",
    title: "Concept Learning Loop",
    description: "Learn a new AI concept through explanation, example, and recall.",
    audience: "student",
    steps: [
      { title: "State your background", goal: "Tell the model what you already know." },
      { title: "Ask for a layered explanation", goal: "Get plain language, example, and common mistakes.", prompt: "Use the Learn a Concept Deeply prompt." },
      { title: "Practice recall", goal: "Answer a short quiz without looking." },
      { title: "Apply it", goal: "Use the concept in a small prompt or workflow." },
    ],
  },
  {
    id: "planning-brief",
    title: "Planning Brief Workflow",
    description: "Turn an ambiguous idea into a clear implementation plan.",
    audience: "developer",
    steps: [
      { title: "Define goal and non-goals", goal: "Set boundaries before asking for a plan." },
      { title: "List constraints", goal: "Name time, stack, compatibility, and operational limits." },
      { title: "Compare options", goal: "Ask for alternatives and tradeoffs.", prompt: "Use the Compare Architecture Options prompt." },
      { title: "Pick first milestone", goal: "Choose the smallest useful deliverable." },
    ],
  },
  {
    id: "ai-refactoring",
    title: "AI-Assisted Refactoring Workflow",
    description: "Safely refactor a codebase with AI by scoping, planning, incremental changes, and verification.",
    audience: "developer",
    steps: [
      { title: "Define the refactoring goal", goal: "State what improves and what must not break.", prompt: "Use the Compare Architecture Options prompt." },
      { title: "Scope the blast radius", goal: "Identify affected files, tests, and downstream consumers." },
      { title: "Plan incremental steps", goal: "Break the refactor into reviewable, reversible chunks.", prompt: "Use the Reasoning Step by Step prompt." },
      { title: "Apply one chunk at a time", goal: "Let AI implement a single chunk, then verify tests pass." },
      { title: "Review and document", goal: "Ask for a summary of what changed and why.", prompt: "Use the Senior Code Review prompt." },
    ],
  },
  {
    id: "ai-pair-programming",
    title: "AI Pair Programming Workflow",
    description: "Collaborate with an AI coding partner through clarifying questions, small increments, and continuous verification.",
    audience: "developer",
    steps: [
      { title: "Describe the task", goal: "State what you want to build or fix in plain language." },
      { title: "Answer clarifying questions", goal: "Let the AI ask up to 3 questions before it writes code.", prompt: "Use the AI Pair Programmer prompt." },
      { title: "Review the proposed approach", goal: "Confirm or correct the plan before any code is written." },
      { title: "Apply the first small change", goal: "Accept only the smallest useful increment." },
      { title: "Run tests and verify", goal: "Confirm the change works before asking for the next step." },
    ],
  },
];
