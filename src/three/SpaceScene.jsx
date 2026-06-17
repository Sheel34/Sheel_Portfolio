import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Planet from './Planet'
import RingMegastructure from './RingMegastructure'
import Starfield from './Starfield'
import { scroll } from '../state/scroll'

// Gentle scroll-driven camera parallax around the planet.
function CameraRig() {
  const target = useRef(new THREE.Vector3())
  useFrame((state) => {
    const p = scroll.progress
    const { position } = state.camera
    position.x += (-1.2 + p * 2.6 - position.x) * 0.04
    position.y += (0.4 + p * 1.4 - position.y) * 0.04
    position.z += (9 - p * 1.5 - position.z) * 0.04
    target.current.set(0, 0, 0)
    state.camera.lookAt(target.current)
  })
  return null
}

export default function SpaceScene() {
  return (
    <>
      <CameraRig />

      {/* Bright source for a bloomed flare. */}
      <mesh position={[7, 3, -6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#fff4e0" />
      </mesh>

      {/* Planet sits left of center; text and the arm frame to the right. */}
      <group position={[-1.6, 0, 0]}>
        <Planet radius={2.3} />
        <RingMegastructure ringRadius={4.6} count={280} tilt={1.1} accent="#7cc8ff" />
      </group>

      <Starfield />
    </>
  )
}
