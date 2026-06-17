import { site } from '../data/site'

// Minimal nav — callsign + two exits. No clutter.
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-mono text-sm tracking-widest2 text-white/90">
          {site.name.toUpperCase()}
        </a>
        <div className="flex items-center gap-5 font-mono text-[12px] uppercase tracking-widest2 text-white/60">
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
            className="rounded border border-signal/40 px-3 py-1.5 text-signal transition-colors hover:bg-signal/10"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
