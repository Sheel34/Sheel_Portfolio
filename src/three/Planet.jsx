import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Atmosphere from './Atmosphere'

// Cinematic planet: dark glacial-blue body, slow spin, atmosphere rim, and warm
// "city light" points that bloom on the surface.
export default function Planet({ radius = 2.2, position = [0, 0, 0] }) {
  const group = useRef()

  const cityPositions = useMemo(() => {
    const n = 900
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * 1.002
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [radius])

  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.02
  })

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          color="#0a1a2e"
          metalness={0.2}
          roughness={0.85}
          emissive="#0a2c4a"
          emissiveIntensity={0.25}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={cityPositions.length / 3}
            array={cityPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffd9a0"
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Atmosphere scale={radius * 1.14} color="#5aa9ff" power={3.0} intensity={1.6} />
    </group>
  )
}
