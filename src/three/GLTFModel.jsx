import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

// Loader for a Blender-exported .glb (Draco on, shadows + env reflections set).
// Used when a project sets `model: '/models/foo.glb'`.
// Blender export: glTF Binary, Principled BSDF, Draco geometry, bake AO/lighting,
// tris < ~150k, textures <= 2K (KTX2/Basis for production).
export default function GLTFModel({ url, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(url, true)

  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      if (o.material && 'envMapIntensity' in o.material) o.material.envMapIntensity = 1.3
    })
  }, [scene])

  return <primitive object={scene} scale={scale} position={position} dispose={null} />
}

GLTFModel.preload = (url) => useGLTF.preload(url, true)
