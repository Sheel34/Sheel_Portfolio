/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Aerospace / instrument palette — deep space + cyan telemetry + amber warning.
        space: {
          900: '#04060a', // near-black background
          800: '#080c14',
          700: '#0d131f',
          600: '#141c2b',
        },
        signal: {
          DEFAULT: '#5eead4', // teal telemetry accent
          blue: '#38bdf8',
          amber: '#f5a524', // instrument warning, use sparingly
        },
      },
      fontFamily: {
        // Display = geometric sans; mono = tool/telemetry labels.
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
