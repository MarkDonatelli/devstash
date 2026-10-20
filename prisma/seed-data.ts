import { DEMO_USER_EMAIL } from "../src/lib/db/users";

export const DEMO_USER = {
  email: DEMO_USER_EMAIL,
  name: "Demo User",
  password: "12345678",
  isPro: false,
};

// Previous demo user from src/lib/mock-data.ts, removed on seed
export const LEGACY_DEMO_EMAIL = "mark@example.com";

export const SYSTEM_TYPES = [
  { id: "type_snippet", name: "Snippet", slug: "snippets", icon: "Code", color: "#3b82f6" },
  { id: "type_prompt", name: "Prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6" },
  { id: "type_command", name: "Command", slug: "commands", icon: "Terminal", color: "#f97316" },
  { id: "type_note", name: "Note", slug: "notes", icon: "StickyNote", color: "#fde047" },
  { id: "type_file", name: "File", slug: "files", icon: "File", color: "#6b7280" },
  { id: "type_image", name: "Image", slug: "images", icon: "Image", color: "#ec4899" },
  { id: "type_link", name: "Link", slug: "links", icon: "Link", color: "#10b981" },
];

export interface SeedItem {
  title: string;
  description: string;
  typeId: string;
  content?: string;
  url?: string;
  language?: string;
  tags: string[];
  isFavorite?: boolean;
  isPinned?: boolean;
}

export interface SeedCollection {
  name: string;
  description: string;
  defaultTypeId: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

export const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultTypeId: "type_snippet",
    isFavorite: true,
    items: [
      {
        title: "useDebounce & useLocalStorage",
        description: "Debounce a fast-changing value and persist state to localStorage",
        typeId: "type_snippet",
        language: "typescript",
        tags: ["react", "hooks"],
        isPinned: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        title: "Context provider & compound components",
        description: "Typed context with a safe hook, used to build a compound Tabs component",
        typeId: "type_snippet",
        language: "typescript",
        tags: ["react", "patterns", "context"],
        isFavorite: true,
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div>{children}</div> : null;
};`,
      },
      {
        title: "cn, formatDate & sleep utilities",
        description: "Small helpers that show up in every React project",
        typeId: "type_snippet",
        language: "typescript",
        tags: ["typescript", "utils"],
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(date));
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultTypeId: "type_prompt",
    isFavorite: true,
    items: [
      {
        title: "Code review prompt",
        description: "Thorough review focused on bugs, security and readability",
        typeId: "type_prompt",
        tags: ["ai", "code-review"],
        isPinned: true,
        content: `You are a senior engineer reviewing a pull request.

Review the code below and report, in order of severity:
1. Bugs and logic errors, including edge cases
2. Security issues (input validation, auth checks, injection)
3. Performance problems (unnecessary work, N+1 queries, re-renders)
4. Readability and naming

For each finding, quote the relevant line, explain the problem in one or two sentences and suggest a fix. Skip style nitpicks a formatter would catch. If the code looks good, say so.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        title: "Documentation generator",
        description: "Turn a module into a README section with usage examples",
        typeId: "type_prompt",
        tags: ["ai", "docs"],
        content: `Write documentation for the following module.

Include:
- A one-paragraph overview of what it does and when to use it
- Each exported function or component with its parameters, return value and a short example
- Any gotchas or side effects

Use Markdown with headings and fenced code blocks. Keep it concise; don't restate what the type signatures already make obvious.

\`\`\`
{{code}}
\`\`\``,
      },
      {
        title: "Refactoring assistant",
        description: "Refactor for clarity without changing behavior",
        typeId: "type_prompt",
        tags: ["ai", "refactoring"],
        content: `Refactor the code below to make it easier to read and maintain.

Rules:
- Do not change its external behavior or public API
- Prefer small, well-named functions over comments
- Remove duplication and dead code
- Keep the existing language, framework and style conventions

Return the refactored code, then a short bullet list of what you changed and why.

\`\`\`
{{code}}
\`\`\``,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultTypeId: "type_snippet",
    items: [
      {
        title: "Node.js multi-stage Dockerfile",
        description: "Small production image for a Next.js app",
        typeId: "type_snippet",
        language: "dockerfile",
        tags: ["docker", "nextjs"],
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy with migrations",
        description: "Run pending Prisma migrations, then build and restart the app",
        typeId: "type_command",
        language: "bash",
        tags: ["deploy", "prisma"],
        content: `npx prisma migrate deploy && npm run build && pm2 restart devstash`,
      },
      {
        title: "Docker Compose docs",
        description: "Reference for defining multi-container apps",
        typeId: "type_link",
        url: "https://docs.docker.com/compose/",
        tags: ["docker", "docs"],
      },
      {
        title: "GitHub Actions docs",
        description: "Workflows, runners and CI/CD with GitHub Actions",
        typeId: "type_link",
        url: "https://docs.github.com/en/actions",
        tags: ["ci", "docs"],
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultTypeId: "type_command",
    items: [
      {
        title: "Undo last commit, keep changes",
        description: "Move HEAD back one commit and leave the changes staged",
        typeId: "type_command",
        language: "bash",
        tags: ["git"],
        isFavorite: true,
        content: `git reset --soft HEAD~1`,
      },
      {
        title: "Clean up Docker",
        description: "Remove stopped containers, unused networks, images and build cache",
        typeId: "type_command",
        language: "bash",
        tags: ["docker", "cleanup"],
        content: `docker system prune -a --volumes`,
      },
      {
        title: "Kill process on a port",
        description: "Free up a port held by a stuck dev server",
        typeId: "type_command",
        language: "bash",
        tags: ["process", "macos"],
        isPinned: true,
        content: `lsof -ti :3000 | xargs kill -9`,
      },
      {
        title: "Find outdated packages",
        description: "List dependencies with newer versions available",
        typeId: "type_command",
        language: "bash",
        tags: ["npm"],
        content: `npm outdated`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultTypeId: "type_link",
    items: [
      {
        title: "Tailwind CSS docs",
        description: "Utility class reference for Tailwind CSS",
        typeId: "type_link",
        url: "https://tailwindcss.com/docs",
        tags: ["css", "tailwind"],
        isFavorite: true,
      },
      {
        title: "shadcn/ui",
        description: "Accessible components you copy into your project",
        typeId: "type_link",
        url: "https://ui.shadcn.com",
        tags: ["components", "react"],
      },
      {
        title: "Material Design 3",
        description: "Google's design system: guidelines, components and tokens",
        typeId: "type_link",
        url: "https://m3.material.io",
        tags: ["design-system"],
      },
      {
        title: "Lucide icons",
        description: "Open-source icon library used by shadcn/ui",
        typeId: "type_link",
        url: "https://lucide.dev/icons",
        tags: ["icons"],
      },
    ],
  },
];
