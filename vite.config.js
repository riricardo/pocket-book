import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        softwareEngineeringIndex: fileURLToPath(
          new URL('./software-engineering/index.html', import.meta.url),
        ),
        softwareEngineering: fileURLToPath(
          new URL('./software-engineering/volume-01/index.html', import.meta.url),
        ),
        japaneseIndex: fileURLToPath(new URL('./japanese/index.html', import.meta.url)),
        japanese: fileURLToPath(new URL('./japanese/volume-01/index.html', import.meta.url)),
      },
    },
  },
})
