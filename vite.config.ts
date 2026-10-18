import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/Figma-GP/',
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: false,
    open: false,
  },
  assetsInclude: ['**/*.csv'],
})
