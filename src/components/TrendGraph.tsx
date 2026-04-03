"use client";

import type { TrendData } from "@/lib/workflows";

interface TrendGraphProps {
  trend: TrendData;
}

export default function TrendGraph({ trend }: TrendGraphProps) {
  const points = trend.points;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const width = 280;
  const height = 100;
  const padding = { top: 8, right: 8, bottom: 4, left: 8 };
  const graphW = width - padding.left - padding.right;
  const graphH = height - padding.top - padding.bottom;

  // Build SVG path
  const pathPoints = points.map((val, i) => {
    const x = padding.left + (i / (points.length - 1)) * graphW;
    const y = padding.top + graphH - ((val - min) / range) * graphH;
    return { x, y };
  });

  // Smooth line
  const linePath =
    `M ${pathPoints[0].x} ${pathPoints[0].y} ` +
    pathPoints
      .slice(1)
      .map((p, i) => {
        const prev = pathPoints[i];
        const cpx = (prev.x + p.x) / 2;
        return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
      })
      .join(" ");

  // Area fill
  const areaPath =
    linePath +
    ` L ${pathPoints[pathPoints.length - 1].x} ${padding.top + graphH}` +
    ` L ${pathPoints[0].x} ${padding.top + graphH} Z`;

  // Growth percentage
  const firstVal = points[0];
  const lastVal = points[points.length - 1];
  const growthPct = Math.round(((lastVal - firstVal) / firstVal) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-muted">{trend.label}</span>
        <span
          className={`text-[12px] font-semibold ${
            growthPct > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {growthPct > 0 ? "+" : ""}
          {growthPct.toLocaleString()}%
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#trendFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-muted-light">Jan 2024</span>
        <span className="text-[10px] text-muted-light">Dec 2025</span>
      </div>
      <p className="text-[10px] text-muted-light mt-1">{trend.source}</p>
    </div>
  );
}
