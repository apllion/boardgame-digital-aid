import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      // Ensure shared code resolves deps from this app's node_modules
      'react-swipeable': path.resolve(__dirname, 'node_modules/react-swipeable'),
    },
  },
})
