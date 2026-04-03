"use client";

import { useRouter } from "next/navigation";
import Chat from "@/components/Chat";
import { saveProfile, type UserProfile } from "@/lib/storage";

export default function InterviewPage() {
  const router = useRouter();

  const handleComplete = (
    _messages: Array<{ role: string; content: string }>,
    profile: Record<string, unknown>
  ) => {
    saveProfile({
      role: (profile.role as string) || "",
      tasks: (profile.dailyTasks as string[]) || [],
      tools: (profile.tools as string[]) || [],
      difficulty:
        (profile.techComfort as "beginner" | "intermediate" | "advanced") ||
        "beginner",
      createdAt: new Date().toISOString(),
    });
    router.push("/picks");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="shrink-0 border-b border-border bg-surface px-6 py-3 flex items-center justify-between">
        <span className="text-[15px] font-semibold tracking-tight">
          WorkflowAI
        </span>
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Consultation
        </div>
      </header>
      <div className="flex-1 min-h-0">
        <Chat onComplete={handleComplete} />
      </div>
    </div>
  );
}
