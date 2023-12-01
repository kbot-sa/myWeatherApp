import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//find out if base is correct url
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/kbot-sa/myWeatherApp'
})
