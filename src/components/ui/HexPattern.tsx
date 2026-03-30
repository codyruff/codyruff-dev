"use client";

import { cn } from "@/lib/utils";

type HexPatternProps = {
  className?: string;
  opacity?: number;       // 0-1, default 0.05
  color?: string;         // hex color, default steel blue
  size?: number;          // hex size in px, default 40
};

export default function HexPattern({
  className,
  opacity = 0.2,
  color = "#1E3A5F",
  size = 60,
}: HexPatternProps) {
  const id = `hex-${Math.round(size)}-${color.replace("#", "")}`;

  // Hexagon geometry
  const w = size;
  const h = size * 1.1547; // height = size * (2/√3)
  const patternW = w * 1.5;
  const patternH = h;

  // Points for a flat-top hexagon
  const hex = (cx: number, cy: number, r: number) => {
    const angles = [0, 60, 120, 180, 240, 300];
    return angles
      .map((a) => {
        const rad = ((a - 30) * Math.PI) / 180;
        return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
      })
      .join(" ");
  };

  const r = size * 0.5;
  const cx1 = w * 0.5;
  const cy1 = h * 0.5;
  const cx2 = w;
  const cy2 = 0;

  return (
    <div
      className={cn("hex-pattern-container", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={id}
            x="0"
            y="0"
            width={patternW}
            height={patternH}
            patternUnits="userSpaceOnUse"
          >
            {/* Primary hex */}
            <polygon
              points={hex(cx1, cy1, r)}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            {/* Offset hex for interlocking effect */}
            <polygon
              points={hex(cx2, cy2, r)}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            <polygon
              points={hex(cx2, patternH, r)}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            {/* Blocking angle lines — 45° lineman stance motif */}
            <line
              x1={cx1 - r * 0.3}
              y1={cy1 - r * 0.3}
              x2={cx1 + r * 0.3}
              y2={cy1 + r * 0.3}
              stroke={color}
              strokeWidth="0.4"
              opacity="0.6"
            />
            <line
              x1={cx1 + r * 0.3}
              y1={cy1 - r * 0.3}
              x2={cx1 - r * 0.3}
              y2={cy1 + r * 0.3}
              stroke={color}
              strokeWidth="0.4"
              opacity="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}