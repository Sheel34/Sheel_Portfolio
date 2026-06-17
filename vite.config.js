import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — React plugin + sensible defaults for Vercel.
// No special config needed; Vercel auto-detects Vite ("vite build" -> dist/).
export default defineConfig({
  plugins: [react()],
})
