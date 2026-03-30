"use client";

import HexPattern from "@/components/ui/HexPattern";
import AnimatedText from "@/components/ui/AnimatedText";

export default function Home() {
  return (
    <main style={{ background: '#0A0E1A', padding: '40px', position: 'relative', minHeight: '100vh' }}>

      <HexPattern />

      {/* Hero name — letter by letter stagger */}
    <AnimatedText
      text="CODY RUFF"
      as="h1"
      className="font-display text-cream text-8xl relative z-10"
      stagger={0.06}
      delay={0.2}
    />

    {/* Subtitle — slightly faster stagger */}
    <AnimatedText
      text="Security Engineer · Builder · Stonehill 26"
      as="p"
      className="font-body text-sage text-xl relative z-10 mt-4"
      stagger={0.02}
      delay={0.8}
    />

    {/* Mono line */}
    <AnimatedText
      text="Connecting to Cody's World..."
      as="p"
      className="font-mono text-gold text-sm relative z-10 mt-4"
      stagger={0.03}
      delay={1.2}
    />

    </main>
  );
}