"use client";

import { useState } from "react";
import Link from "next/link";
import { addSubmission, getSubmissions, type WorkflowSubmission } from "@/lib/storage";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tools, setTools] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<WorkflowSubmission[]>([]);
  const [showPrevious, setShowPrevious] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission({ title, description, category, tools });
    setSubmitted(true);
    setTitle("");
    setDescription("");
    setCategory("");
    setTools("");
  };

  const loadPrevious = () => {
    setSubmissions(getSubmissions());
    setShowPrevious(true);
  };

  return (
    <div className="min-h-screen">
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            WorkflowAI
          </Link>
          <Link
            href="/"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            Back to library
          </Link>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Submit a workflow
        </h1>
        <p className="text-muted text-[14px] mb-8">
          Found an AI workflow that works well for you? Share it with the
          community. We&apos;ll review and add the best ones to the library.
        </p>

        {submitted ? (
          <div className="p-6 rounded-xl bg-green-50 border border-green-200 text-center">
            <svg
              className="w-8 h-8 text-green-600 mx-auto mb-3"
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
            <h2 className="text-lg font-semibold text-green-900">
              Thanks for sharing!
            </h2>
            <p className="mt-1 text-[14px] text-green-700">
              Your workflow has been submitted for review.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-[13px] text-accent hover:text-accent-hover"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                Workflow title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Auto-Generate Meeting Agendas"
                required
                className="w-full h-10 px-3 rounded-xl bg-surface border border-border text-[14px] focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="How does this workflow work? What problem does it solve?"
                required
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-border text-[14px] focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 resize-none"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl bg-surface border border-border text-[14px] focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="">Select a category</option>
                <option value="content">Content & Writing</option>
                <option value="data">Data & Reporting</option>
                <option value="communication">Communication</option>
                <option value="strategy">Strategy & Planning</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                Tools used
              </label>
              <input
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="e.g., Claude, Notion, Google Docs"
                className="w-full h-10 px-3 rounded-xl bg-surface border border-border text-[14px] focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
            >
              Submit workflow
            </button>
          </form>
        )}

        {/* Previous submissions */}
        <div className="mt-10 pt-8 border-t border-border">
          <button
            onClick={loadPrevious}
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            {showPrevious ? "Your submissions" : "View your previous submissions"}
          </button>
          {showPrevious && (
            <div className="mt-4 space-y-3">
              {submissions.length === 0 ? (
                <p className="text-[13px] text-muted-light">
                  No submissions yet.
                </p>
              ) : (
                submissions.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl border border-border"
                  >
                    <h3 className="text-[14px] font-medium">{s.title}</h3>
                    <p className="mt-1 text-[12px] text-muted">
                      {s.description}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-light">
                      Submitted{" "}
                      {new Date(s.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
