import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the built assets resolve correctly no matter what
  // the repository is named or what sub-path GitHub Pages serves it from.
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
