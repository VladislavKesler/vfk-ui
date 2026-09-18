import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// Separate config for the distributable library build (`npm run build:lib`).
// Kept apart from vite.config.ts, which builds the demo/Storybook app.
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './config/tsconfig.lib.json',
      include: ['src/index.ts', 'src/components/elements/**/*', 'src/components/fragments/**/*'],
      compilerOptions: { types: ['vite/client'] },
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'VfkUi',
      formats: ['es'],
      fileName: () => 'vfk-ui.js',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
