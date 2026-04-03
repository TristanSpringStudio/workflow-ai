"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { workflows, CATEGORY_LABELS, type Workflow } from "@/lib/workflows";
import { getToolLogoUrl } from "@/lib/tool-logos";
import Nav from "@/components/Nav";
import MiniTrend from "@/components/MiniTrend";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  options?: { label: string; value: string }[];
  toolPills?: string[];
}

function getNextStep(
  step: number,
  userInput: string,
  context: Record<string, string>
): { messages: ChatMessage[]; slugs?: string[]; nextStep: number } {
  const id = () => Math.random().toString(36).slice(2, 8);
  switch (step) {
    case 0:
      return {
        messages: [{ id: id(), role: "assistant", content: "Hey! Tell me about your role and what your day-to-day looks like. I'll find the AI workflows that can save you the most time." }],
        nextStep: 1,
      };
    case 1: {
      const r = userInput.toLowerCase();
      let msg = "Got it.";
      if (r.includes("market")) msg = "Marketing is one of the best areas for AI workflows.";
      else if (r.includes("sales")) msg = "Sales reps are seeing huge gains with AI.";
      else if (r.includes("operat") || r.includes("admin")) msg = "Operations has some of the highest-impact AI workflows.";
      else if (r.includes("recruit")) msg = "Recruiting workflows are incredibly effective.";
      else if (r.includes("found")) msg = "As a founder, AI can multiply your output dramatically.";
      return {
        messages: [{ id: id(), role: "assistant", content: `${msg}\n\nWhat takes up the most time in your week?` }],
        nextStep: 2,
      };
    }
    case 2:
      return {
        messages: [{ id: id(), role: "assistant", content: "I can see some workflows that would help. What tools do you use daily?", toolPills: ["Google Docs", "Google Sheets", "Notion", "Slack", "Gmail", "HubSpot", "Salesforce", "Figma", "Canva", "Excel"] }],
        slugs: getMatchedSlugs(context.role || ""),
        nextStep: 3,
      };
    case 3:
      return {
        messages: [{ id: id(), role: "assistant", content: "Updated your results with tool-specific workflows.\n\nHow comfortable are you with AI?", options: [{ label: "Just getting started", value: "beginner" }, { label: "Use it sometimes", value: "intermediate" }, { label: "Power user", value: "advanced" }] }],
        slugs: getToolSlugs(userInput),
        nextStep: 4,
      };
    case 4:
      return {
        messages: [{ id: id(), role: "assistant", content: "Your personalized workflows are ready below! Click any card to see the full guide. Keep chatting to discover more." }],
        slugs: ["interactive-prototype"],
        nextStep: 5,
      };
    default:
      return {
        messages: [{ id: id(), role: "assistant", content: "Added more workflows based on what you described. Keep going — the more I know about your work, the better the recommendations." }],
        slugs: getFreeformSlugs(userInput),
        nextStep: step + 1,
      };
  }
}

function getMatchedSlugs(role: string): string[] {
  const r = role.toLowerCase();
  if (r.includes("market")) return ["draft-campaign-briefs", "weekly-report-generator", "blog-post-editor"];
  if (r.includes("sales")) return ["sales-email-personalizer", "proposal-generator", "competitor-analysis"];
  if (r.includes("recruit")) return ["job-description-writer", "sales-email-personalizer"];
  if (r.includes("operat")) return ["meeting-notes-to-actions", "sop-documentation", "data-analysis-assistant"];
  if (r.includes("found")) return ["proposal-generator", "async-status-updates", "competitor-analysis"];
  return ["meeting-notes-to-actions", "weekly-report-generator", "data-analysis-assistant"];
}

function getToolSlugs(tools: string): string[] {
  const t = tools.toLowerCase();
  const s: string[] = [];
  if (t.includes("notion") || t.includes("slack")) s.push("async-status-updates");
  if (t.includes("sheet") || t.includes("excel")) s.push("data-analysis-assistant");
  if (t.includes("docs")) s.push("content-calendar-planner");
  return s.slice(0, 2);
}

function getFreeformSlugs(input: string): string[] {
  const i = input.toLowerCase();
  if (i.includes("writ") || i.includes("content")) return ["blog-post-editor", "content-calendar-planner"];
  if (i.includes("report") || i.includes("data")) return ["data-analysis-assistant"];
  if (i.includes("email")) return ["sales-email-personalizer"];
  if (i.includes("meet")) return ["meeting-notes-to-actions"];
  return ["sop-documentation"];
}

