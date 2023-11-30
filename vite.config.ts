import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dist' : '',
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  plugins: [react()]
})
