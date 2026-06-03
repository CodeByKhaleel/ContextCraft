export type Difficulty = "beginner" | "intermediate" | "advanced";

export type PromptCategory =
  | "coding"
  | "research"
  | "learning"
  | "productivity"
  | "writing";

export type PromptTemplate = {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  difficulty: Difficulty;
  tags: string[];
  useCase: string;
  prompt: string;
  variables?: {
    name: string;
    description: string;
    example: string;
  }[];
  expectedOutput?: string;
  relatedConcepts?: string[];
};

export type ConceptPage = {
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  section: "basics" | "prompt-engineering" | "context-engineering" | "limitations";
  whyItMatters: string;
  example: string;
  commonMistakes: string[];
  relatedPrompts: string[];
  relatedWorkflows: string[];
};

export type Workflow = {
  id: string;
  title: string;
  description: string;
  audience: "developer" | "student" | "professional";
  steps: {
    title: string;
    goal: string;
    prompt?: string;
    output?: string;
  }[];
};

export type ToolCategory = "ide-agent" | "terminal-agent" | "cloud-agent" | "model-platform";

export type AiTool = {
  id: string;
  name: string;
  category: ToolCategory;
  summary: string;
  bestFor: string[];
  contextStyle: string;
  caution: string;
  href: string;
};
