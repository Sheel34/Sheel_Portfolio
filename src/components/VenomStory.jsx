import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { registerVenom } from '../state/scroll'
import VideoPlayer from './VideoPlayer'

const venom = projects.find((p) => p.id === 'venom') || {}

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -20% 0px' },
  transition: { duration: 0.7 },
}

// VENOM — the story. The 3D arm rotates behind this whole section (driven by
// scroll via registerVenom) and fades once you scroll past. Minimal text.
export default function VenomStory() {
  const ref = useRef(null)
  useEffect(() => {
    registerVenom(ref.current)
    return () => registerVenom(null)
  }, [])

  return (
    <section id="venom" ref={ref} className="relative">
      {/* BEAT 1 — WHAT I BUILT */}
      <div className="relative flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-6xl px-5">
          <motion.p {...reveal} className="eyebrow mb-6">
            01 — What I built
          </motion.p>

          <motion.h2 {...reveal} className="poster-title text-[22vw] sm:text-[15rem]">
            VENOM
          </motion.h2>

          <motion.div {...reveal} className="venom-rule my-5 max-w-xl" />

          <motion.p
            {...reveal}
            className="font-condensed text-2xl font-medium uppercase tracking-wide text-white sm:text-4xl"
          >
            Robotic Bomb Disposal System
          </motion.p>

          <motion.p {...reveal} className="mt-4 max-w-lg text-lg text-signal-ice">
            Controlled by your own hand — not a joystick.
          </motion.p>

          {/* The pipeline, as 3 chips. No paragraphs. */}
          <motion.div {...reveal} className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest2">
            <span className="rounded-full border border-venom/50 px-4 py-2 text-venom">
              Vision · OpenCV — me
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">
              Inverse kinematics — Anirudh
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">
              RTOS control loop
            </span>
          </motion.div>
        </div>
      </div>

      {/* BEAT 2 — WHAT I WON */}
      <div className="relative flex min-h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.p {...reveal} className="eyebrow mb-6">
              02 — What I won
            </motion.p>

            <motion.div {...reveal} className="space-y-7">
              <Stat value="1st" label="Science & Technology · Republic Plenary Summit — Limitless India Youth Hackathon 2025" />
              <Stat value="Top 30" label="Under 30 in India" />
              <Stat value="10,000+" label="Engineers, startups & innovators we beat" />
            </motion.div>

            {venom.links?.repo && (
              <motion.a
                {...reveal}
                href={venom.links.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-block rounded border border-signal/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest2 text-signal transition-colors hover:bg-signal/10"
              >
                Repository →
              </motion.a>
            )}
          </div>

          {/* Demo video */}
          {venom.video && (
            <motion.div {...reveal}>
              <VideoPlayer src={venom.video} poster={venom.thumbnail} label="VENOM demo" />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-white/40">
                Live demo · Tech Expo 2025
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="font-poster text-6xl leading-none text-white sm:text-7xl">{value}</span>
      <span className="max-w-xs font-mono text-[12px] leading-snug text-white/55">{label}</span>
    </div>
  )
}
