import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Tilted orbital ring with instanced "structure" blocks around it. Emissive
// edges bloom into the glowing-city look. Slow counter-rotation.
export default function RingMegastructure({ ringRadius = 4.4, count = 260, tilt = 1.15, accent = '#7cc8ff' }) {
  const group = useRef()
  const inst = useRef()

  const matrices = useMemo(() => {
    const dummy = new THREE.Object3D()
    const out = []
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const r = ringRadius + (Math.random() - 0.5) * 0.25
      dummy.position.set(Math.cos(a) * r, 0, Math.sin(a) * r)
      dummy.lookAt(0, 0, 0)
      const s = 0.06 + Math.random() * 0.16
      dummy.scale.set(s, s * (0.5 + Math.random()), 0.1 + Math.random() * 0.4)
      dummy.updateMatrix()
      out.push(dummy.matrix.clone())
    }
    return out
  }, [count, ringRadius])

  useLayoutEffect(() => {
    if (!inst.current) return
    matrices.forEach((m, i) => inst.current.setMatrixAt(i, m))
    inst.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  useFrame((_, d) => {
    if (group.current) group.current.rotation.y -= d * 0.012
  })

  return (
    <group ref={group} rotation={[tilt, 0, 0.15]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringRadius, 0.05, 16, 220]} />
        <meshStandardMaterial color="#1a2436" metalness={0.9} roughness={0.4} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringRadius - 0.02, 0.012, 8, 220]} />
        <meshBasicMaterial color={accent} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      <instancedMesh ref={inst} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2a3346" metalness={0.85} roughness={0.45} emissive={accent} emissiveIntensity={0.15} />
      </instancedMesh>
    </group>
  )
}
