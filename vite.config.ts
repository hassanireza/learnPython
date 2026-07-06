import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repository name used for the GitHub Pages sub-path.
// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
// Override with VITE_BASE_PATH env var if the repo name differs.
const REPO_NAME = 'python-30-days-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
