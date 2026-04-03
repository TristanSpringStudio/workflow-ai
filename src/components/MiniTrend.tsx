"use client";

interface MiniTrendProps {
  points: number[];
  color?: string;
}

export default function MiniTrend({
  points,
  color = "#2563eb",
}: MiniTrendProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const w = 80;
  const h = 28;
  const pad = 2;

  const coords = points.map((val, i) => ({
    x: pad + (i / (points.length - 1)) * (w - pad * 2),
    y: pad + (h - pad * 2) - ((val - min) / range) * (h - pad * 2),
  }));

  const line =
    `M ${coords[0].x} ${coords[0].y} ` +
    coords
      .slice(1)
      .map((p, i) => {
        const prev = coords[i];
        const cpx = (prev.x + p.x) / 2;
        return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
      })
      .join(" ");

  const area =
    line +
    ` L ${coords[coords.length - 1].x} ${h - pad}` +
    ` L ${coords[0].x} ${h - pad} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-20 h-7"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={`mf-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#mf-${color.replace("#", "")})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
