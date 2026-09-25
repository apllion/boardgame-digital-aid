import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/boardgame-digital-aid/star-realms/',
  plugins: [react()],
})
