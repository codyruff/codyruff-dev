"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;          // Delay before animation starts (seconds)
  stagger?: number;        // Time between each letter (seconds)
  duration?: number;       // Each letter's animation duration
  once?: boolean;          // Only animate once (true) or every time in view
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};

export default function AnimatedText({
  text,
  className,
  letterClassName,
  delay = 0,
  stagger = 0.04,
  duration = 0.5,
  once = true,
  as: Tag = "h1",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

  // Split into words then letters — preserves spacing
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap", className)}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
  <span
    key={wordIndex}
    className="flex"
  >
    {word.split("").map((letter, letterIndex) => (
      <motion.span
        key={letterIndex}
        variants={letterVariants}
        className={cn("inline-block", letterClassName)}
        aria-hidden="true"
      >
        {letter}
      </motion.span>
    ))}
    {/* Explicit space after every word except the last */}
    {wordIndex < words.length - 1 && (
      <motion.span
        variants={letterVariants}
        className="inline-block"
        aria-hidden="true"
        >
            &nbsp;
        </motion.span>
        )}
    </span>
    ))}
    </motion.div>
  );
}