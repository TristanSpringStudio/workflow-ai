"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          About WorkflowAI
        </h1>

        <div className="mt-8 space-y-6 text-[15px] text-muted leading-relaxed">
          <p>
            Most people use AI to ask questions. They open ChatGPT or Claude,
            type a question, get an answer, and close the tab. That&apos;s fine
            for quick lookups — but it barely scratches the surface.
          </p>

          <p>
            The real power of AI isn&apos;t in the answers. It&apos;s in the
            workflows — the repeatable processes where AI can save you hours
            every week. Drafting campaign briefs, generating reports, personalizing
            outreach, documenting processes.
          </p>

          <p>
            The problem? Most people don&apos;t know what workflows are possible
            for their specific role, with their specific tools. They know AI can
            &ldquo;help with writing&rdquo; but they don&apos;t know that a
            recruiter can cut job description writing from 2 hours to 10 minutes,
            or that a PM can eliminate 4 status meetings a week.
          </p>

          <p className="text-foreground font-medium">
            That&apos;s what WorkflowAI solves.
          </p>

          <p>
            We curate, validate, and document practical AI workflows for
            non-technical professionals. Each workflow comes with a clear
            framework: what triggers it, what AI handles, what you should still
            decide, and what the output looks like. Plus copy-paste-ready
            prompts you can use immediately.
          </p>

          <p>
            Our Workflow Generator goes a step further — tell it about your role,
            tools, and daily tasks, and it builds a personalized toolkit of
            workflows matched to your work.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
          <p className="text-[14px] text-muted mb-4">
            Have questions, want to partner, or interested in the Scale plan for your team?
          </p>
          <Link
            href="mailto:hello@workflowai.com"
            className="inline-flex px-5 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
          >
            Contact us
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
