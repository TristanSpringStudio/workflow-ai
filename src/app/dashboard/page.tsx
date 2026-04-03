"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  workflows,
  CATEGORY_LABELS,
  type Workflow,
} from "@/lib/workflows";
import { getToolLogoUrl } from "@/lib/tool-logos";
import {
  getBookmarks,
  toggleBookmark,
  getCustomWorkflows,
  deleteCustomWorkflow,
  getTriedWorkflows,
  type CustomWorkflow,
} from "@/lib/storage";
import Nav from "@/components/Nav";
import MiniTrend from "@/components/MiniTrend";

export default function DashboardPage() {
  const [bookmarkSlugs, setBookmarkSlugs] = useState<string[]>([]);
  const [customWorkflows, setCustomWorkflows] = useState<CustomWorkflow[]>([]);
  const [tried, setTried] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"saved" | "custom">("saved");

  useEffect(() => {
    setBookmarkSlugs(getBookmarks());
    setCustomWorkflows(getCustomWorkflows());
    setTried(getTriedWorkflows());
  }, []);

  const savedWorkflows = bookmarkSlugs
    .map((slug) => workflows.find((w) => w.slug === slug))
    .filter((w): w is Workflow => !!w);

  const handleRemoveBookmark = (slug: string) => {
    toggleBookmark(slug);
    setBookmarkSlugs(getBookmarks());
  };

  const handleDeleteCustom = (id: string) => {
    deleteCustomWorkflow(id);
    setCustomWorkflows(getCustomWorkflows());
  };

  const totalCount = savedWorkflows.length + customWorkflows.length;
  const triedCount = savedWorkflows.filter((w) => tried[w.slug]).length;

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Your Toolkit
            </h1>
            <p className="mt-1 text-muted text-[14px]">
              {totalCount} workflow{totalCount !== 1 ? "s" : ""} saved
              {triedCount > 0 && ` · ${triedCount} tried`}
            </p>
          </div>
          <Link
            href="/generator"
            className="px-4 py-2 rounded-xl bg-accent text-white text-[13px] font-medium hover:bg-accent-hover transition-colors"
          >
            Generate new
          </Link>
        </div>

        {/* Progress bar */}
        {savedWorkflows.length > 0 && (
          <div className="mb-8 p-5 rounded-xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-medium">Progress</span>
              <span className="text-[12px] text-muted">
                {triedCount} of {savedWorkflows.length} tried
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{
                  width: `${savedWorkflows.length > 0 ? (triedCount / savedWorkflows.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "saved"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Saved ({savedWorkflows.length})
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "custom"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Custom ({customWorkflows.length})
          </button>
        </div>

        {/* Saved tab */}
        {activeTab === "saved" && (
          <div>
            {savedWorkflows.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted text-[14px]">No saved workflows yet</p>
                <p className="text-muted-light text-[13px] mt-1">
                  Browse the library and save workflows to your toolkit
                </p>
                <Link
                  href="/library"
                  className="inline-flex mt-4 px-4 py-2 rounded-xl border border-border text-[13px] font-medium hover:border-muted-light transition-colors"
                >
                  Browse library
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {savedWorkflows.map((wf) => (
                  <div
                    key={wf.slug}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-muted-light transition-colors"
                  >
                    <Link
                      href={`/workflow/${wf.slug}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface text-muted border border-border">
                          {CATEGORY_LABELS[wf.category]}
                        </span>
                        {tried[wf.slug] && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">
                            Tried
                          </span>
                        )}
                      </div>
                      <h3 className="text-[14px] font-semibold hover:text-accent transition-colors">
                        {wf.title}
                      </h3>
                      <p className="text-[12px] text-muted-light mt-0.5">
                        {wf.subtitle}
                      </p>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex gap-1 mr-2">
                        {wf.tools.slice(0, 3).map((tool) => (
                          <Image
                            key={tool}
                            src={getToolLogoUrl(tool, 16)}
                            alt={tool}
                            width={16}
                            height={16}
                            className="rounded-sm"
                            unoptimized
                          />
                        ))}
                      </div>
                      <MiniTrend points={wf.trend.points} />
                      <button
                        onClick={() => handleRemoveBookmark(wf.slug)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-light hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                        title="Remove"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom tab */}
        {activeTab === "custom" && (
          <div>
            {customWorkflows.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted text-[14px]">No custom workflows yet</p>
                <p className="text-muted-light text-[13px] mt-1">
                  Use the generator to build workflows for your specific processes
                </p>
                <Link
                  href="/generator"
                  className="inline-flex mt-4 px-4 py-2 rounded-xl bg-accent text-white text-[13px] font-medium hover:bg-accent-hover transition-colors"
                >
                  Generate a workflow
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {customWorkflows.map((cw) => (
                  <div
                    key={cw.id}
                    className="group p-5 rounded-xl border border-border hover:border-muted-light transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-accent/10 text-accent">
                            Custom
                          </span>
                          <span className="text-[11px] text-muted-light">
                            {new Date(cw.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold">{cw.title}</h3>
                      </div>
                      <button
                        onClick={() => handleDeleteCustom(cw.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-light hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Mini framework view */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/50">
                        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide mb-0.5">Trigger</p>
                        <p className="text-[11px] text-amber-900/80">{cw.trigger}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-green-50/50 border border-green-200/50">
                        <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wide mb-0.5">Output</p>
                        <p className="text-[11px] text-green-900/80">{cw.output}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-light">
                      <span>{cw.steps.length} steps</span>
                      <span>{cw.decisionPoints.length} decisions</span>
                      <span>{cw.tools.length} tools</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
