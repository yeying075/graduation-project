import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 7590,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7591/',
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
        // {
        //   from: 'axios',
        //   imports: [
        //     ['default', 'axios'],
        //     {
        //       name: 'AxiosStatic',
        //       type: true
        //     }
        //   ]
        // }
      ],
      // dirs: ['./src/apis/**', './src/router/', './src/stores/', './src/utils/'],
      // eslintrc: {
      //   enabled: true,
      // }
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `
      }
    }
  }
})
