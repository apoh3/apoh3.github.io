import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/apoh3.github.io/', //base: '/apoh3.github.io/',
})
