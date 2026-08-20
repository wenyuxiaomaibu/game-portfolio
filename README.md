# 游戏作品集（个人网站）

基于 [Astro](https://astro.build) 的静态作品集网站，用于展示 **游戏 Demo**、**游戏拆解**、**策划案例**。中文、简洁专业风格，构建产物为纯静态 HTML，可免费部署到 GitHub Pages / Vercel。

> 线上地址：**https://game-portfolio.1281524643.workers.dev/**

## 部署（Cloudflare Pages，免费）

1. 初始化 git 仓库并推送到 GitHub：

   ```powershell
   git init
   git add .
   git commit -m "初始化作品集网站"
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git branch -M main
   git push -u origin main
   ```

2. 在 [Cloudflare](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** 中选择该仓库。
3. 构建配置：
   - Framework preset：**Astro**
   - Build command：`npm run build`
   - Build output directory：`dist`
   - 环境变量：`NODE_VERSION` = `20`
4. 保存并部署，完成后访问 `https://<项目名>.pages.dev`。之后每次 `git push` 都会自动重新构建。

## 目录结构

```
game-portfolio/
├── public/
│   ├── images/            # 图片（封面、截图）放在这里，按需建子目录
│   └── files/cases/       # 策划案例的 PDF 放在这里
├── src/
│   ├── content.config.ts  # 内容模型定义（demos / teardowns / cases）
│   ├── content/
│   │   ├── demos/         # 每个 Demo 一个 .md 文件
│   │   ├── teardowns/     # 每篇拆解一个 .md 文件
│   │   └── cases/         # 每个策划案例一个 .md 文件（只存元信息）
│   ├── layouts/           # 全局布局
│   ├── components/        # 头部、尾部、卡片组件
│   ├── pages/             # 页面（首页 + 三大板块列表/详情）
│   └── styles/            # 全局样式
├── astro.config.mjs       # 站点配置（site / base 在这里改）
└── package.json
```

## 本地运行

```bash
npm install      # 首次安装依赖
npm run dev      # 开发预览，默认 http://localhost:4321
npm run build    # 生成静态站点到 dist/
npm run preview  # 本地预览构建产物
```

## 如何填写内容

内容全部用 Markdown + 头部字段（frontmatter）管理，**不需要改代码**，直接编辑对应 `.md` 文件即可。

### 1. 游戏 Demo（`src/content/demos/`）

每个 Demo 一个文件，字段如下（以 `demo-1.md` 为完整示例）：

| 字段 | 说明 |
| --- | --- |
| `title` | Demo 名称 |
| `tagline` | 一句话介绍 |
| `cover` | 封面图路径，以 `/` 开头，对应 `public/`（如 `/images/demos/demo-1/cover.png`） |
| `videoUrl` | 演示视频的普通链接（按钮跳转） |
| `videoEmbed` | 可嵌入的 iframe 地址（可选）。B站：`//player.bilibili.com/player.html?bvid=BVxxxx&page=1`；itch.io 填游戏页地址 |
| `playUrl` | 在线试玩链接 |
| `downloadUrl` | 下载链接（可选） |
| `tech` | 技术栈标签列表 |
| `role` | 你的分工说明 |
| `order` | 排序，数字越小越靠前 |
| `screenshots` | 截图列表，路径同 `cover` |

正文（frontmatter 之后的部分）就是 Demo 的详细介绍，支持 Markdown 排版。

### 2. 游戏拆解（`src/content/teardowns/`）

字段：`title`（标题）、`game`（拆解对象）、`date`、`tags`、`order`。正文就是拆解文章。

### 3. 策划案例（`src/content/cases/`）

字段：`title`、`summary`（一句话简介）、`pdf`（PDF 路径，对应 `public/`）、`tags`、`order`。
把 PDF 文件放进 `public/files/cases/`，然后让 `pdf` 字段指向它即可。

> 所有示例文件里的 `TODO` 都需要替换成你的真实内容；图片和 PDF 请放入 `public/` 对应目录。

## 部署

### GitHub Pages

1. 在 `astro.config.mjs` 中设置 `site`；若是「项目页」（`https://用户名.github.io/仓库名/`），再设置 `base: '/仓库名/'`。
2. 把代码推到 GitHub 仓库。
3. 在仓库 **Settings → Pages** 中选择 **GitHub Actions** 作为来源，并用如下工作流（放到 `.github/workflows/deploy.yml`）：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

### Vercel

把项目导入 Vercel：Framework 选择 **Astro**，构建命令 `npm run build`，输出目录 `dist`。其余默认即可。

## 注意事项

- 视频走外链（B站 / itch.io 等），不要把大视频文件放进仓库。
- 截图建议压缩后再放进 `public/images/`，控制体积。
