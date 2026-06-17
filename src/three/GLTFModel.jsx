import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// GLTFModel — drop-in loader for a Blender-exported .glb (rocket, terrain tile,
// vehicle, etc). Draco decompression on (CDN decoder), shadows enabled.
// Use when a project sets `model: '/models/foo.glb'` in src/data/projects.js.
//
// EXPORT FROM BLENDER (high fidelity + small file):
//   • Format: glTF Binary (.glb)
//   • Apply transforms; set materials to Principled BSDF (maps to PBR cleanly)
//   • Compression: Draco (Geometry). For textures, convert to KTX2/Basis later.
//   • Bake lighting/AO into textures for the cheapest "AAA" look (no runtime cost)
//   • Keep tri-count sane (<150k for hero) and texture sizes <= 2K
// ─────────────────────────────────────────────────────────────────────────────
export default function GLTFModel({ url, scale = 1, position = [0, 0, 0] }) {
  // Second arg `true` → enable Draco (drei loads the decoder from CDN).
  const { scene } = useGLTF(url, true)

  // Enable shadow casting/receiving + bump env reflections on every mesh.
  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
        if (o.material && 'envMapIntensity' in o.material) {
          o.material.envMapIntensity = 1.3
        }
      }
    })
  }, [scene])

  return <primitive object={scene} scale={scale} position={position} dispose={null} />
}

// Call once at module load if you want the hero model preloaded before scroll:
//   GLTFModel.preload = (url) => useGLTF.preload(url, true)
GLTFModel.preload = (url) => useGLTF.preload(url, true)
