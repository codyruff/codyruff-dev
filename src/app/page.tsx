// page.tsx
"use client";

// WHY: useState needed to track when LoadingGlobe finishes its animation
import { useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
//import Skills from "@/sections/Skills";
//import Contact from "@/sections/Contact";
import LoadingGlobe from "@/components/sections/LoadingGlobe";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Page() {
  // WHY: false = globe is showing, true = globe dismissed, main site renders
  const [globeDone, setGlobeDone] = useState(false);

  return (
    <main className="relative bg-navy">
      {/* WHY: BackgroundPaths is z-0 fixed — ambient canvas behind everything including globe */}
      <BackgroundPaths />

      {/* WHY: Globe always mounts first; onComplete flips globeDone to true at ~2.8s */}
      <LoadingGlobe onComplete={() => setGlobeDone(true)} />

      {/* WHY: Site content is hidden until globe dismisses — prevents flash of unstyled content */}
      {globeDone && (
        <>
          <Hero />
          <div className="relative z-10">
            <div className="bg-navy/90">
              <About />
            </div>
            <div className="bg-slate/85">
              <Projects />
            </div>
            <div className="bg-navy/90">
              {/* <Skills /> */}
            </div>
            <div className="bg-slate/80">
              {/* <Contact /> */}
            </div>
          </div>
        </>
      )}
    </main>
  );
}