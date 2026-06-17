import { useRef, useState } from 'react'

// Inline video: poster + play button, then native controls in place (fullscreen
// via controls, no redirect). playsInline + preload="metadata" keep it mobile-
// and data-friendly. Source lives in /public.
export default function VideoPlayer({ src, poster, label = 'Demo' }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    setStarted(true)
    requestAnimationFrame(() => ref.current?.play())
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onPlay={() => setStarted(true)}
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
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
