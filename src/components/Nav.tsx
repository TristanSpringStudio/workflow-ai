"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            WorkflowAI
          </Link>

          {/* Find Workflows dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-[13px] text-muted hover:text-foreground transition-colors"
            >
              Find Workflows
              <svg
                className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[480px] p-5 rounded-2xl bg-background border border-border shadow-lg">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {/* Left column */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-light uppercase tracking-widest mb-3">
                      Discovery
                    </p>

                    <Link
                      href="/generator"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-surface transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold group-hover:text-accent transition-colors">
                          Workflow Generator
                        </span>
                        <p className="text-[12px] text-muted-light mt-0.5">
                          Get AI-generated workflows tailored to your role
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/library"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-surface transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold group-hover:text-accent transition-colors">
                          Workflow Library
                        </span>
                        <p className="text-[12px] text-muted-light mt-0.5">
                          Browse all workflows with filters and search
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Right column */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-light uppercase tracking-widest mb-3">
                      Intelligence
                    </p>

                    <Link
                      href="/trends"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-surface transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold group-hover:text-accent transition-colors">
                          Trends
                        </span>
                        <p className="text-[12px] text-muted-light mt-0.5">
                          See what workflows are trending right now
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/signals"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-surface transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold group-hover:text-accent transition-colors">
                          Industry Signals
                        </span>
                        <p className="text-[12px] text-muted-light mt-0.5">
                          AI adoption data by role and industry
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-[13px] text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-[13px] text-muted hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/submit" className="text-[13px] text-muted hover:text-foreground transition-colors">
            Submit a workflow
          </Link>
          <Link
            href="/generator"
            className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
