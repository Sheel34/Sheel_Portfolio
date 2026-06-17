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

// ─────────────────────────────────────────────────────────────────────────────
// Effects — post-processing stack. This is what turns "lit 3D" into "AAA frame".
// Order matters: AO → bloom → grade → tone-map → AA.
//   quality 'high' : SSAO + chromatic aberration + 4x MSAA normal pass (hero, desktop)
//   quality 'low'  : bloom + grade + AA only (mobile, project cards, weak GPUs)
//
// NOTE: Canvas must use `flat` so R3F's default tone mapping is OFF — the
// ToneMapping effect below owns it (ACES Filmic), else colors double-map.
// ─────────────────────────────────────────────────────────────────────────────
export default function Effects({ quality = 'high' }) {
  const high = quality === 'high'

  return (
    <EffectComposer multisampling={high ? 4 : 0} enableNormalPass={high}>
      {/* Ambient occlusion — contact darkening in crevices = depth/realism. */}
      {high && (
        <SSAO
          intensity={20}
          radius={0.1}
          luminanceInfluence={0.5}
          bias={0.02}
          color="black"
        />
      )}

      {/* Bloom — makes emissive points + atmosphere glow. mipmapBlur = soft AAA bloom. */}
      <Bloom
        mipmapBlur
        intensity={high ? 0.85 : 0.5}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.25}
        radius={0.7}
      />

      {/* Subtle lens chromatic aberration — filmic edge fringing. */}
      {high && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0004, 0.0004]}
          radialModulation={false}
        />
      )}

      {/* Color grade — gentle cool, lifted contrast. */}
      <HueSaturation saturation={0.06} />
      <BrightnessContrast brightness={-0.02} contrast={0.1} />

      {/* Vignette focuses the eye on the body. */}
      <Vignette offset={0.28} darkness={0.85} />

      {/* Tone mapping (ACES Filmic) then SMAA last for clean edges. */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <SMAA />
    </EffectComposer>
  )
}
