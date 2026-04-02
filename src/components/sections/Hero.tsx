// sections/Hero.tsx
"use client";

import { motion } from "framer-motion";

const NAME = "CODY RUFF";
const SUBTITLE = "Security Engineer · Builder · Stonehill '26";

export default function Hero() {
  const words = NAME.split(" ");

  return (
    // WHY: bg-transparent exposes the fixed BackgroundPaths canvas below — no competing fill
    // min-h-screen ensures the section takes the full first viewport
    // z-10 stacks hero content above the z-0 fixed canvas
    <section
      id="hero"
      className="relative z-10 min-h-screen w-full flex items-center justify-center overflow-visible bg-transparent"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* NAME — Barlow Condensed, letter-by-letter spring stagger */}
          <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none mb-6">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-6 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      // WHY: delay staggers per letter across both words — deliberate, not fast
                      delay: 0.4 + wordIndex * 0.15 + letterIndex * 0.04,
                      type: "spring",
                      stiffness: 120,
                      damping: 22,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-cream to-cream/70"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* SUBTITLE — fades in after name completes */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              // WHY: 1.4s delay ensures subtitle never competes visually with name stagger
              delay: 1.4,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="font-mono text-sm sm:text-base md:text-lg tracking-[0.25em] text-gold/80 uppercase mb-16"
          >
            {SUBTITLE}
          </motion.p>

          {/* SCROLL CUE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            {/* WHY: animated vertical line reads as "scroll down" without any text label */}
            <motion.div
              animate={{
                scaleY: [0.4, 1, 0.4],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent origin-top"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold/40 uppercase">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}