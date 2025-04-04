import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      ['/admin-api']: {
        target: 'http://localhost:48081',
        ws: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()], // 自动导入 element-plus 组件
      dts: true, // 是否生成组件类型声明文件
      imports: ['vue', 'vue-router'], // 自动导入 vue 和 vue-router 相关函数
      eslintrc: {
        enabled: true, // 是否启用 eslint 配置
      },
      dirs: ['src/store', 'src/hooks'],
    }),
    Components({
      resolvers: [ElementPlusResolver()], // 自动导入 element-plus 组件
      dts: true, // 是否生成组件类型声明文件
      dirs: ['src/components'], // 需要自动导入的组件目录
      extensions: ['vue', 'ts', 'tsx'], // 需要自动导入的文件扩展名
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
