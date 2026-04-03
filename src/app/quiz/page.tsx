"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROLES, TOOLS, ROLE_TASKS } from "@/lib/workflows";
import { saveProfile } from "@/lib/storage";

type Step = 1 | 2 | 3 | 4;

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");

  const availableTasks = role ? ROLE_TASKS[role] || [] : [];

  const toggleTask = (task: string) => {
    setTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const toggleTool = (tool: string) => {
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleFinish = () => {
    saveProfile({
      role,
      tasks,
      tools,
      difficulty,
      createdAt: new Date().toISOString(),
    });
    router.push("/picks");
  };

  const canProceed = () => {
    if (step === 1) return !!role;
    if (step === 2) return tasks.length > 0;
    if (step === 3) return tools.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            WorkflowAI
          </Link>
          <Link
            href="/"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            Skip
          </Link>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 py-16">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Role */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              What best describes your role?
            </h1>
            <p className="text-muted text-[14px] mb-8">
              We&apos;ll use this to find workflows most relevant to you.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setTasks([]);
                  }}
                  className={`p-3 rounded-xl text-[14px] font-medium text-left border transition-colors ${
                    role === r
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-muted-light"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tasks */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              What do you spend the most time on?
            </h1>
            <p className="text-muted text-[14px] mb-8">
              Select all that apply. These help us prioritize your workflow
              recommendations.
            </p>
            <div className="space-y-2">
              {availableTasks.map((task) => (
                <button
                  key={task}
                  onClick={() => toggleTask(task)}
                  className={`w-full p-3 rounded-xl text-[14px] text-left border transition-colors ${
                    tasks.includes(task)
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-muted-light"
                  }`}
                >
                  {task}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Tools */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              What tools do you use daily?
            </h1>
            <p className="text-muted text-[14px] mb-8">
              We&apos;ll recommend workflows that work with your existing stack.
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    tools.includes(tool)
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-muted-light text-muted"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Difficulty */}
        {step === 4 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              How comfortable are you with AI tools?
            </h1>
            <p className="text-muted text-[14px] mb-8">
              This helps us recommend the right starting point.
            </p>
            <div className="space-y-3">
              {[
                {
                  value: "beginner" as const,
                  label: "Beginner",
                  desc: "I've used ChatGPT or Claude a few times to ask questions",
                },
                {
                  value: "intermediate" as const,
                  label: "Intermediate",
                  desc: "I use AI regularly for writing, research, or brainstorming",
                },
                {
                  value: "advanced" as const,
                  label: "Advanced",
                  desc: "I've built prompts, projects, or automations with AI",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`w-full p-4 rounded-xl text-left border transition-colors ${
                    difficulty === opt.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-light"
                  }`}
                >
                  <span className="text-[15px] font-medium">{opt.label}</span>
                  <p className="mt-0.5 text-[13px] text-muted">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as Step)}
              className="text-[13px] text-muted hover:text-foreground transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed()}
              className="px-6 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors"
            >
              See my workflows
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
