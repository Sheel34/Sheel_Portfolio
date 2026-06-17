import { motion } from 'framer-motion'

// Direction — one cinematic statement. Confident, honest, no paragraphs.
export default function Direction() {
  return (
    <section id="direction" className="relative flex min-h-[80svh] items-center">
      <div className="mx-auto max-w-3xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6"
        >
          Direction
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-3xl font-semibold leading-snug text-white sm:text-5xl"
        >
          I want to build the simulation and control systems behind real
          <span className="text-signal"> rockets, vehicles, and space hardware.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-lg text-white/55"
        >
          Looking for CS / software roles in simulation, graphics, and systems.
          Open to relocation. I&apos;d rather understand one hard system completely
          than wire together ten shallow ones.
        </motion.p>
      </div>
    </section>
  )
}
