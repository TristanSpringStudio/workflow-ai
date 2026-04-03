"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getToolLogoUrl } from "@/lib/tool-logos";
import { saveCustomWorkflow, type CustomWorkflow } from "@/lib/storage";
import Nav from "@/components/Nav";

const TOOL_OPTIONS = [
  "Claude", "ChatGPT", "Google Docs", "Google Sheets", "Notion", "Slack",
  "Gmail", "HubSpot", "Salesforce", "Figma", "Canva", "Excel", "Linear", "Zoom",
];

type Step = "describe" | "tools" | "generating" | "result";

export default function GeneratorPage() {
  const [step, setStep] = useState<Step>("describe");
  const [processDescription, setProcessDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [generated, setGenerated] = useState<CustomWorkflow | null>(null);
  const [saved, setSaved] = useState(false);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) => {
      const next = new Set(prev);
      if (next.has(tool)) next.delete(tool);
      else next.add(tool);
      return next;
    });
  };

  const handleGenerate = () => {
    setStep("generating");

    // Mock generation — in production this would call AI
    setTimeout(() => {
      const desc = processDescription.toLowerCase();

      // Generate a contextual workflow based on what they described
      let title = "Custom Workflow";
      let trigger = "When you need to start this process";
      let output = "A completed deliverable";
      const steps: { title: string; body: string }[] = [];
      const decisions: { question: string; aiSays: string; youDecide: string }[] = [];
      const aiHelps: string[] = [];
      const youCall: string[] = [];

      if (desc.includes("report") || desc.includes("data") || desc.includes("analys")) {
        title = "Automated " + (desc.includes("weekly") ? "Weekly " : "") + "Report Generator";
        trigger = "End of reporting period or when stakeholders need an update";
        output = "A formatted, insight-rich report ready for distribution";
        steps.push(
          { title: "Collect raw data", body: "Export from your data sources — spreadsheets, dashboards, or tools" },
          { title: "Define report structure", body: "Share a past report with AI as a template for format and tone" },
          { title: "Generate draft report", body: "Paste data and let AI create the narrative with trends and insights" },
          { title: "Add context only you know", body: "Explain why metrics moved, add strategic commentary" },
          { title: "Review and distribute", body: "Final check, then share with stakeholders" },
        );
        decisions.push(
          { question: "Which insights are worth highlighting?", aiSays: "AI identifies statistical outliers and trends", youDecide: "Whether the trend is meaningful or just noise given business context" },
          { question: "What actions should be recommended?", aiSays: "AI suggests data-driven recommendations", youDecide: "Which recommendations are feasible given team capacity" },
        );
        aiHelps.push("Formatting raw data into narrative", "Calculating trends and comparisons", "Generating charts and visual summaries", "Maintaining consistent report structure");
        youCall.push("Interpreting what the data means strategically", "Deciding what to escalate vs. monitor", "Adding context about business initiatives", "Final sign-off and distribution");
      } else if (desc.includes("email") || desc.includes("outreach") || desc.includes("client")) {
        title = "Client Communication Workflow";
        trigger = "Need to send a personalized communication to a client or prospect";
        output = "A personalized, on-brand message ready to send";
        steps.push(
          { title: "Gather context", body: "Collect relevant info — recent interactions, their goals, current status" },
          { title: "Generate draft", body: "AI creates a personalized message using your template and their context" },
          { title: "Review for accuracy", body: "Check facts, tone, and personalization quality" },
          { title: "Send and log", body: "Final adjustments, send, and record in your CRM" },
        );
        decisions.push(
          { question: "Is the personalization genuine?", aiSays: "AI drafts based on available context", youDecide: "Whether it sounds authentic and appropriate for the relationship" },
        );
        aiHelps.push("Drafting personalized copy at speed", "Maintaining consistent brand voice", "Generating variations for A/B testing", "Following up at appropriate intervals");
        youCall.push("Relationship nuances and timing", "Whether the tone matches the situation", "Strategic decisions about the relationship", "When to call instead of email");
      } else if (desc.includes("meet") || desc.includes("notes") || desc.includes("agenda")) {
        title = "Meeting Documentation Workflow";
        trigger = "Before, during, or after any significant meeting";
        output = "Structured notes with action items, decisions, and follow-ups";
        steps.push(
          { title: "Prepare agenda or talking points", body: "Feed meeting topic to AI to generate a structured agenda" },
          { title: "Capture notes during meeting", body: "Take rough notes — fragments and bullet points are fine" },
          { title: "Process notes immediately after", body: "AI converts rough notes into structured summary with action items" },
          { title: "Distribute and track", body: "Share via team channels, assign owners and deadlines" },
        );
        decisions.push(
          { question: "Who owns each action item?", aiSays: "AI suggests owners based on discussion context", youDecide: "Actual ownership based on capacity and expertise" },
        );
        aiHelps.push("Structuring messy notes", "Extracting action items automatically", "Formatting for different audiences", "Creating follow-up reminders");
        youCall.push("Meeting priorities and agenda", "Action item ownership", "Which decisions need escalation", "Follow-up timing and urgency");
      } else {
        // Generic fallback
        title = "Custom " + processDescription.split(" ").slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Workflow";
        trigger = "When this process needs to begin";
        output = "A completed, quality-checked deliverable";
        steps.push(
          { title: "Gather inputs", body: "Collect all the information and context needed for this process" },
          { title: "Set up AI context", body: "Share examples of good outputs and your requirements with AI" },
          { title: "Generate first draft", body: "AI produces the initial output based on your inputs and context" },
          { title: "Review and refine", body: "Check quality, add expertise that only you can provide" },
          { title: "Finalize and deliver", body: "Make final adjustments and distribute or publish" },
        );
        decisions.push(
          { question: "Is the quality sufficient?", aiSays: "AI can check against your criteria and examples", youDecide: "Whether it meets the bar for your specific audience and context" },
          { question: "What needs human judgment?", aiSays: "AI handles structure, formatting, and consistency", youDecide: "Strategic choices, relationship context, and quality calls" },
        );
        aiHelps.push("Generating first drafts quickly", "Maintaining consistency across outputs", "Handling repetitive formatting tasks", "Suggesting improvements based on patterns");
        youCall.push("Quality standards and taste", "Strategic and relationship decisions", "Context that isn't in the data", "Final approval before delivery");
      }

      const wf = saveCustomWorkflow({
        title,
        trigger,
        steps,
        decisionPoints: decisions,
        output,
        aiHelps,
        youCall,
        tools: [...selectedTools],
      });

      setGenerated(wf);
      setStep("result");
    }, 2500);
  };

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[12px] font-medium mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            AI-Powered
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Workflow Generator
          </h1>
          <p className="mt-2 text-muted text-[14px]">
            Describe a process you do regularly. We&apos;ll build a custom AI
            workflow with triggers, steps, decision points, and clear boundaries
            for what AI handles vs. what you decide.
          </p>
        </div>

        {/* Step 1: Describe */}
        {step === "describe" && (
          <div>
            <label className="block text-[13px] font-medium mb-2">
              Describe the process you want to turn into a workflow
            </label>
            <textarea
              value={processDescription}
              onChange={(e) => setProcessDescription(e.target.value)}
              placeholder="e.g., Every Friday I compile data from Google Sheets and our CRM into a weekly performance report for leadership. It takes about 2 hours and the format is always the same..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-[14px] placeholder:text-muted-light focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 resize-none leading-relaxed"
            />
            <p className="mt-2 text-[12px] text-muted-light">
              Be specific about what you do, how often, and what tools you use.
            </p>
            <button
              onClick={() => setStep("tools")}
              disabled={processDescription.trim().length < 20}
              className="mt-4 px-5 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Tools */}
        {step === "tools" && (
          <div>
            <label className="block text-[13px] font-medium mb-2">
              What tools are involved in this process?
            </label>
            <p className="text-[12px] text-muted-light mb-4">
              Select all that apply. This helps us build a more specific workflow.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TOOL_OPTIONS.map((tool) => {
                const sel = selectedTools.has(tool);
                return (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                      sel
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-surface border-border text-muted hover:border-muted-light"
                    }`}
                  >
                    <Image
                      src={getToolLogoUrl(tool, 14)}
                      alt={tool}
                      width={14}
                      height={14}
                      unoptimized
                    />
                    {tool}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("describe")}
                className="px-4 py-2.5 rounded-xl border border-border text-[14px] font-medium text-muted hover:text-foreground transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="px-5 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
              >
                Generate workflow
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {step === "generating" && (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[15px] font-medium">
              Building your workflow...
            </p>
            <p className="text-[13px] text-muted mt-1">
              Analyzing your process and creating the framework
            </p>
          </div>
        )}

        {/* Step 4: Result */}
        {step === "result" && generated && (
          <div>
            {/* Success banner */}
            {!saved && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-green-900">
                    Workflow generated!
                  </p>
                  <p className="text-[12px] text-green-700 mt-0.5">
                    It&apos;s been saved to your toolkit automatically.
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg bg-green-100 text-green-800 text-[12px] font-medium hover:bg-green-200 transition-colors"
                >
                  View toolkit
                </Link>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-1">{generated.title}</h2>

            {/* Tools */}
            {generated.tools.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
                {generated.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-surface border border-border"
                  >
                    <Image src={getToolLogoUrl(tool, 14)} alt={tool} width={14} height={14} unoptimized />
                    {tool}
                  </span>
                ))}
              </div>
            )}

            {/* Framework */}
            <div className="space-y-4">
              {/* Trigger + Output */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-widest">Trigger</span>
                  </div>
                  <p className="text-[13px] text-amber-900/80">{generated.trigger}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-50/50 border border-green-200/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-[11px] font-semibold text-green-700 uppercase tracking-widest">Output</span>
                  </div>
                  <p className="text-[13px] text-green-900/80">{generated.output}</p>
                </div>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-[12px] font-semibold text-muted-light uppercase tracking-wide mb-3">Steps</h3>
                <div className="space-y-3">
                  {generated.steps.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-md bg-accent/10 text-accent border border-accent/20 flex items-center justify-center text-[11px] font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold">{s.title}</h4>
                        <p className="text-[12px] text-muted mt-0.5">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision points */}
              {generated.decisionPoints.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-semibold text-muted-light uppercase tracking-wide mb-3">Decision points</h3>
                  <div className="space-y-3">
                    {generated.decisionPoints.map((dp, i) => (
                      <div key={i} className="p-3 rounded-xl border border-border">
                        <p className="text-[13px] font-medium mb-2">{dp.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 rounded-lg bg-accent/5 border border-accent/10">
                            <p className="text-[10px] font-semibold text-accent uppercase tracking-wide mb-0.5">AI helps</p>
                            <p className="text-[12px] text-muted">{dp.aiSays}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                            <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide mb-0.5">You decide</p>
                            <p className="text-[12px] text-muted">{dp.youDecide}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI helps vs You call */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-accent/[0.03] border border-accent/10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">AI helps</span>
                  </div>
                  <ul className="space-y-1.5">
                    {generated.aiHelps.map((item, i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-muted"><span className="text-accent shrink-0">•</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-widest">You call</span>
                  </div>
                  <ul className="space-y-1.5">
                    {generated.youCall.map((item, i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-muted"><span className="text-amber-600 shrink-0">•</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setStep("describe");
                  setProcessDescription("");
                  setSelectedTools(new Set());
                  setGenerated(null);
                  setSaved(false);
                }}
                className="px-4 py-2.5 rounded-xl border border-border text-[14px] font-medium text-muted hover:text-foreground transition-colors"
              >
                Generate another
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
              >
                View in toolkit
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
