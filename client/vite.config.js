import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  visualizer({
    emitFile: false,
    file: "status.html",
    open: true
  }),
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: true, //剔除console,和debugger
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    //rollup分包
    rollupOptions: {
      external: ['naive-ui'],
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
//--2.19Mb，5.69s
//--2.18Mb,5.92s rollup分包
//--1.89Mb,5.85s cdn引入vue,axios,loadsh,vue-router
//插件自动引入的打包自动在rollup剔除
//907kb,2.64ms cdn引入naive-ui wangeditorforvue无法直接引用，只能将包保存到本地或者用原生的html引入

//--1.11Mb,5.85s cdn引入wangditor
//--100.55kb,971ms cdn引入naive-ui

