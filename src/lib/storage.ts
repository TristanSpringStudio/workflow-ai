// User profile from quiz
export interface UserProfile {
  role: string;
  tasks: string[];
  tools: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
}

// Community submission
export interface WorkflowSubmission {
  id: string;
  title: string;
  description: string;
  category: string;
  tools: string;
  submittedAt: string;
}

// Custom workflow from generator
export interface CustomWorkflow {
  id: string;
  title: string;
  trigger: string;
  steps: { title: string; body: string }[];
  decisionPoints: { question: string; aiSays: string; youDecide: string }[];
  output: string;
  aiHelps: string[];
  youCall: string[];
  tools: string[];
  createdAt: string;
}

const KEYS = {
  profile: "wai-profile",
  votes: "wai-votes",
  tried: "wai-tried",
  submissions: "wai-submissions",
  bookmarks: "wai-bookmarks",
  customWorkflows: "wai-custom-workflows",
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Profile
export function saveProfile(profile: UserProfile) {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  if (!isBrowser()) return null;
  const data = localStorage.getItem(KEYS.profile);
  return data ? JSON.parse(data) : null;
}

export function clearProfile() {
  if (!isBrowser()) return;
  localStorage.removeItem(KEYS.profile);
}

// Votes (upvotes)
export function getVotes(): Record<string, boolean> {
  if (!isBrowser()) return {};
  const data = localStorage.getItem(KEYS.votes);
  return data ? JSON.parse(data) : {};
}

export function toggleVote(slug: string): boolean {
  const votes = getVotes();
  if (votes[slug]) {
    delete votes[slug];
  } else {
    votes[slug] = true;
  }
  localStorage.setItem(KEYS.votes, JSON.stringify(votes));
  return !!votes[slug];
}

export function isVoted(slug: string): boolean {
  return !!getVotes()[slug];
}

export function getVoteCount(): number {
  return Object.keys(getVotes()).length;
}

// Tried-it tracking
export function getTriedWorkflows(): Record<string, boolean> {
  if (!isBrowser()) return {};
  const data = localStorage.getItem(KEYS.tried);
  return data ? JSON.parse(data) : {};
}

export function toggleTried(slug: string): boolean {
  const tried = getTriedWorkflows();
  if (tried[slug]) {
    delete tried[slug];
  } else {
    tried[slug] = true;
  }
  localStorage.setItem(KEYS.tried, JSON.stringify(tried));
  return !!tried[slug];
}

export function isTried(slug: string): boolean {
  return !!getTriedWorkflows()[slug];
}

export function getTriedCount(): number {
  return Object.keys(getTriedWorkflows()).length;
}

// Community submissions
export function getSubmissions(): WorkflowSubmission[] {
  if (!isBrowser()) return [];
  const data = localStorage.getItem(KEYS.submissions);
  return data ? JSON.parse(data) : [];
}

export function addSubmission(
  submission: Omit<WorkflowSubmission, "id" | "submittedAt">
) {
  const submissions = getSubmissions();
  submissions.push({
    ...submission,
    id: Math.random().toString(36).slice(2),
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem(KEYS.submissions, JSON.stringify(submissions));
}

// Bookmarks (saved library workflows by slug)
export function getBookmarks(): string[] {
  if (!isBrowser()) return [];
  const data = localStorage.getItem(KEYS.bookmarks);
  return data ? JSON.parse(data) : [];
}

export function toggleBookmark(slug: string): boolean {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(slug);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(slug);
  }
  localStorage.setItem(KEYS.bookmarks, JSON.stringify(bookmarks));
  return bookmarks.includes(slug);
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}

export function getBookmarkCount(): number {
  return getBookmarks().length;
}

// Custom workflows (from generator)
export function getCustomWorkflows(): CustomWorkflow[] {
  if (!isBrowser()) return [];
  const data = localStorage.getItem(KEYS.customWorkflows);
  return data ? JSON.parse(data) : [];
}

export function saveCustomWorkflow(
  workflow: Omit<CustomWorkflow, "id" | "createdAt">
): CustomWorkflow {
  const all = getCustomWorkflows();
  const saved: CustomWorkflow = {
    ...workflow,
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
  };
  all.unshift(saved);
  localStorage.setItem(KEYS.customWorkflows, JSON.stringify(all));
  return saved;
}

export function deleteCustomWorkflow(id: string) {
  const all = getCustomWorkflows().filter((w) => w.id !== id);
  localStorage.setItem(KEYS.customWorkflows, JSON.stringify(all));
}

// Toolkit count (bookmarks + custom)
export function getToolkitCount(): number {
  return getBookmarks().length + getCustomWorkflows().length;
}
