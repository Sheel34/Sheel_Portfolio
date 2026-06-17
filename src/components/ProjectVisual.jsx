import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useInView } from 'framer-motion'
import MetalPlanet from '../three/MetalPlanet'
import StudioEnv from '../three/StudioEnv'
import Effects from '../three/Effects'
import GLTFModel from '../three/GLTFModel'

const ACCENT_HEX = { teal: '#5eead4', blue: '#38bdf8', amber: '#f5a524' }

// Per-project embedded 3D visual — same premium pipeline as the hero, lighter
// post (no SSAO, no chromatic) since several can be on screen. Canvas mounts
// only once the card scrolls into view (saves a WebGL context + render loop).
//
// If the project provides `model` (a /models/*.glb path) it renders that glTF
// instead of the procedural planet — e.g. a rocket or vehicle asset.
export default function ProjectVisual({ accent = 'teal', model = null }) {
  const wrap = useRef(null)
  const inView = useInView(wrap, { once: true, margin: '0px 0px -20% 0px' })
  const hex = ACCENT_HEX[accent] ?? ACCENT_HEX.teal

  return (
    <div
      ref={wrap}
      className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-space-800"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      {inView && (
        <Canvas
          flat
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight
            castShadow
            position={[4, 5, 3]}
            intensity={2}
            color="#cfe8ff"
            shadow-mapSize={[512, 512]}
          />
          <Suspense fallback={null}>
            <StudioEnv accent={hex} />
            {model ? (
              <GLTFModel url={model} scale={1.4} />
            ) : (
              <MetalPlanet radius={1.5} detail={20} pointSize={0.02} accent={accent} speed={0.12} />
            )}
            <Effects quality="low" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableDamping rotateSpeed={0.5} />
        </Canvas>
      )}
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest2 text-white/40">
        Drag to orbit
      </span>
    </div>
  )
}
