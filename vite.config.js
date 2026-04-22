import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '')
  const appBasePath = mode === 'development' ? '/' : env.VITE_APP_BASE_PATH || '/'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: ['localhost', '127.0.0.1', 'aggregable-uncleft-gaylord.ngrok-free.dev'],
    },
    base: appBasePath,
  }
})
