# Sheel Patel — Portfolio

3D reconstruction & simulation systems portfolio. React + React Three Fiber + Tailwind + Framer Motion, deployed on Vercel.

---

## Demo — VENOM

<!-- Plays INLINE on this README: click play, watch in place, fullscreen via the controls. No redirect. Works on GitHub web + mobile.
     The mp4 already ships in public/videos/ (it powers the live site), so nothing extra to upload — GitHub serves it by raw URL.
     ⚠️ Edit the URL below to match YOUR username/repo and default branch (main vs master). -->

<video src="https://github.com/Sheel34/Sheel_Portfolio/raw/main/public/videos/venom-demo.mp4" controls width="100%" poster="https://github.com/Sheel34/Sheel_Portfolio/raw/main/public/videos/venom-thumb.jpg"></video>

---

## Quick start

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

---

## What to edit (everything is data-driven)

| You want to change… | Edit this file |
| --- | --- |
| Name, title, tagline, status, GitHub, email, resume path | `src/data/site.js` |
| Projects (VENOM, BHUVAN) — text, bullets, stack, links, metrics | `src/data/projects.js` |
| Colors / fonts | `tailwind.config.js` |
| Section copy (Direction & Focus) | `src/components/Direction.jsx` |

Change → `git push` → Vercel redeploys → live. No other code changes needed.

### Projects (`src/data/projects.js`)
Each entry is one object in the `projects` array. Order in the array = order on the page.
- **BHUVAN** is filled with a reconstruction-flavored draft — replace bullets/links/metrics with your real ones.
- **VENOM** is a PLACEHOLDER — fill in `summary`, `problem`, `approach`, `stack`, `links`.
- `visual: '3d'` renders the embedded reconstruction globe. To use a still image instead, set `visual: 'still'` and `image: '/your-image.png'` (put the image in `public/`).
- `accent`: `'teal' | 'blue' | 'amber'`.

### Resume
Drop your PDF at `public/resume.pdf`. It serves at `/resume.pdf` and all "View Resume"
links open it in a new tab (no forced download). Delete `public/resume-README.txt` after.

---

## Adding a real Blender asset (optional, later)

1. Export from Blender as **glTF Binary (.glb)**, drop in `public/models/`.
2. In `src/three/ReconstructionGlobe.jsx`, replace the procedural geometry with:

```jsx
import { useGLTF } from '@react-three/drei'
// ...
const { scene } = useGLTF('/models/your-asset.glb')
return <primitive object={scene} />
```

3. drei caches it; call `useGLTF.preload('/models/your-asset.glb')` for faster first paint.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. On vercel.com → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build `npm run build`, output `dist`. Deploy.
4. Every `git push` to the main branch redeploys automatically.

---

## Performance notes

- Hero geometry detail + background point count scale down on screens < 768px.
- Project 3D visuals mount only when scrolled into view (one WebGL context each, lazily).
- `dpr` clamped to `[1, 2]`; drei `AdaptiveDpr` drops it further under GPU load.
- Globe is pure math (no textures/assets) → tiny bundle, fast first paint.
```
