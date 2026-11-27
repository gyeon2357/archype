// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com', // 도메인 연결 후 교체
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  vite: {
    // Tina 어드민(public/admin)은 빌드 산출물이므로 그대로 복사만 한다
    build: { assetsInlineLimit: 0 },
  },
});
