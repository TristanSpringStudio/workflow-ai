"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with AI workflows",
    cta: "Get started",
    ctaStyle: "border border-border text-foreground hover:bg-surface",
    features: [
      "Browse the full workflow library",
      "3 detailed workflow views per month",
      "Basic prompt templates",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For professionals serious about AI adoption",
    cta: "Start Pro trial",
    ctaStyle: "bg-accent text-white hover:bg-accent-hover",
    popular: true,
    features: [
      "Everything in Starter",
      "Unlimited workflow access",
      "Workflow Generator (AI-powered)",
      "Custom workflow builder",
      "Trend data and industry signals",
      "Export and share toolkits",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "$2,000",
    period: "/year",
    description: "For teams and organizations rolling out AI",
    cta: "Contact sales",
    ctaStyle: "border border-border text-foreground hover:bg-surface",
    features: [
      "Everything in Pro",
      "Team workspaces (up to 50 seats)",
      "Custom workflows for your org",
      "Dedicated onboarding session",
      "Admin dashboard and analytics",
      "Role-based workflow packages",
      "API access",
      "Slack and email support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-muted text-lg max-w-md mx-auto">
            Start free. Upgrade when AI workflows become essential to how you
            work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-6 rounded-2xl border ${
                tier.popular
                  ? "border-accent/30 bg-accent/[0.02]"
                  : "border-border"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-accent text-white">
                  Most popular
                </span>
              )}

              <h2 className="text-[18px] font-semibold">{tier.name}</h2>
              <p className="mt-1 text-[13px] text-muted">{tier.description}</p>

              <div className="mt-5 mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-[14px] text-muted">{tier.period}</span>
                )}
              </div>

              <Link
                href={tier.name === "Scale" ? "/about" : "/generator"}
                className={`block w-full py-2.5 rounded-xl text-center text-[14px] font-medium transition-colors ${tier.ctaStyle}`}
              >
                {tier.cta}
              </Link>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2.5 text-[13px] text-muted"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 shrink-0 mt-0.5"
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
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
