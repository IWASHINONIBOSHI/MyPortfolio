import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: '/MyPortfolio/', //ここには、自分のリポジトリ名（srcファイルとなるものを書いておく！！！！）

  
  server: {
    host: true, 
  }
})
