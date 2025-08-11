import react from '@vitejs/plugin-react-swc';
import { resolve } from "path";
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       'target': 'http://localhost:12312',
  //       'xfwd': true
  //     }
  //   }
  // }
})
