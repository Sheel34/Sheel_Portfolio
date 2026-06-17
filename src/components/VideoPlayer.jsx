import { useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// VideoPlayer — inline, on-page video. Shows a poster + play button (YouTube-
// style preview); on click it plays in place with native controls. Viewers can
// go fullscreen via the controls. Nothing redirects off-page.
//
// Mobile-safe: `playsInline` (iOS plays in place instead of forcing native
// fullscreen), `preload="metadata"` (only the poster + a few KB load until the
// user hits play — friendly on mobile data). Video lives in /public.
// ─────────────────────────────────────────────────────────────────────────────
export default function VideoPlayer({ src, poster, label = 'Demo' }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    setStarted(true)
    // Defer so controls mount before we call play().
    requestAnimationFrame(() => ref.current?.play())
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started} // controls appear once playing (clean preview before)
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onPlay={() => setStarted(true)}
      />

      {/* Poster overlay with play button — hidden once playback starts. */}
      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
            {/* Play triangle */}
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
              <path d="M21 12 0 24V0l21 12Z" fill="#5eead4" />
            </svg>
          </span>
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest2 text-white/70">
            {label} · click to play
          </span>
        </button>
      )}
    </div>
  )
}
