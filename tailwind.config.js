/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic deep-space palette — true black, glacial blue, VENOM red.
        space: {
          900: '#02030a', // near-black void
          800: '#05070f',
          700: '#0a0e1a',
          600: '#121826',
        },
        signal: {
          DEFAULT: '#7cc8ff', // glacial blue glow
          blue: '#38bdf8',
          ice: '#bfe6ff',
          amber: '#f5a524',
        },
        venom: {
          DEFAULT: '#ff2e43', // VENOM red (from the title art)
          glow: '#ff5566',
        },
      },
      fontFamily: {
        // Poster = grunge condensed (VENOM title); condensed = subheads;
        // display = body sans; mono = telemetry labels.
        poster: ['Anton', 'Impact', 'sans-serif'],
        condensed: ['Oswald', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
    },
  },
  plugins: [],
}
