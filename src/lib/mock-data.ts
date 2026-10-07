// Temporary mock data for the dashboard UI. Replaced by Prisma queries once the database is set up.

export type ContentType = "TEXT" | "URL" | "FILE";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  contentType: ContentType;
  content: string | null;
  url: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "Mark Donatelli",
  email: "mark@example.com",
  image: null,
  isPro: true,
};

export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippet", slug: "snippets", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "Prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_command", name: "Command", slug: "commands", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_note", name: "Note", slug: "notes", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_link", name: "Link", slug: "links", icon: "Link", color: "#10b981", isSystem: true },
  { id: "type_file", name: "File", slug: "files", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "Image", slug: "images", icon: "Image", color: "#ec4899", isSystem: true },
];

export const collections: Collection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Hooks, components & the good stuff.",
    isFavorite: true,
    defaultTypeId: "type_snippet",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-10-07T08:00:00.000Z",
  },
  {
    id: "col_ai",
    name: "AI Toolkit",
    description: "Better prompts. Better outputs.",
    isFavorite: true,
    defaultTypeId: "type_prompt",
    createdAt: "2026-09-03T10:00:00.000Z",
    updatedAt: "2026-10-07T06:00:00.000Z",
  },
  {
    id: "col_dev",
    name: "Dev Essentials",
    description: "Your everyday development kit.",
    isFavorite: false,
    defaultTypeId: "type_command",
    createdAt: "2026-09-05T10:00:00.000Z",
    updatedAt: "2026-10-06T10:00:00.000Z",
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Small scripts, big time-savers.",
    isFavorite: false,
    defaultTypeId: "type_snippet",
    createdAt: "2026-09-08T10:00:00.000Z",
    updatedAt: "2026-10-04T10:00:00.000Z",
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "Project context for AI coding assistants.",
    isFavorite: false,
    defaultTypeId: "type_file",
    createdAt: "2026-09-10T10:00:00.000Z",
    updatedAt: "2026-10-05T10:00:00.000Z",
  },
  {
    id: "col_design",
    name: "Design References",
    description: "Visual inspiration for UI work.",
    isFavorite: false,
    defaultTypeId: "type_image",
    createdAt: "2026-09-12T10:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z",
  },
];

