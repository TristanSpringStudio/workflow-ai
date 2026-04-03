"use client";

import Image from "next/image";
import { getToolLogoUrl } from "@/lib/tool-logos";

interface WorkflowCanvasProps {
  tools: string[];
  title: string;
}

export default function WorkflowCanvas({ tools, title }: WorkflowCanvasProps) {
  // Build flow: first tool is input, Claude/AI is processor, last tool is output
  // If only 1 tool (Claude), show: Your work → Claude → Polished output
  // If 2+ tools: first non-AI tool → Claude → remaining tools

  const aiTool = tools.find(
    (t) => t === "Claude" || t === "ChatGPT"
  ) || "Claude";
  const otherTools = tools.filter((t) => t !== "Claude" && t !== "ChatGPT");

  const inputTools = otherTools.slice(0, Math.ceil(otherTools.length / 2));
  const outputTools =
    otherTools.length > 1
      ? otherTools.slice(Math.ceil(otherTools.length / 2))
      : otherTools;

  // If no other tools, use generic labels
  const inputs = inputTools.length > 0 ? inputTools : ["Your input"];
  const outputs = outputTools.length > 0 ? outputTools : ["Polished output"];

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border">
      <div className="flex items-center gap-2 mb-5">
        <svg
          className="w-4 h-4 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span className="text-[11px] font-semibold text-muted-light uppercase tracking-widest">
          How it works
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto py-2">
        {/* Inputs */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          {inputs.map((tool) => (
            <CanvasNode key={tool} label={tool} type="input" />
          ))}
        </div>

        {/* Arrow */}
        <Arrow />

        {/* AI processor */}
        <CanvasNode label={aiTool} type="processor" />

        {/* Arrow */}
        <Arrow />

        {/* Outputs */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          {outputs.map((tool) => (
            <CanvasNode key={tool} label={tool} type="output" />
          ))}
        </div>
      </div>
    </div>
  );
}

function CanvasNode({
  label,
  type,
}: {
  label: string;
  type: "input" | "processor" | "output";
}) {
  const logoUrl = getToolLogoUrl(label, 32);

  const borderClass =
    type === "processor"
      ? "border-accent/30 bg-accent/5"
      : type === "input"
        ? "border-blue-200 bg-blue-50/50"
        : "border-green-200 bg-green-50/50";

  return (
    <div
      className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border ${borderClass} min-w-[80px]`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={label}
          width={28}
          height={28}
          className="shrink-0"
          unoptimized
        />
      ) : (
        <div className="w-7 h-7 rounded-lg bg-muted/10 flex items-center justify-center text-[12px] font-bold text-muted">
          {label.charAt(0)}
        </div>
      )}
      <span className="text-[11px] font-medium text-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center shrink-0 text-muted-light">
      <div className="w-6 sm:w-10 h-px bg-border" />
      <svg className="w-3 h-3 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </div>
  );
}
