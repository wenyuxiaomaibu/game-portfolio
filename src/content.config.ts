import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 游戏 Demo
const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    cover: z.string().optional(),          // 封面图，路径以 / 开头（对应 public 目录）
    videoUrl: z.string().optional(),       // 演示视频/试玩页面的普通链接
    videoEmbed: z.string().optional(),     // 可嵌入的 iframe 地址（B站播放器 / itch.io 等）
    playUrl: z.string().optional(),        // 在线试玩链接
    downloadUrl: z.string().optional(),    // 下载链接
    tech: z.array(z.string()).default([]), // 技术栈 / 工具
    role: z.string().optional(),           // 我的分工
    order: z.number().default(0),          // 排序，数字越小越靠前
    screenshots: z.array(z.string()).default([]),
  }),
});

// 游戏拆解
const teardowns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teardowns' }),
  schema: z.object({
    title: z.string(),
    game: z.string(),                      // 拆解的游戏名
    cover: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

// 策划案例
const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),                   // 一句话简介
    pdf: z.string(),                       // PDF 相对 public 的路径，如 /files/cases/xxx.pdf
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { demos, teardowns, cases };
