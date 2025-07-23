import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need to import tailwindcss plugin manually — Tailwind works via PostCSS
export default defineConfig({
  plugins: [react()],
})
