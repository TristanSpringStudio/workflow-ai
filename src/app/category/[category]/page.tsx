"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryFromSlug,
  getWorkflowsByCategory,
  CATEGORY_LABELS,
} from "@/lib/workflows";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: catSlug } = use(params);
  const category = getCategoryFromSlug(catSlug);

  if (!category) notFound();

  const workflows = getWorkflowsByCategory(category);
  const label = CATEGORY_LABELS[category];

  return (
    <div className="min-h-screen">
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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {label} workflows
          </h1>
          <p className="mt-2 text-muted text-[15px] max-w-xl">
            AI workflows focused on {label.toLowerCase()}. Step-by-step guides
            with prompts you can copy and use today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <Link
              key={workflow.slug}
              href={`/workflow/${workflow.slug}`}
              className="group block p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-muted-light capitalize">
                  {workflow.difficulty}
                </span>
                <span className="text-[11px] text-muted-light capitalize">
                  {workflow.impact} impact
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
              <div className="mt-3 flex flex-wrap gap-1">
                {workflow.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md text-[11px] text-muted bg-surface border border-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
