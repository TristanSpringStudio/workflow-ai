"use client";

import Link from "next/link";
import Image from "next/image";
import { workflows, CATEGORY_LABELS } from "@/lib/workflows";
import { getToolLogoUrl } from "@/lib/tool-logos";
import Nav from "@/components/Nav";
import TrendGraph from "@/components/TrendGraph";

export default function TrendsPage() {
  // Sort by trend growth (last value / first value)
  const sorted = [...workflows].sort((a, b) => {
    const growthA = a.trend.points[a.trend.points.length - 1] / a.trend.points[0];
    const growthB = b.trend.points[b.trend.points.length - 1] / b.trend.points[0];
    return growthB - growthA;
  });

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Trending workflows
          </h1>
          <p className="mt-2 text-muted text-[15px] max-w-xl">
            The fastest-growing AI workflows right now, ranked by search interest
            and adoption momentum.
          </p>
        </div>

        <div className="space-y-4">
          {sorted.map((workflow, i) => {
            const growth = Math.round(
              ((workflow.trend.points[workflow.trend.points.length - 1] -
                workflow.trend.points[0]) /
                workflow.trend.points[0]) *
                100
            );

            return (
              <Link
                key={workflow.slug}
                href={`/workflow/${workflow.slug}`}
                className="group flex items-center gap-6 p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
              >
                {/* Rank */}
                <span className="text-2xl font-bold text-muted-light w-8 text-center shrink-0">
                  {i + 1}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface text-muted border border-border">
                      {CATEGORY_LABELS[workflow.category]}
                    </span>
                    <span
                      className={`text-[12px] font-semibold ${
                        growth > 1000
                          ? "text-green-600"
                          : growth > 500
                            ? "text-green-500"
                            : "text-green-400"
                      }`}
                    >
                      +{growth.toLocaleString()}%
                    </span>
                  </div>
                  <h2 className="text-[15px] font-semibold group-hover:text-accent transition-colors">
                    {workflow.title}
                  </h2>
                  <p className="mt-0.5 text-[13px] text-muted-light">
                    {workflow.subtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      {workflow.tools.slice(0, 4).map((tool) => (
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
                    <span className="text-[11px] text-muted-light">
                      {workflow.stats.usersAdopted} using this
                    </span>
                  </div>
                </div>

                {/* Trend chart */}
                <div className="w-[200px] shrink-0 hidden sm:block">
                  <TrendGraph trend={workflow.trend} />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
