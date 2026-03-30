"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Trail = { x: number; y: number; id: number };

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed cursor position — spring gives it the "gliding" feel
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let trailTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Add trail particle
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);

      // Clear old trails
      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => setTrails([]), 120);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements for cursor scale effect
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const hoverables = document.querySelectorAll(
      "a, button, [data-hoverable]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      clearTimeout(trailTimeout);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${4 + index * 0.8}px`,
            height: `${4 + index * 0.8}px`,
            backgroundColor: "#B8962E",
            opacity: (index / trails.length) * 0.35,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s ease",
          }}
        />
      ))}

      {/* Main cursor orb */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
          backgroundColor: isHovering
            ? "rgba(184, 150, 46, 0.15)"
            : "rgba(184, 150, 46, 0.9)",
          border: isHovering
            ? "1.5px solid rgba(184, 150, 46, 0.8)"
            : "none",
          boxShadow: isHovering
            ? "0 0 20px rgba(184, 150, 46, 0.3)"
            : "0 0 10px rgba(184, 150, 46, 0.6)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}