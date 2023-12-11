import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
export default defineConfig({
  server: { open: true },
  base: process.env.NODE_ENV === 'production' ? '/dist' : '',
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  plugins: [react(), svgr()]
})
