import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
const prefix = `monaco-editor/esm/vs`
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(
    {refTransform: true}
  )],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: [
      `${prefix}/language/json/json.worker`,
      `${prefix}/language/css/css.worker`,
      `${prefix}/language/html/html.worker`,
      `${prefix}/language/typescript/ts.worker`,
      `${prefix}/editor/editor.worker`
    ]
  }
})
