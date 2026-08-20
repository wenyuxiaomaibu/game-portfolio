// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 部署到 GitHub Pages / Vercel 前请把这里改成你的真实站点地址。
  // 若部署为「项目页」(https://用户名.github.io/仓库名/)，还需设置 base: '/仓库名/'。
  site: 'https://example.com',
  base: '/',
});
