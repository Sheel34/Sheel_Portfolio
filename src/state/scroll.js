// Mutable scroll signal read by the 3D scene each frame (no React re-renders).
export const scroll = {
  y: 0,
  progress: 0, // 0..1 over the whole page
  vh: typeof window !== 'undefined' ? window.innerHeight : 800,
  venomEl: null,
}

function update() {
  scroll.y = window.scrollY || window.pageYOffset || 0
  scroll.vh = window.innerHeight || 800
  const max = document.body.scrollHeight - scroll.vh
  scroll.progress = max > 0 ? Math.min(1, scroll.y / max) : 0
}

let inited = false
export function initScroll() {
  if (inited || typeof window === 'undefined') return
  inited = true
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}

export function registerVenom(el) {
  scroll.venomEl = el
}

// 0..1 — how centered the VENOM section is in the viewport. Drives the arm fade.
export function venomVisibility() {
  const el = scroll.venomEl
  if (!el) return 0
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight || scroll.vh || 800
  const center = r.top + r.height / 2
  const dist = Math.abs(center - vh / 2) / vh
  return Math.max(0, 1 - dist * 1.15)
}
