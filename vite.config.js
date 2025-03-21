// import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  server: {
    proxy: {
      // 프록시할 경로
      "/api": {
        // 대상 서버
        target: "http://localhost:8080/",
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/api/,""),
      },
      "/imgapi": {
        // 대상 서버
        target: "http://localhost:80/",
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/imgapi/,""),
      },
      "/payapi": {
        // 대상 서버
        target: "https://open-api.kakaopay.com/",
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/payapi/,""),
      },
      "/ws": {  // WebSocket 프록시 추가
        target: "http://localhost:8080/",
        changeOrigin: true,
        ws: true, // WebSocket 지원 활성화
      },
    },
  },
})
