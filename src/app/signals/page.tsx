"use client";

import Link from "next/link";
import {
  workflows,
  ROLES,
  CATEGORY_LABELS,
  getRoleSlug,
  getAllCategories,
  type Category,
} from "@/lib/workflows";
import Nav from "@/components/Nav";
import MiniTrend from "@/components/MiniTrend";

// Aggregate data by role
function getRoleStats() {
  return ROLES.map((role) => {
    const roleWorkflows = workflows.filter((w) => w.roles.includes(role));
    const avgScore =
      roleWorkflows.length > 0
        ? Math.round(
            roleWorkflows.reduce((sum, w) => sum + w.score, 0) /
              roleWorkflows.length
          )
        : 0;
    // Merge trend data — average the points
    const avgTrend =
      roleWorkflows.length > 0
        ? roleWorkflows[0].trend.points.map((_, i) =>
            Math.round(
              roleWorkflows.reduce((sum, w) => sum + w.trend.points[i], 0) /
                roleWorkflows.length
            )
          )
        : [];
    return {
      role,
      workflowCount: roleWorkflows.length,
      avgScore,
      avgTrend,
      topWorkflow: roleWorkflows.sort((a, b) => b.score - a.score)[0],
    };
  }).sort((a, b) => b.workflowCount - a.workflowCount);
}

function getCategoryStats() {
  return getAllCategories().map((cat) => {
    const catWorkflows = workflows.filter((w) => w.category === cat);
    const avgScore =
      catWorkflows.length > 0
        ? Math.round(
            catWorkflows.reduce((sum, w) => sum + w.score, 0) /
              catWorkflows.length
          )
        : 0;
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      count: catWorkflows.length,
      avgScore,
      topWorkflow: catWorkflows.sort((a, b) => b.score - a.score)[0],
    };
  });
}

export default function SignalsPage() {
  const roleStats = getRoleStats();
  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Industry signals
          </h1>
          <p className="mt-2 text-muted text-[15px] max-w-xl">
            Where AI workflow adoption is accelerating — by role, category, and
            use case. See where the momentum is.
          </p>
        </div>

        {/* By Role */}
        <section className="mb-14">
          <h2 className="text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-6">
            AI adoption by role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roleStats.map((stat) => (
              <Link
                key={stat.role}
                href={`/for/${getRoleSlug(stat.role)}`}
                className="group p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-semibold group-hover:text-accent transition-colors">
                    {stat.role}
                  </h3>
                  {stat.avgTrend.length > 0 && (
                    <MiniTrend points={stat.avgTrend} />
                  )}
                </div>

                <div className="flex items-center gap-5 text-[12px] text-muted-light">
                  <span>
                    <span className="font-semibold text-foreground">
                      {stat.workflowCount}
                    </span>{" "}
                    workflows
                  </span>
                  <span>
                    Avg score{" "}
                    <span className="font-semibold text-green-600">
                      {stat.avgScore}
                    </span>
                  </span>
                </div>

                {stat.topWorkflow && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-[11px] text-muted-light mb-0.5">
                      Top workflow
                    </p>
                    <p className="text-[13px] font-medium">
                      {stat.topWorkflow.title}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* By Category */}
        <section className="mb-14">
          <h2 className="text-[13px] font-semibold text-muted-light uppercase tracking-wide mb-6">
            Adoption by workflow category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((stat) => (
              <Link
                key={stat.category}
                href={`/category/${stat.category}`}
                className="group p-5 rounded-2xl border border-border hover:border-muted-light transition-colors"
              >
                <h3 className="text-[15px] font-semibold group-hover:text-accent transition-colors">
                  {stat.label}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-[12px] text-muted-light">
                  <span>
                    <span className="font-semibold text-foreground">
                      {stat.count}
                    </span>{" "}
                    workflows
                  </span>
                  <span>
                    Avg score{" "}
                    <span className="font-semibold text-green-600">
                      {stat.avgScore}
                    </span>
                  </span>
                </div>
                {stat.topWorkflow && (
                  <p className="mt-2 text-[12px] text-muted">
                    Top: {stat.topWorkflow.title}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Key insight */}
        <section className="p-8 rounded-2xl bg-surface border border-border text-center">
          <h2 className="text-xl font-semibold mb-2">
            AI adoption is accelerating fastest in operations and sales
          </h2>
          <p className="text-[14px] text-muted max-w-lg mx-auto">
            Roles with high-volume repetitive tasks are seeing 5-10x adoption
            growth. The biggest opportunity? Workflows that combine data
            analysis with written output.
          </p>
          <Link
            href="/generator"
            className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
          >
            Find workflows for your role
          </Link>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
