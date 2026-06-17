import { site } from '../data/site'

// Footer — contact + the three primary exits (email, GitHub, resume).
export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-16">
      <div className="hairline mb-10" />
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Get in touch</p>
          <a
            href={`mailto:${site.links.email}`}
            className="font-display text-2xl font-semibold text-white transition-colors hover:text-signal sm:text-3xl"
          >
            {site.links.email}
          </a>
        </div>

        <div className="flex gap-6 font-mono text-[12px] uppercase tracking-widest2 text-white/60">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-signal"
          >
            GitHub
          </a>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-signal"
          >
            View Resume
          </a>
          <a href="#top" className="transition-colors hover:text-signal">
            Top ↑
          </a>
        </div>
      </div>

      <p className="mt-10 font-mono text-[11px] text-white/30">
        © {new Date().getFullYear()} {site.name}. Built with React Three Fiber.
      </p>
    </footer>
  )
}
