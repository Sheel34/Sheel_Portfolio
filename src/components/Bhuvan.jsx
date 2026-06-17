import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const bhuvan = projects.find((p) => p.id === 'bhuvan') || {}

// BHUVAN — minimal teaser until real details land. Honest, no filler.
export default function Bhuvan() {
  return (
    <section id="bhuvan" className="relative flex min-h-[80svh] items-center">
      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5"
        >
          03 — Next
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-condensed text-6xl font-bold uppercase tracking-wide text-white sm:text-8xl"
        >
          BHUVAN
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-md text-lg text-white/60"
        >
          In progress. Full breakdown dropping soon.
        </motion.p>

        {bhuvan.links?.repo && (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            href={bhuvan.links.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-block rounded border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-white/80 transition-colors hover:border-signal/60 hover:text-signal"
          >
            Repository →
          </motion.a>
        )}
      </div>
    </section>
  )
}
