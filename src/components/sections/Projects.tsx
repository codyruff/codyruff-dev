// src/components/sections/Projects.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'
import { projects, type Project } from '@/data/projects'
import { ExternalLink } from 'lucide-react'

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function ProjectCard({ project }: { project: Project }) {
  const glowColor =
    project.accentColor === 'B8962E' ? 'gold' : project.accentColor === '7A9E7E' ? 'sage' : 'gold'

  return (
    <GlowCard glowColor={glowColor} customSize className={`flex flex-col justify-between p-6 ${project.featured ? 'min-h-[400px]' : 'min-h-[320px]'}`}>
      {/* TOP */}
      <div className="flex flex-col gap-4">
        {project.featured && (
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold/70 uppercase">
            Featured Project
          </span>
        )}
        <h3 className="font-display text-xl sm:text-2xl text-cream leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="font-body text-sm text-cream/60 leading-relaxed">{project.description}</p>
        {project.role && (
          <span className="inline-block self-start font-mono text-[10px] tracking-[0.2em] text-sage/90 uppercase border border-sage/30 rounded-sm px-2 py-1">
            {project.role}
          </span>
        )}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wider text-cream/40 bg-cream/5 border border-cream/10 rounded-sm px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-cream/40 hover:text-gold transition-colors duration-300 uppercase"
            >
              GitHub <ExternalLink size={11} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-cream/40 hover:text-gold transition-colors duration-300 uppercase"
            >
              Live <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  )
}

function GhostCard() {
  return (
    <GlowCard glowColor="gold" customSize className="flex flex-col items-center justify-center min-h-[320px] p-6">
      <div className="absolute inset-0 rounded-2xl border border-dashed border-gold/20 pointer-events-none" />
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-8 h-8 rounded-full border border-gold/25 flex items-center justify-center">
          <span className="text-gold/40 text-lg leading-none">+</span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.3em] text-cream/25 uppercase">More coming...</p>
      </div>
    </GlowCard>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    // WHY: px-6 sm:px-12 lg:px-24 matches About.tsx's padding exactly so "The Work"
    // heading and cards align with the rest of the page's content column
    <section
  id="projects"
    ref={ref}
    // WHY: flex flex-col mirrors About.tsx — uses flex layout not section padding
    // for positioning, which is immune to cascade layer conflicts in Tailwind v4
    className="relative z-10 min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-24"
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono text-[11px] tracking-[0.35em] text-gold/60 uppercase mb-4"
        >
          02 Projects
        </motion.p>

        {/* WHY: ml-0.5 nudges the heading off the raw edge — matches card grid left alignment */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl text-cream tracking-tight mb-16 ml-0.5"
        >
          The Work
        </motion.h2>

        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          // WHY: max-w-5xl matches About's content column for visual consistency site-wide
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={FADE_UP}
              className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          <motion.div variants={FADE_UP}>
            <GhostCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}