import { site } from '../data/site'

// Footer — contact + exits. Minimal.
export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-5 py-20">
      <div className="venom-rule mb-10 max-w-[120px] opacity-60" />
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <a
          href={`mailto:${site.links.email}`}
          className="font-display text-2xl font-semibold text-white transition-colors hover:text-signal sm:text-4xl"
        >
          {site.links.email}
        </a>
        <div className="flex gap-6 font-mono text-[12px] uppercase tracking-widest2 text-white/60">
          <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-signal">
            GitHub
          </a>
          <a href={site.links.resume} target="_blank" rel="noreferrer" className="hover:text-signal">
            Resume
          </a>
          <a href="#top" className="hover:text-signal">
            Top ↑
          </a>
        </div>
      </div>
      <p className="mt-10 font-mono text-[11px] text-white/30">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
