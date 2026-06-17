import { motion } from 'framer-motion'
import { site } from '../data/site'

// Hero — cinematic, minimal. Name + one line. The space scene lives behind
// (BackgroundCanvas). Text sits right so the planet (left) has room to breathe.
export default function Hero() {
  return (
    <section id="top" className="relative flex h-[100svh] items-center">
      <div className="ml-auto max-w-2xl px-5 text-right sm:px-10">
        <motion.p
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {site.status}
        </motion.p>

        <motion.h1
          className="font-display text-6xl font-bold leading-[0.95] text-white sm:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          SHEEL
          <br />
          PATEL
        </motion.h1>

        <motion.p
          className="mt-6 text-lg font-medium text-signal-ice sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I build real-time systems for hard
          <br className="hidden sm:block" /> physical &amp; space problems.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest2 text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll
      </motion.div>
    </section>
  )
}
