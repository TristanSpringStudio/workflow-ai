"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getPersonalizedWorkflows,
  CATEGORY_LABELS,
  type Workflow,
} from "@/lib/workflows";
import {
  getProfile,
  clearProfile,
  getTriedWorkflows,
  getVotes,
  toggleVote,
  type UserProfile,
} from "@/lib/storage";

export default function PicksPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [picks, setPicks] = useState<Workflow[]>([]);
  const [tried, setTried] = useState<Record<string, boolean>>({});
  const [votes, setVotes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.push("/quiz");
      return;
    }
    setProfile(p);
    setPicks(getPersonalizedWorkflows(p));
    setTried(getTriedWorkflows());
    setVotes(getVotes());
  }, [router]);

  if (!profile) return null;

  const triedCount = Object.keys(tried).length;

  const handleVote = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVote(slug);
    setVotes(getVotes());
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            WorkflowAI
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[13px] text-muted hover:text-foreground transition-colors"
            >
              All workflows
            </Link>
            <button
              onClick={() => {
                clearProfile();
                router.push("/quiz");
              }}
              className="text-[13px] text-muted hover:text-foreground transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Your personalized workflows
          </h1>
          <p className="mt-2 text-muted">
            Based on your role as{" "}
            <span className="font-medium text-foreground">{profile.role}</span>{" "}
            and the tools you use.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10 p-5 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium">Your progress</span>
            <span className="text-[13px] text-muted">
              {triedCount} of {picks.length} tried
            </span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{
                width: `${picks.length > 0 ? (triedCount / picks.length) * 100 : 0}%`,
              }}
            />
          </div>
          {/* Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="text-[12px] text-muted-light mr-1">
              Your stack:
            </span>
            {profile.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded-full text-[11px] bg-background text-muted border border-border"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Picks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {picks.map((workflow) => (
            <Link
              key={workflow.slug}
              href={`/workflow/${workflow.slug}`}
              className="group relative block p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
            >
              {tried[workflow.slug] && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface text-muted border border-border">
                  {CATEGORY_LABELS[workflow.category]}
                </span>
                <span className="text-[11px] text-muted-light capitalize">
                  {workflow.difficulty}
                </span>
              </div>

              <h2 className="text-[15px] font-semibold leading-snug group-hover:text-accent transition-colors">
                {workflow.title}
              </h2>
              <p className="mt-1 text-[13px] text-muted leading-relaxed">
                {workflow.subtitle}
              </p>

              <div className="mt-3 flex items-center gap-4 text-[12px] text-muted-light">
                <span>{workflow.timeToSetup} setup</span>
                <span className="w-px h-3 bg-border" />
                <span>{workflow.timeSaved} saved</span>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {workflow.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md text-[11px] text-muted bg-surface border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => handleVote(workflow.slug, e)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] transition-colors ${
                    votes[workflow.slug]
                      ? "text-accent bg-accent/10"
                      : "text-muted-light hover:text-muted"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill={votes[workflow.slug] ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
