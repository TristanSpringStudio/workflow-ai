"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWorkflow,
  getRelatedWorkflows,
  CATEGORY_LABELS,
} from "@/lib/workflows";
import { isVoted, toggleVote, isTried, toggleTried, isBookmarked, toggleBookmark } from "@/lib/storage";
import TrendGraph from "@/components/TrendGraph";
import ToolBadge from "@/components/ToolBadge";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import Image from "next/image";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-surface border border-border hover:border-muted-light text-muted hover:text-foreground transition-colors"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90 ? "#16a34a" : score >= 80 ? "#2563eb" : score >= 70 ? "#d97706" : "#6b7280";

  return (
    <div className="relative w-[72px] h-[72px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[18px] font-bold" style={{ color }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export default function WorkflowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const workflow = getWorkflow(slug);

  if (!workflow) notFound();

  const related = getRelatedWorkflows(workflow);
  const nextWf = workflow.nextWorkflow
    ? getWorkflow(workflow.nextWorkflow)
    : undefined;

  const [voted, setVoted] = useState(false);
  const [triedIt, setTriedIt] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setVoted(isVoted(slug));
    setTriedIt(isTried(slug));
    setSaved(isBookmarked(slug));
  }, [slug]);

  const difficultyColor = {
    beginner: "bg-green-50 text-green-700 border-green-200",
    intermediate: "bg-blue-50 text-blue-700 border-blue-200",
    advanced: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const impactColor = {
    high: "bg-green-50 text-green-700 border-green-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            WorkflowAI
          </Link>
          <Link
            href="/"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            All workflows
          </Link>
        </div>
      </nav>

      {/* Header — full width */}
      <header className="border-b border-border bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href={`/category/${workflow.category}`}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent/10 text-accent border border-accent/20 hover:border-accent/40 transition-colors"
                >
                  {CATEGORY_LABELS[workflow.category]}
                </Link>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border capitalize ${difficultyColor[workflow.difficulty]}`}
                >
                  {workflow.difficulty}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border capitalize ${impactColor[workflow.impact]}`}
                >
                  {workflow.impact} impact
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                {workflow.title}
              </h1>
              <p className="mt-2 text-muted text-[16px]">{workflow.subtitle}</p>

              {/* Actions */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleVote(slug);
                    setVoted(!voted);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                    voted
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-border bg-white text-muted hover:text-foreground"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={voted ? "currentColor" : "none"}
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
                  {voted ? "Liked" : "Like"}
                </button>
                <button
                  onClick={() => {
                    toggleTried(slug);
                    setTriedIt(!triedIt);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                    triedIt
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-border bg-white text-muted hover:text-foreground"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {triedIt ? "Tried it" : "Mark as tried"}
                </button>
                <button
                  onClick={() => {
                    toggleBookmark(slug);
                    setSaved(!saved);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                    saved
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-border bg-white text-muted hover:text-foreground"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={saved ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                  {saved ? "Saved" : "Save to toolkit"}
                </button>
              </div>
            </div>

            {/* Score */}
            <div className="hidden sm:flex flex-col items-center gap-1">
              <ScoreRing score={workflow.score} />
              <span className="text-[11px] text-muted-light font-medium">
                Relevance
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main column */}
          <main className="flex-1 min-w-0">
            {/* Video */}
            {workflow.videoUrl && (
              <section className="mb-10">
                <div className="aspect-video rounded-xl overflow-hidden border border-border">
                  <iframe
                    src={workflow.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* Workflow canvas */}
            <section className="mb-10">
              <WorkflowCanvas tools={workflow.tools} title={workflow.title} />
            </section>

            {/* Why it matters */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-3">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                Why it matters
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                {workflow.whyItMatters}
              </p>
            </section>

            {/* Case Study */}
            {workflow.caseStudy && (
              <section className="mb-10 p-5 rounded-xl bg-accent/[0.03] border border-accent/10">
                <h2 className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">
                  Real example
                </h2>
                <p className="text-[14px] font-medium">
                  {workflow.caseStudy.name}
                  <span className="font-normal text-muted">
                    {" "}
                    — {workflow.caseStudy.role}
                    {workflow.caseStudy.company &&
                      ` at ${workflow.caseStudy.company}`}
                  </span>
                </p>
                <p className="mt-2 text-[14px] text-muted leading-relaxed">
                  {workflow.caseStudy.story}
                </p>
                <p className="mt-2 text-[14px] font-semibold text-accent">
                  {workflow.caseStudy.result}
                </p>
              </section>
            )}

            <hr className="border-border mb-10" />

            {/* Steps */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-6">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                How to set it up
              </h2>
              <div className="space-y-6">
                {workflow.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent border border-accent/20 flex items-center justify-center text-[13px] font-bold">
                      {i + 1}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[15px] font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[14px] text-muted leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-border mb-10" />

            {/* Prompts */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-6">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Prompts & templates
              </h2>
              <div className="space-y-4">
                {workflow.prompts.map((prompt, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border">
                      <span className="text-[13px] font-medium">
                        {prompt.label}
                      </span>
                      <CopyButton text={prompt.content} />
                    </div>
                    <pre className="px-4 py-4 text-[13px] leading-relaxed text-muted whitespace-pre-wrap font-mono">
                      {prompt.content}
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-border mb-10" />

            {/* Pro tips */}
            <section className="mb-10">
              <h2 className="flex items-center gap-2 text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-4">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Pro tips
              </h2>
              <ul className="space-y-2">
                {workflow.proTips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[14px] text-muted leading-relaxed"
                  >
                    <span className="shrink-0 text-accent mt-0.5">-</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimonials */}
            {workflow.testimonials.length > 0 && (
              <>
                <hr className="border-border mb-10" />
                <section className="mb-10">
                  <h2 className="flex items-center gap-2 text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-4">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    What people are saying
                  </h2>
                  <div className="space-y-4">
                    {workflow.testimonials.map((t, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-surface border border-border flex gap-4"
                      >
                        {t.avatar ? (
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full shrink-0 object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-[14px] text-foreground leading-relaxed italic">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                          <p className="mt-2 text-[12px] text-muted">
                            <span className="font-medium text-foreground">
                              {t.name}
                            </span>{" "}
                            &mdash; {t.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Next workflow CTA */}
            {nextWf && (
              <>
                <hr className="border-border mb-10" />
                <section className="mb-10">
                  <Link
                    href={`/workflow/${nextWf.slug}`}
                    className="block p-5 rounded-xl border border-accent/20 bg-accent/[0.02] hover:border-accent/40 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">
                      What to try next
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">
                      {nextWf.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-muted">
                      {nextWf.subtitle}
                    </p>
                  </Link>
                </section>
              </>
            )}

            {/* Related */}
            {related.length > 0 && (
              <section className="mb-10">
                <h2 className="text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-4">
                  Related workflows
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map((w) => (
                    <Link
                      key={w.slug}
                      href={`/workflow/${w.slug}`}
                      className="group p-4 rounded-xl border border-border hover:border-muted-light transition-colors"
                    >
                      <h3 className="text-[14px] font-semibold group-hover:text-accent transition-colors">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-[12px] text-muted-light">
                        {w.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-6">
            {/* Stats card */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="flex items-center gap-2 text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted">Users adopted</span>
                  <span className="text-[14px] font-semibold">
                    {workflow.stats.usersAdopted}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted">Avg time saved</span>
                  <span className="text-[14px] font-semibold">
                    {workflow.stats.avgTimeSaved}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted">Satisfaction</span>
                  <span className="text-[14px] font-semibold text-green-600">
                    {workflow.stats.satisfactionRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="flex items-center gap-2 text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Benefits
              </h3>
              <ul className="space-y-2.5">
                {workflow.benefits.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px]">
                    <svg
                      className="w-4 h-4 text-green-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trend graph */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="flex items-center gap-2 text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                Popularity trend
              </h3>
              <TrendGraph trend={workflow.trend} />
            </div>

            {/* Works with */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="flex items-center gap-2 text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Works with
              </h3>
              <div className="flex flex-wrap gap-2">
                {workflow.tools.map((tool) => (
                  <ToolBadge key={tool} tool={tool} size="md" />
                ))}
              </div>
            </div>

            {/* Best for */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                Best for
              </h3>
              <div className="flex flex-wrap gap-2">
                {workflow.roles.map((role) => (
                  <Link
                    key={role}
                    href={`/for/${role.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-white text-muted border border-border hover:border-accent/30 hover:text-accent transition-colors"
                  >
                    {role}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {workflow.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] text-muted bg-white border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="text-[11px] font-semibold text-muted-light uppercase tracking-widest mb-4">
                Quick info
              </h3>
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-muted">Setup time</span>
                  <span className="font-medium">{workflow.timeToSetup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Time saved</span>
                  <span className="font-medium">{workflow.timeSaved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Difficulty</span>
                  <span className="font-medium capitalize">
                    {workflow.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Impact</span>
                  <span className="font-medium capitalize">
                    {workflow.impact}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
