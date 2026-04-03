"use client";

import Image from "next/image";
import { getToolLogoUrl } from "@/lib/tool-logos";

interface ToolBadgeProps {
  tool: string;
  size?: "sm" | "md";
}

export default function ToolBadge({ tool, size = "sm" }: ToolBadgeProps) {
  const logoUrl = getToolLogoUrl(tool, size === "sm" ? 16 : 24);
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] gap-1.5"
      : "px-3 py-1.5 text-[12px] gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-md bg-white border border-border font-medium text-muted ${sizeClasses}`}
    >
      {logoUrl && (
        <Image
          src={logoUrl}
          alt={tool}
          width={size === "sm" ? 14 : 18}
          height={size === "sm" ? 14 : 18}
          className="shrink-0"
          unoptimized
        />
      )}
      {tool}
    </span>
  );
}
