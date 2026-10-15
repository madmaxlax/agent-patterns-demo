import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // relative, so it works on GitHub Pages under /<repo>/
  plugins: [react()],
})
