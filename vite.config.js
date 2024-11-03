import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true, // Enable custom elements mode
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('reports-')
        }
      }
    }),
  ],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000, // You can change this port if needed
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'reports-vue3',
      fileName: (format) => `reports-vue3.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      // Externalize dependencies you don't want to bundle
      external: ['vue', 'vuetify'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
        },
      },
    },
  },
})
