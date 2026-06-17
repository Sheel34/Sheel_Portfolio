import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A bright ring that sweeps up and down the globe — the "active scan" /
// reconstruction-in-progress cue. Additive blending so it glows over the points.
export default function ScanRing({ radius = 1.95, accent = '#5eead4', span = 2.4 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    // Sweep on Y; shrink the ring radius near the poles so it hugs the sphere.
    const t = state.clock.elapsedTime * 0.5
    const y = Math.sin(t) * (span / 2)
    ref.current.position.y = y
    const k = Math.max(0.05, Math.cos((y / (span / 2)) * (Math.PI / 2)))
    ref.current.scale.set(k, k, k)
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 128]} />
      <meshBasicMaterial
        color={accent}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
