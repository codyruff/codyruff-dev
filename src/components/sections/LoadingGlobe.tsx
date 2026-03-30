"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

type LoadingGlobeProps = {
  onComplete: () => void; // Called when globe dismisses → triggers Hero
};

export default function LoadingGlobe({ onComplete }: LoadingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Show text after short delay
    const textTimer = setTimeout(() => setTextVisible(true), 600);

    // Dismiss globe after 3.2 seconds
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800); // wait for exit animation
    }, 3200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!canvasRef.current) return;

    globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600,
        height: 600,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.12, 0.22, 0.37],
        markerColor: [0.72, 0.59, 0.18],
        glowColor: [0.12, 0.22, 0.37],
        markers: [
            { location: [42.0195, -71.1022], size: 0.06 },
            { location: [51.5074, -0.1278], size: 0.03 },
            { location: [35.6762, 139.6503], size: 0.03 },
            { location: [48.8566, 2.3522], size: 0.03 },
            { location: [-33.8688, 151.2093], size: 0.03 },
            { location: [37.7749, -122.4194], size: 0.03 },
            { location: [1.3521, 103.8198], size: 0.03 },
        ],
        // @ts-expect-error cobe types incomplete
        onRender: (state: Record<string, number>) => {
            state.phi = phiRef.current;
            phiRef.current += 0.003;
        },
        });

    return () => {
      globeRef.current?.destroy();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-globe"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* Globe canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="w-[300px] h-[300px] md:w-[420px] md:h-[420px]"
            />
            {/* Radial fade at globe edges */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, transparent 40%, #0A0E1A 75%)",
              }}
            />
          </motion.div>

          {/* Loading text */}
          <AnimatePresence>
            {textVisible && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <p className="font-mono text-gold text-sm tracking-[0.3em] uppercase">
                  Connecting to Cody&apos;s World...
                </p>

                {/* Animated dots progress bar */}
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-gold"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}