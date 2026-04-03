"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

interface ChatProps {
  onComplete: (
    messages: Array<{ role: string; content: string }>,
    profile: Record<string, unknown>
  ) => void;
}

function getTextContent(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text!)
    .join("");
}

const interviewTransport = new DefaultChatTransport({ api: "/api/interview" });

export default function Chat({ onComplete }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: interviewTransport,
    onFinish: ({ message }) => {
      const text = getTextContent(message.parts);
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        try {
          const profile = JSON.parse(jsonMatch[1]);
          setCompleted(true);
          setTimeout(() => {
            const serialized = messages.map((m) => ({
              role: m.role,
              content: getTextContent(m.parts),
            }));
            onComplete(serialized, profile);
          }, 2000);
        } catch {
          // Not valid JSON, continue
        }
      }
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Kick off the conversation on mount
  const hasStarted = useRef(false);
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      sendMessage({ text: "Hi, I'd like to get started with my AI consultation." });
    }
  }, [sendMessage]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || completed) return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => {
            const text = getTextContent(message.parts);
            // Strip out JSON profile block from display
            const displayContent = text
              .replace(/```(?:json)?\s*\{[\s\S]*?\}\s*```/g, "")
              .trim();

            if (!displayContent) return null;

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in-up`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                    message.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-surface border border-border rounded-bl-md"
                  }`}
                >
                  {displayContent}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="typing-dot w-2 h-2 rounded-full bg-muted/50" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-muted/50" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-muted/50" />
                </div>
              </div>
            </div>
          )}

          {/* Completion message */}
          {completed && (
            <div className="flex justify-center animate-fade-in-up">
              <div className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Building your personalized roadmap...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              completed ? "Interview complete!" : "Type your response..."
            }
            disabled={isLoading || completed}
            className="flex-1 h-12 px-4 rounded-xl bg-background border border-border focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-[15px] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || completed}
            className="h-12 w-12 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
