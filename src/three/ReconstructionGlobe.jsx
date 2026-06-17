import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// ReconstructionGlobe
// A displaced icosphere rendered as: (1) a faceted dark surface = the
// reconstructed terrain, and (2) a brighter point cloud on top = the sample
// points the surface was reconstructed from. Reads as "3D reconstruction".
//
// 100% procedural — no glTF/textures. Swap in a Blender .glb later by replacing
// this component with a <primitive object={gltf.scene} /> (see README).
// ─────────────────────────────────────────────────────────────────────────────

// Cheap deterministic "terrain" field: layered trig (fbm-ish). No deps, fast,
// good enough to read as continents/ridges at this scale.
function terrain(x, y, z) {
  let n = Math.sin(x * 2.1 + y * 1.3) * Math.cos(z * 1.7)
  n += 0.5 * Math.sin(x * 4.3 - z * 3.1) * Math.cos(y * 3.7)
  n += 0.25 * Math.sin(y * 8.1 + x * 6.7)
  return n
}

const ACCENTS = {
  teal: new THREE.Color('#5eead4'),
  blue: new THREE.Color('#38bdf8'),
  amber: new THREE.Color('#f5a524'),
}

export default function ReconstructionGlobe({
  radius = 1.6,
  detail = 32, // icosphere subdivisions — higher = more points (heavier)
  displacement = 0.14, // how far vertices push along their normal
  pointSize = 0.018,
  accent = 'teal',
  speed = 0.06, // auto-rotation speed (rad/s)
}) {
  const group = useRef()
  const color = ACCENTS[accent] ?? ACCENTS.teal

  // Build the displaced geometry once. Shared by the surface mesh and the points.
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

  // Slow auto-rotation — the "instrument idling" motion. OrbitControls still
  // lets the user grab and spin it; this just keeps it alive when untouched.
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed
  })

  return (
    <group ref={group}>
      {/* Reconstructed surface — dark, faceted, faintly lit. */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#0a2730"
          emissive={color}
          emissiveIntensity={0.12}
          flatShading
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Sample point cloud — the bright reconstruction points. */}
      <points geometry={geometry}>
        <pointsMaterial
          color={color}
          size={pointSize}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* Faint structural wireframe for the "mesh" read. */}
      <lineSegments>
        <wireframeGeometry args={[geometry]} />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}
