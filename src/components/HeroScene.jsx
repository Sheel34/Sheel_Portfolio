import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import MetalPlanet from '../three/MetalPlanet'
import PointField from '../three/PointField'
import ScanRing from '../three/ScanRing'
import StudioEnv from '../three/StudioEnv'
import Effects from '../three/Effects'

// Hero 3D scene — premium pipeline: IBL studio lighting + PBR metal + custom
// atmosphere shader + ACES tone-mapped post stack (SSAO/Bloom/grade).
//
// Performance strategy (mid-range friendly):
//  - `flat` Canvas: ToneMapping effect owns tone mapping (no double-map).
//  - PerformanceMonitor downgrades quality + dpr if FPS drops.
//  - Geometry detail / point count scale down on small screens.
//  - AdaptiveDpr drops resolution under sustained GPU load.
export default function HeroScene() {
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  )

  // Quality + dpr are stateful so PerformanceMonitor can dial them down live.
  const [quality, setQuality] = useState(isMobile ? 'low' : 'high')
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5)

  const detail = isMobile ? 20 : 48
  const fieldCount = isMobile ? 500 : 1400

  return (
    <Canvas
      flat
      shadows
      dpr={dpr}
      camera={{ position: [0, 0.4, 5], fov: 45 }}
      gl={{
        antialias: false, // SMAA handles AA in post
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
    >
      {/* Drop to low quality + dpr 1 if the GPU can't keep up. */}
      <PerformanceMonitor
        onDecline={() => {
          setQuality('low')
          setDpr(1)
        }}
      />
      <AdaptiveDpr pixelated />

      <color attach="background" args={['#04060a']} />
      <fog attach="fog" args={['#04060a', 7, 16]} />

      {/* A hard key light for crisp PBR speculars + soft shadow. IBL does the rest. */}
      <ambientLight intensity={0.12} />
      <directionalLight
        castShadow
        position={[5, 6, 4]}
        intensity={2.4}
        color="#cfe8ff"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />

      <Suspense fallback={null}>
        <StudioEnv accent="#38bdf8" />
        <PointField count={fieldCount} />
        <MetalPlanet detail={detail} accent="teal" />
        <ScanRing />
        <Effects quality={quality} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  )
}
