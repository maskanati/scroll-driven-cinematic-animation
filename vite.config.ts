import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import svgr from '@svgr/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({typescript: true, eslint: {lintCommand: 'eslint "./src/**/*.{ts,tsx}"'}}),
  ],
})
