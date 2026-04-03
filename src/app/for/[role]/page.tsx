"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRoleFromSlug,
  getWorkflowsByRole,
  CATEGORY_LABELS,
} from "@/lib/workflows";

export default function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: roleSlug } = use(params);
  const roleName = getRoleFromSlug(roleSlug);

  if (!roleName) notFound();

  const workflows = getWorkflowsByRole(roleName);

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
            AI workflows for {roleName}s
          </h1>
          <p className="mt-2 text-muted text-[15px] max-w-xl">
            Practical, copy-paste-ready workflows tailored for{" "}
            {roleName.toLowerCase()}s. Each one includes step-by-step setup
            guides and ready-to-use prompt templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <Link
              key={workflow.slug}
              href={`/workflow/${workflow.slug}`}
              className="group block p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
            >
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
            </Link>
          ))}
        </div>

        {workflows.length === 0 && (
          <p className="text-center py-20 text-muted">
            No workflows found for this role yet.
          </p>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
