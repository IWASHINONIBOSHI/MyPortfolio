import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ↓↓↓ ここを追加してください！ ↓↓↓
  base: '/my-hp/', 
  // 例: リポジトリ名が 'my-portfolio' なら base: '/my-portfolio/',
  // 注意: 前後のスラッシュ / を忘れずに！
  
  server: {
    host: true, 
  }
})