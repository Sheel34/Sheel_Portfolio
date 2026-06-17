import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import SpaceScene from '../three/SpaceScene'
import VenomArm from '../three/VenomArm'
import StudioEnv from '../three/StudioEnv'
import Effects from '../three/Effects'

// Single fixed full-page canvas behind the story layer (one WebGL context).
// PerformanceMonitor downgrades quality + dpr if the frame rate drops.
export default function BackgroundCanvas() {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, [])
  const [quality, setQuality] = useState(isMobile ? 'low' : 'high')
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5)

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        flat
        dpr={dpr}
        camera={{ position: [-1.2, 0.4, 9], fov: 50 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setQuality('low')
            setDpr(1)
          }}
        />
        <AdaptiveDpr pixelated />

        <color attach="background" args={['#02030a']} />
        <fog attach="fog" args={['#02030a', 12, 34]} />

        <ambientLight intensity={0.18} />
        <directionalLight position={[7, 3, -6]} intensity={2.6} color="#fff0d8" />
        <directionalLight position={[-5, -2, 4]} intensity={0.5} color="#3b6cff" />

        <Suspense fallback={null}>
          <StudioEnv accent="#7cc8ff" />
          <SpaceScene />
          <VenomArm />
          <Effects quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  )
}
