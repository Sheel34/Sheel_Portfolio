import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  SMAA,
  ToneMapping,
  BrightnessContrast,
  HueSaturation,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'

// Post-processing stack. Order: AO -> bloom -> grade -> tone-map -> AA.
// 'high' adds SSAO + chromatic aberration + MSAA; 'low' is bloom + grade + AA.
// Requires the Canvas `flat` prop so the ToneMapping effect owns tone mapping.
export default function Effects({ quality = 'high' }) {
  const high = quality === 'high'

  return (
    <EffectComposer multisampling={high ? 4 : 0} enableNormalPass={high}>
      {high && <SSAO intensity={20} radius={0.1} luminanceInfluence={0.5} bias={0.02} color="black" />}

      <Bloom mipmapBlur intensity={high ? 0.85 : 0.5} luminanceThreshold={0.55} luminanceSmoothing={0.25} radius={0.7} />

      {high && (
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0004, 0.0004]} radialModulation={false} />
      )}

      <HueSaturation saturation={0.06} />
      <BrightnessContrast brightness={-0.02} contrast={0.1} />
      <Vignette offset={0.28} darkness={0.85} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <SMAA />
    </EffectComposer>
  )
}
