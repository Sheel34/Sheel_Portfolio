import { Environment, Lightformer } from '@react-three/drei'

// Image-based lighting built from Lightformers (no HDRI file to fetch). Metal
// surfaces reflect these panels for the studio sheen. Baked once (frames={1}).
export default function StudioEnv({ accent = '#38bdf8' }) {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.2} position={[0, 2.5, 4]} scale={[7, 7, 1]} color="#eaf2ff" />
      <Lightformer form="rect" intensity={1.6} position={[-5, 1, 2]} scale={[3, 7, 1]} color={accent} />
      <Lightformer form="rect" intensity={1.1} position={[5, -1, 2]} scale={[3, 5, 1]} color="#7aa2ff" />
      <Lightformer form="ring" intensity={0.8} position={[0, 0, -5]} scale={[6, 6, 1]} color="#0a3050" />
    </Environment>
  )
}
