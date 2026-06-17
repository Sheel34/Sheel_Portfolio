import { useMemo } from 'react'
import * as THREE from 'three'

// Fresnel rim-glow shell — fake atmospheric scattering. Additive so it blooms.
const vertexShader = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vPositionW = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPositionW);
    float fres = pow(1.0 - max(dot(-vNormalW, viewDir), 0.0), uPower);
    gl_FragColor = vec4(uColor * fres * uIntensity, fres);
  }
`

export default function Atmosphere({ scale = 1.18, color = '#38bdf8', power = 3.2, intensity = 1.5 }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uPower: { value: power },
      uIntensity: { value: intensity },
    }),
    [color, power, intensity]
  )

  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
