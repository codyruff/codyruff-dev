// sections/About.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const BIO = [
  "CS major at Stonehill, incoming Security Engineer at Raytheon. Played D1 tight end for four years — a position built on doing the work no one applauds.",
  "I don't talk about what I'm going to do. I build it.",
  "Currently focused on cloud security, secure application design, and making systems that hold under pressure.",
];

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      // WHY: py-32 gives vertical breathing room, px-6 is mobile fallback —
      // the inner max-w-5xl mx-auto does the actual centering work
      className="relative z-10 min-h-screen w-full flex items-center py-32 px-6 md:px-12 lg:px-24"
    >
      {/* WHY: max-w-5xl + mx-auto centers the entire content block on all screen sizes.
          w-full ensures it doesn't collapse on mobile. */}
      <div className="w-full max-w-5xl mx-auto">

        {/* SECTION LABEL */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="font-mono text-[11px] tracking-[0.35em] text-gold/60 uppercase mb-16"
        >
          01 — About
        </motion.p>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Headshot */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.1 }}
            // WHY: justify-center on mobile, justify-start on lg so headshot
            // aligns to grid column edge on desktop — not flush to page edge
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-80 sm:w-80 sm:h-96">

              {/* HEADSHOT IMAGE */}
              <div className="w-full h-full rounded-sm overflow-hidden">
                <Image
                  src="/headshot.jpg"
                  alt="Cody Ruff"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              {/* GOLD BORDER TRACE */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <motion.rect
                  x="0.75"
                  y="0.75"
                  width="98.5"
                  height="98.5"
                  stroke="#B8962E"
                  strokeWidth="0.75"
                  strokeOpacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut" as const,
                    delay: 0.5,
                  }}
                />
              </svg>

              {/* OFFSET ACCENT FRAME */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/15 rounded-sm -z-10" />
            </div>
          </motion.div>

          {/* RIGHT — Bio */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            {BIO.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={FADE_UP}
                className={
                  i === 1
                    ? "font-display text-2xl sm:text-3xl text-gold leading-snug tracking-tight"
                    : "font-body text-base sm:text-lg text-cream/70 leading-relaxed"
                }
              >
                {paragraph}
              </motion.p>
            ))}

            {/* DIVIDER + META */}
            <motion.div
              variants={FADE_UP}
              className="flex items-center gap-4 pt-4"
            >
              <div className="w-12 h-px bg-gold/40" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-gold/50 uppercase">
                Stonehill College · 2026
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}