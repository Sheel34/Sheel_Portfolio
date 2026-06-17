import { motion } from 'framer-motion'

// Direction & Focus — short, honest aerospace-direction note near the end.
// Confident, anti-shallow-dev, but does NOT overclaim experience.
export default function Direction() {
  return (
    <section id="direction" className="relative scroll-mt-20 border-y border-white/10 bg-space-800">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">Direction &amp; Focus</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            I want to build the simulation and reconstruction systems behind real
            physical and space hardware.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-300">
            <p>
              My pull is toward hard systems — rockets, vehicles, planetary and
              space infrastructure — and the software that models, reconstructs,
              and simulates them. That is where I am pointing my work.
            </p>
            <p>
              Right now I am an engineer who likes going deep: reconstruction
              pipelines, simulation loops, and getting complex systems to behave
              correctly under real data. I am looking for CS / software roles in
              simulation, graphics, and systems where that depth matters — and I
              am open to relocation.
            </p>
            <p className="text-slate-400">
              No service-shop, ship-a-form mindset. I would rather understand one
              hard system completely than wire together ten shallow ones.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
