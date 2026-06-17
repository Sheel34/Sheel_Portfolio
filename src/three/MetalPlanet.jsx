import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Atmosphere from './Atmosphere'

// ─────────────────────────────────────────────────────────────────────────────
// MetalPlanet — premium PBR reconstruction body.
//   • Displaced icosphere with a machined-metal PBR surface (high metalness,
//     reflects the studio IBL = the "Wukong" metallic sheen).
//   • Glowing additive point cloud on top = the reconstruction sample points
//     (these bloom in post → reads like a graphics/sim pipeline).
//   • Fresnel atmosphere shell for volumetric edge light.
// Pure procedural — swap for a Blender .glb via <GLTFModel> (see README).
// ─────────────────────────────────────────────────────────────────────────────

// Cheap deterministic terrain field (layered trig, fbm-ish). No deps.
function terrain(x, y, z) {
  let n = Math.sin(x * 2.1 + y * 1.3) * Math.cos(z * 1.7)
  n += 0.5 * Math.sin(x * 4.3 - z * 3.1) * Math.cos(y * 3.7)
  n += 0.25 * Math.sin(y * 8.1 + x * 6.7)
  return n
}

const ACCENT_HEX = {
  teal: '#5eead4',
  blue: '#38bdf8',
  amber: '#f5a524',
}

export default function MetalPlanet({
  radius = 1.6,
  detail = 48, // icosphere subdivisions (perf-sensitive — lower on mobile)
  displacement = 0.16,
  pointSize = 0.014,
  accent = 'teal',
  speed = 0.05,
  atmosphere = true,
}) {
  const group = useRef()
  const hex = ACCENT_HEX[accent] ?? ACCENT_HEX.teal
  const color = useMemo(() => new THREE.Color(hex), [hex])

  // Displaced geometry, shared by the metal surface + the point cloud.
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, detail)
    const pos = geo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const dir = v.clone().normalize()
      const h = terrain(dir.x * 1.8, dir.y * 1.8, dir.z * 1.8)
      v.addScaledVector(dir, h * displacement)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [radius, detail, displacement])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed
  })

  return (
    <group ref={group}>
      {/* Machined-metal reconstructed surface — reflects the IBL studio env. */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#10202a"
          metalness={0.92}
          roughness={0.34}
          envMapIntensity={1.45}
          emissive={color}
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Glowing reconstruction point cloud (additive → blooms in post). */}
      <points geometry={geometry}>
        <pointsMaterial
          color={color}
          size={pointSize}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {atmosphere && <Atmosphere scale={1.16} color={hex} />}
    </group>
  )
}