export default function GeneratorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [context, setContext] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Workflow[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const { messages: msgs, nextStep } = getNextStep(0, "", {});
    simulate(msgs);
    setStep(nextStep);
  }, []);

  const simulate = (msgs: ChatMessage[]) => {
    setIsTyping(true);
    setTimeout(() => { setIsTyping(false); setMessages((p) => [...p, ...msgs]); }, 1200);
  };

  const addResults = (slugs: string[]) => {
    setResults((prev) => {
      const existing = new Set(prev.map((w) => w.slug));
      const newOnes = slugs.filter((s) => !existing.has(s)).map((s) => workflows.find((w) => w.slug === s)).filter((w): w is Workflow => !!w);
      return [...prev, ...newOnes];
    });
  };

  const handleSend = (text?: string) => {
    const value = text || input.trim();
    if (!value || isTyping) return;
    setMessages((p) => [...p, { id: Math.random().toString(36).slice(2, 8), role: "user", content: value }]);
    setInput("");
    const ctx = { ...context };
    if (step === 1) ctx.role = value;
    setContext(ctx);
    const result = getNextStep(step, value, ctx);
    simulate(result.messages);
    setStep(result.nextStep);
    if (result.slugs) setTimeout(() => addResults(result.slugs!), 1500);
  };

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[12px] font-medium mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            AI-Powered
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Workflow Generator
          </h1>
          <p className="mt-2 text-muted text-[15px]">
            Tell me about your role and I&apos;ll build a personalized workflow toolkit for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chat */}
          <div className="flex-1 flex flex-col border border-border rounded-2xl overflow-hidden min-h-[500px]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-2.5 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === "user" ? "px-4 py-2.5 rounded-2xl rounded-br-md bg-accent text-white text-[14px]" : "text-[14px] leading-relaxed"}`}>
                    {msg.content.split("\n").map((line, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>))}
                    {msg.toolPills && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.toolPills.map((tool) => {
                          const sel = selectedTools.has(tool);
                          return (
                            <button key={tool} onClick={() => {
                              setSelectedTools((prev) => { const n = new Set(prev); if (n.has(tool)) n.delete(tool); else n.add(tool); setInput([...n].join(", ")); return n; });
                            }} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] border transition-colors ${sel ? "bg-accent/10 border-accent/30 text-accent" : "bg-surface border-border hover:border-accent/30"}`}>
                              <Image src={getToolLogoUrl(tool, 14)} alt={tool} width={14} height={14} unoptimized />{tool}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {msg.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.options.map((o) => (<button key={o.value} onClick={() => handleSend(o.label)} className="px-3.5 py-1.5 rounded-xl text-[13px] font-medium border border-border hover:border-accent/30 hover:text-accent transition-colors">{o.label}</button>))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-2.5">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div className="flex gap-1 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-light animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-light animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-light animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border p-3">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tell me about your work..." disabled={isTyping} className="flex-1 h-10 px-3 rounded-xl bg-surface border border-border text-[14px] placeholder:text-muted-light focus:outline-none focus:border-accent/40 disabled:opacity-50" />
                <button type="submit" disabled={isTyping || !input.trim()} className="h-10 w-10 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-hover disabled:opacity-20 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold">Your Workflows ({results.length})</h2>
              {results.length > 0 && (
                <Link href="/library" className="text-[12px] text-accent hover:text-accent-hover">Browse all</Link>
              )}
            </div>
            {results.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-border text-center">
                <p className="text-[13px] text-muted">Workflows will appear here as we chat</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((wf) => (
                  <Link key={wf.slug} href={`/workflow/${wf.slug}`} className="group block p-4 rounded-xl border border-border hover:border-muted-light transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface text-muted border border-border">{CATEGORY_LABELS[wf.category]}</span>
                      <MiniTrend points={wf.trend.points} />
                    </div>
                    <h3 className="text-[13px] font-semibold group-hover:text-accent transition-colors">{wf.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-light">{wf.subtitle}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-1">
                        {wf.tools.slice(0, 3).map((tool) => (
                          <Image key={tool} src={getToolLogoUrl(tool, 14)} alt={tool} width={14} height={14} className="rounded-sm" unoptimized />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-light">{wf.timeSaved} saved</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-[13px] text-muted-light">
        WorkflowAI
      </footer>
    </div>
  );
}
