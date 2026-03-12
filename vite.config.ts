import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'

export default defineConfig({
  plugins: [uni()],
  root: process.cwd(),
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'unpackage/dist/build/h5',
    assetsDir: 'static',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {}
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
})
