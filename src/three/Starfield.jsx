import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// White points on a large shell with slow drift for parallax depth.
export default function Starfield({ count = 2200, radius = 40 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + Math.random() * 0.5)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [count, radius])

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#cfe2ff" size={0.05} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}
