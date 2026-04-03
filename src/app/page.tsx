"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  workflows,
  CATEGORY_LABELS,
  getWorkflowOfTheDay,
  ROLES,
  getRoleSlug,
  type Category,
} from "@/lib/workflows";
import { getProfile, getVotes, toggleVote, getTriedWorkflows } from "@/lib/storage";
import MiniTrend from "@/components/MiniTrend";
import ToolBadge from "@/components/ToolBadge";
import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [tried, setTried] = useState<Record<string, boolean>>({});
  const [hasProfile, setHasProfile] = useState(false);

  const featured = getWorkflowOfTheDay();
  // Show top 10 by score
  const topWorkflows = [...workflows].sort((a, b) => b.score - a.score).slice(0, 10);

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

  // Featured testimonial
  const featuredTestimonial = workflows.find((w) => w.testimonials.length > 0)?.testimonials[0];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Stop asking AI questions.
              <br />
              <span className="text-accent">Start building workflows.</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-md leading-relaxed">
              Practical, copy-paste-ready workflows to integrate AI into your
              daily work. Each one comes with step-by-step guides, prompts, and
              real results.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/quiz"
                className="px-5 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
              >
                Get personalized picks
              </Link>
              <Link
                href="/library"
                className="px-5 py-2.5 rounded-xl border border-border text-[14px] font-medium text-muted hover:text-foreground hover:border-muted-light transition-colors"
              >
                Browse all
              </Link>
            </div>
          </div>

          {/* Featured card */}
          <Link
            href={`/workflow/${featured.slug}`}
            className="w-full lg:w-[380px] shrink-0 p-6 rounded-2xl border border-accent/20 bg-accent/[0.02] hover:border-accent/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">
                Featured
              </span>
              <MiniTrend points={featured.trend.points} />
            </div>
            <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
            <p className="mt-1.5 text-[14px] text-muted leading-relaxed">
              {featured.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-[12px] text-muted-light">
              <span>{featured.timeToSetup} setup</span>
              <span className="w-px h-3 bg-border" />
              <span>{featured.timeSaved} saved</span>
              <span className="w-px h-3 bg-border" />
              <span className="font-medium text-green-600">Score: {featured.score}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {featured.tools.map((tool) => (
                <ToolBadge key={tool} tool={tool} size="sm" />
              ))}
            </div>
          </Link>
        </div>
      </header>

      {/* Testimonial */}
      {featuredTestimonial && (
        <section className="max-w-6xl mx-auto px-6 pb-14">
          <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-start gap-5">
            {featuredTestimonial.avatar ? (
              <Image
                src={featuredTestimonial.avatar}
                alt={featuredTestimonial.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full shrink-0 object-cover"
                unoptimized
              />
            ) : (
              <div className="shrink-0 w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl font-bold">
                {featuredTestimonial.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-[18px] leading-relaxed text-foreground italic">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </p>
              <p className="mt-3 text-[14px] text-muted">
                <span className="font-semibold text-foreground">{featuredTestimonial.name}</span>
                {" "}&mdash; {featuredTestimonial.role}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Top workflows — no filters */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Top workflows</h2>
          <Link href="/library" className="text-[13px] text-accent hover:text-accent-hover transition-colors">
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topWorkflows.map((workflow) => (
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

        <div className="text-center mt-8">
          <Link
            href="/library"
            className="inline-flex px-6 py-2.5 rounded-xl border border-border text-[14px] font-medium text-muted hover:text-foreground hover:border-muted-light transition-colors"
          >
            See more workflows
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="p-10 rounded-2xl bg-foreground text-background text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Get workflows tailored to your role
          </h2>
          <p className="mt-3 text-background/60 text-[15px] max-w-md mx-auto">
            Take a 2-minute quiz and we&apos;ll match you with the workflows
            that will have the biggest impact on your day-to-day.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {ROLES.map((role) => (
              <Link
                key={role}
                href={`/for/${getRoleSlug(role)}`}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-medium bg-background/10 text-background/70 border border-background/10 hover:bg-background/20 hover:text-background transition-colors"
              >
                {role}
              </Link>
            ))}
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-xl bg-accent text-white text-[15px] font-medium hover:bg-accent-hover transition-colors"
          >
            Start your profile
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-[13px] text-muted-light">
          <span>WorkflowAI</span>
          <div className="flex gap-6">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <Link key={cat} href={`/category/${cat}`} className="hover:text-foreground transition-colors">
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
