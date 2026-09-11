import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/components/sections/Contact')) return 'contact'
          if (id.includes('react-router-dom')) return 'router'
          if (id.includes('lucide-react/dist/esm/icons')) return 'icons'
        },
      },
    },
  },
})
