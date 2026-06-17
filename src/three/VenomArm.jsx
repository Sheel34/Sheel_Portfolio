import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { venomVisibility } from '../state/scroll'

// Procedural articulated robot arm (white links, dark joints, 2-finger gripper)
// matching the VENOM rig. Turntable rotation; opacity + scale follow how
// centered the VENOM section is, so it fades in/out with scroll.
// Swap for a real model: replace the JSX with <GLTFModel url="/models/venom-arm.glb" />
// and keep the visibility logic on its group.

function useArmMaterials() {
  const white = useRef(new THREE.MeshStandardMaterial({ color: '#e9eef5', metalness: 0.3, roughness: 0.45, transparent: true }))
  const dark = useRef(new THREE.MeshStandardMaterial({ color: '#141821', metalness: 0.6, roughness: 0.5, transparent: true }))
  const steel = useRef(new THREE.MeshStandardMaterial({ color: '#9aa6b4', metalness: 0.95, roughness: 0.3, transparent: true }))
  const glow = useRef(new THREE.MeshStandardMaterial({ color: '#7cc8ff', emissive: '#7cc8ff', emissiveIntensity: 1.4, transparent: true }))
  return { white: white.current, dark: dark.current, steel: steel.current, glow: glow.current }
}

export default function VenomArm({ position = [1.6, -1.1, -0.5], baseScale = 1.1 }) {
  const root = useRef()
  const shoulder = useRef()
  const elbow = useRef()
  const wrist = useRef()
  const mats = useArmMaterials()
  const allMats = [mats.white, mats.dark, mats.steel, mats.glow]

  useFrame((state, d) => {
    const vis = venomVisibility()
    allMats.forEach((m) => (m.opacity = vis))

    if (root.current) {
      root.current.visible = vis > 0.01
      root.current.scale.setScalar(baseScale * (0.7 + 0.3 * vis))
      root.current.rotation.y += d * 0.35
    }

    const t = state.clock.elapsedTime
    if (shoulder.current) shoulder.current.rotation.z = -0.5 + Math.sin(t * 0.6) * 0.12
    if (elbow.current) elbow.current.rotation.z = 0.9 + Math.sin(t * 0.5 + 1) * 0.18
    if (wrist.current) wrist.current.rotation.z = Math.sin(t * 0.8) * 0.2
  })

  return (
    <group ref={root} position={position} visible={false}>
      <mesh material={mats.dark}>
        <cylinderGeometry args={[0.42, 0.5, 0.3, 32]} />
      </mesh>
      <mesh material={mats.steel} position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 32]} />
      </mesh>

      <group ref={shoulder} position={[0, 0.26, 0]}>
        <mesh material={mats.dark}>
          <sphereGeometry args={[0.24, 24, 24]} />
        </mesh>
        <mesh material={mats.glow} position={[0, 0, 0.21]}>
          <boxGeometry args={[0.12, 0.04, 0.02]} />
        </mesh>
        <mesh material={mats.white} position={[0, 0.55, 0]}>
          <boxGeometry args={[0.26, 1.1, 0.3]} />
        </mesh>

        <group ref={elbow} position={[0, 1.05, 0]}>
          <mesh material={mats.dark}>
            <sphereGeometry args={[0.19, 24, 24]} />
          </mesh>
          <mesh material={mats.white} position={[0, 0.45, 0]}>
            <boxGeometry args={[0.2, 0.95, 0.24]} />
          </mesh>

          <group ref={wrist} position={[0, 0.92, 0]}>
            <mesh material={mats.steel}>
              <cylinderGeometry args={[0.13, 0.13, 0.18, 20]} />
            </mesh>
            <mesh material={mats.steel} position={[-0.1, 0.22, 0]} rotation={[0, 0, 0.18]}>
              <boxGeometry args={[0.05, 0.34, 0.12]} />
            </mesh>
            <mesh material={mats.steel} position={[0.1, 0.22, 0]} rotation={[0, 0, -0.18]}>
              <boxGeometry args={[0.05, 0.34, 0.12]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
