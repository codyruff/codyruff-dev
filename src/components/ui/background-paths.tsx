// components/ui/background-paths.tsx
"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    opacity: 0.06 + i * 0.025,
  }));

  return (
    // WHY: overflow-visible on this div allows SVG paths to bleed outside their container
    // without being clipped — critical for the full-page ambient effect
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <svg
        // WHY: overflow-visible on the SVG itself is the second layer of clip prevention —
        // browsers apply clip at both the element AND the svg viewBox without this
        className="w-full h-full text-gold overflow-visible"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [path.opacity * 0.4, path.opacity, path.opacity * 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + path.id * 0.4,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: 8 + path.id * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    // WHY: fixed + inset-0 + z-0 = permanent full-viewport canvas behind ALL sections
    // position:fixed means it never scrolls with the page — paths persist everywhere
    // pointer-events-none ensures it never intercepts clicks on content above it
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-navy">
      {/* WHY: position=1 fans paths right, position=-1 mirrors left — bilateral tunnel symmetry */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}