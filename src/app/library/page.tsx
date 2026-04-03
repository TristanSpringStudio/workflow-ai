"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  workflows,
  CATEGORY_LABELS,
  getAllCategories,
  getAllRoles,
  getAllTags,
  type Category,
} from "@/lib/workflows";
import { getProfile, getVotes, toggleVote, getTriedWorkflows } from "@/lib/storage";
import MiniTrend from "@/components/MiniTrend";
import ToolBadge from "@/components/ToolBadge";
import Nav from "@/components/Nav";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"impact" | "difficulty" | "popular" | "score">("score");
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [tried, setTried] = useState<Record<string, boolean>>({});
  const [hasProfile, setHasProfile] = useState(false);

  const categories = getAllCategories();
  const roles = getAllRoles();
  const tags = getAllTags();

  useEffect(() => {
    setVotes(getVotes());
    setTried(getTriedWorkflows());
    setHasProfile(!!getProfile());
  }, []);

  const handleVote = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVote(slug);
    setVotes(getVotes());
  };

  const filtered = useMemo(() => {
    let result = [...workflows];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.subtitle.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.includes(q)) ||
          w.tools.some((t) => t.toLowerCase().includes(q)) ||
          w.roles.some((r) => r.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== "all") result = result.filter((w) => w.category === selectedCategory);
    if (selectedRole !== "all") result = result.filter((w) => w.roles.includes(selectedRole));
    if (selectedDifficulty !== "all") result = result.filter((w) => w.difficulty === selectedDifficulty);
    if (selectedTag !== "all") result = result.filter((w) => w.tags.includes(selectedTag));

    const impactOrder = { high: 0, medium: 1, low: 2 };
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

    if (sortBy === "score") result.sort((a, b) => b.score - a.score);
    else if (sortBy === "impact") result.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);
    else if (sortBy === "difficulty") result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    else result.sort((a, b) => (votes[b.slug] ? 1 : 0) - (votes[a.slug] ? 1 : 0));

    return result;
  }, [search, selectedCategory, selectedRole, selectedDifficulty, selectedTag, sortBy, votes]);

  const hasFilters =
    selectedCategory !== "all" || selectedRole !== "all" || selectedDifficulty !== "all" || selectedTag !== "all" || search !== "";

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Workflow library
        </h1>
        <p className="mt-2 text-muted text-[15px]">
          Browse, filter, and find the right AI workflow for your role.
        </p>
      </header>

      {/* Search + Filters */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workflows, tools, roles..."
          className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-[14px] placeholder:text-muted-light focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all mb-4"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-foreground text-background"
                : "bg-surface text-muted hover:text-foreground border border-border"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? "all" : cat)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-surface text-muted hover:text-foreground border border-border"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}

          <div className="w-px h-5 bg-border mx-1" />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-surface border border-border text-muted focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="all">All roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-surface border border-border text-muted focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="all">Any difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-surface border border-border text-muted focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="all">All tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>#{tag}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "impact" | "difficulty" | "popular" | "score")}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-surface border border-border text-muted focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="score">Sort: Score</option>
            <option value="impact">Sort: Impact</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="popular">Sort: Popular</option>
          </select>

          {hasFilters && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedRole("all");
                setSelectedDifficulty("all");
                setSelectedTag("all");
                setSearch("");
              }}
              className="text-[12px] text-muted hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <p className="mt-3 text-[12px] text-muted-light">
          {filtered.length} workflow{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((workflow) => (
            <Link
              key={workflow.slug}
              href={`/workflow/${workflow.slug}`}
              className="group relative block p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
            >
              {tried[workflow.slug] && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface text-muted border border-border">
                  {CATEGORY_LABELS[workflow.category]}
                </span>
                <MiniTrend points={workflow.trend.points} />
              </div>

              <h2 className="text-[15px] font-semibold leading-snug group-hover:text-accent transition-colors pr-6">
                {workflow.title}
              </h2>
              <p className="mt-1 text-[13px] text-muted leading-relaxed">
                {workflow.subtitle}
              </p>

              <div className="mt-3 flex items-center gap-3 text-[12px]">
                <span className="font-semibold text-green-600">{workflow.score}</span>
                <span className="text-muted-light">{workflow.timeToSetup} setup</span>
                <span className="w-px h-3 bg-border" />
                <span className="text-muted-light">{workflow.timeSaved} saved</span>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {workflow.tools.slice(0, 3).map((tool) => (
                    <ToolBadge key={tool} tool={tool} size="sm" />
                  ))}
                </div>
                <button
                  onClick={(e) => handleVote(workflow.slug, e)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] transition-colors ${
                    votes[workflow.slug] ? "text-accent bg-accent/10" : "text-muted-light hover:text-muted"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={votes[workflow.slug] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted">No workflows match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedRole("all");
                setSelectedDifficulty("all");
                setSelectedTag("all");
                setSearch("");
              }}
              className="mt-2 text-accent text-sm hover:text-accent-hover"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
