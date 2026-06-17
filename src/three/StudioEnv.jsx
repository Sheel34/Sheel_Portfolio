import { Environment, Lightformer } from '@react-three/drei'

// ─────────────────────────────────────────────────────────────────────────────
// StudioEnv — image-based lighting (IBL) built ENTIRELY from Lightformers.
// No HDRI file to fetch → zero network dep, fully offline, fast. This is the
// pmndrs product-render trick: the metal surface reflects these light panels,
// giving the high-craft "studio metal" look without textures.
// `frames={1}` bakes the env map once (it's static) → cheap.
// ─────────────────────────────────────────────────────────────────────────────
export default function StudioEnv({ accent = '#38bdf8' }) {
  return (
    <Environment resolution={256} frames={1}>
      {/* Key light — broad soft white panel, front-top. */}
      <Lightformer
        form="rect"
        intensity={2.2}
        position={[0, 2.5, 4]}
        scale={[7, 7, 1]}
        color="#eaf2ff"
      />
      {/* Accent rim — colored edge light from the left. */}
      <Lightformer
        form="rect"
        intensity={1.6}
        position={[-5, 1, 2]}
        scale={[3, 7, 1]}
        color={accent}
      />
      {/* Cool fill from the right. */}
      <Lightformer
        form="rect"
        intensity={1.1}
        position={[5, -1, 2]}
        scale={[3, 5, 1]}
        color="#7aa2ff"
      />
      {/* Deep back glow — separates the body from the void. */}
      <Lightformer
        form="ring"
        intensity={0.8}
        position={[0, 0, -5]}
        scale={[6, 6, 1]}
        color="#0a3050"
      />
    </Environment>
  )
}