export const items: Item[] = [
  {
    id: "item_1",
    title: "useDebounce hook",
    description: "A lightweight hook to debounce any value.",
    contentType: "TEXT",
    content: `export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["react", "hooks", "typescript"],
    lastUsedAt: "2026-10-07T08:00:00.000Z",
    createdAt: "2026-09-20T10:00:00.000Z",
    updatedAt: "2026-10-07T08:00:00.000Z",
  },
  {
    id: "item_2",
    title: "Senior code reviewer",
    description: "A second pair of eyes for your pull requests.",
    contentType: "TEXT",
    content: `You are a senior software engineer reviewing a pull request.

Focus on:
- Readability and maintainability
- Potential edge cases
- Performance implications

Give actionable feedback with clear examples. Be concise, constructive and specific.`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: null,
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai"],
    tags: ["code-review", "chatgpt"],
    lastUsedAt: "2026-10-07T06:00:00.000Z",
    createdAt: "2026-09-21T10:00:00.000Z",
    updatedAt: "2026-10-07T06:00:00.000Z",
  },
  {
    id: "item_3",
    title: "Undo last Git commit",
    description: "Undo a commit, keep your changes staged.",
    contentType: "TEXT",
    content: `# Undo the last commit
# Keep changes in the staging area
git reset --soft HEAD~1

# Or unstage the changes too
git reset HEAD~1`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "bash",
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type_command",
    collectionIds: ["col_dev"],
    tags: ["git", "terminal"],
    lastUsedAt: "2026-10-06T10:00:00.000Z",
    createdAt: "2026-09-22T10:00:00.000Z",
    updatedAt: "2026-10-06T10:00:00.000Z",
  },
  {
    id: "item_4",
    title: "shadcn/ui",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    contentType: "URL",
    content: null,
    url: "https://ui.shadcn.com",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: null,
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_link",
    collectionIds: ["col_dev"],
    tags: ["ui", "components", "reference"],
    lastUsedAt: "2026-10-06T09:00:00.000Z",
    createdAt: "2026-09-23T10:00:00.000Z",
    updatedAt: "2026-10-06T09:00:00.000Z",
  },
  {
    id: "item_5",
    title: "API design checklist",
    description: "A few things to check before shipping an API.",
    contentType: "TEXT",
    content: `## Before you ship

- [x] Use consistent resource naming
- [x] Validate every input
- [x] Return meaningful status codes
- [ ] Add pagination to list endpoints
- [ ] Document rate limits
- [ ] Version your breaking changes`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "markdown",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_dev"],
    tags: ["api", "best-practices"],
    lastUsedAt: "2026-10-05T10:00:00.000Z",
    createdAt: "2026-09-24T10:00:00.000Z",
    updatedAt: "2026-10-05T10:00:00.000Z",
  },
  {
    id: "item_6",
    title: "Project context",
    description: "The big picture for my AI coding assistant.",
    contentType: "FILE",
    content: null,
    url: null,
    fileUrl: "/mock/project-context.md",
    fileName: "project-context.md",
    fileSize: 4300,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_file",
    collectionIds: ["col_context", "col_ai"],
    tags: ["context", "markdown"],
    lastUsedAt: "2026-10-05T09:00:00.000Z",
    createdAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-10-05T09:00:00.000Z",
  },
  {
    id: "item_7",
    title: "Fetch with retry",
    description: "A little resilience for your network requests.",
    contentType: "TEXT",
    content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
  throw new Error("Unreachable");
}`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "typescript",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["typescript", "fetch"],
    lastUsedAt: "2026-10-04T10:00:00.000Z",
    createdAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-10-04T10:00:00.000Z",
  },
  {
    id: "item_8",
    title: "Explain it like I'm new",
    description: "Turn complex concepts into clear explanations.",
    contentType: "TEXT",
    content: `Explain the following concept to a developer who is encountering it for the first time.

Start with a simple analogy, then walk through a practical example. Avoid jargon where possible.`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai"],
    tags: ["learning", "explain"],
    lastUsedAt: "2026-10-04T09:00:00.000Z",
    createdAt: "2026-09-27T10:00:00.000Z",
    updatedAt: "2026-10-04T09:00:00.000Z",
  },
  {
    id: "item_9",
    title: "Interface inspiration",
    description: "Exploring shapes, balance, and a little green.",
    contentType: "FILE",
    content: null,
    url: null,
    fileUrl: "/mock/interface-inspiration.png",
    fileName: "interface-inspiration.png",
    fileSize: 248000,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_image",
    collectionIds: ["col_design"],
    tags: ["design", "inspiration"],
    lastUsedAt: "2026-10-03T10:00:00.000Z",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z",
  },
  {
    id: "item_10",
    title: "Read a CSV file",
    description: "Load rows from a CSV into dictionaries.",
    contentType: "TEXT",
    content: `import csv

with open("data.csv", newline="") as f:
    rows = list(csv.DictReader(f))`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "python",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_python"],
    tags: ["python", "csv"],
    lastUsedAt: null,
    createdAt: "2026-09-29T10:00:00.000Z",
    updatedAt: "2026-10-02T10:00:00.000Z",
  },
  {
    id: "item_11",
    title: "Python docs",
    description: "The official Python 3 documentation.",
    contentType: "URL",
    content: null,
    url: "https://docs.python.org/3/",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_link",
    collectionIds: ["col_python"],
    tags: ["python", "reference"],
    lastUsedAt: null,
    createdAt: "2026-09-30T10:00:00.000Z",
    updatedAt: "2026-10-01T10:00:00.000Z",
  },
  {
    id: "item_12",
    title: "Kill process on a port",
    description: "Free up a port that's already in use.",
    contentType: "TEXT",
    content: `lsof -ti :3000 | xargs kill`,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    language: "bash",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: ["col_dev"],
    tags: ["terminal", "ports"],
    lastUsedAt: "2026-10-01T10:00:00.000Z",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:00:00.000Z",
  },
];
