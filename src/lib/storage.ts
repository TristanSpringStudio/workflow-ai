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

const KEYS = {
  profile: "wai-profile",
  votes: "wai-votes",
  tried: "wai-tried",
  submissions: "wai-submissions",
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
