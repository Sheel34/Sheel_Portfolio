import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import { site } from '../data/site'

// Landing. 3D scene full-bleed behind; text overlaid left for instant scan.
// The <3s read: NAME → precise title → one tagline. Everything else is chrome.
export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Faint engineering grid + left-side gradient for text legibility. */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-space-900 via-space-900/40 to-transparent" />

      {/* Text layer */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ● {site.status}
        </motion.p>

        <motion.h1
          className="max-w-3xl text-balance font-display text-5xl font-bold leading-[1.05] text-white sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-xl font-medium text-signal sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {site.title}
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {site.tagline}
        </motion.p>

        {/* Primary actions */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#projects"
            className="rounded bg-signal px-5 py-2.5 font-mono text-sm font-medium uppercase tracking-widest2 text-space-900 transition-transform hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-white/20 px-5 py-2.5 font-mono text-sm uppercase tracking-widest2 text-white/80 transition-colors hover:border-signal/60 hover:text-signal"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest2 text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll · drag globe to orbit
      </motion.div>
    </section>
  )
}
