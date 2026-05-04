# personal.space

受 [Apple 官网](https://www.apple.com) 启发的个人站点：大留白、系统字体栈、中性灰分区、克制蓝色链接与圆角卡片；图标使用 [Lucide](https://lucide.dev/) 线框风格。**不**使用 Apple 商标图形。正文与区块标题集中在 `src/data/site.ts`（含 `sectionCopy`）。全局为 **暖石纸面 + 炭灰字 + 青铜强调**。动效：**Framer Motion** + **原生 JS 极简自定义指针**（`public/custom-cursor.js`：实心点 + Lerp 跟随空心环、`mix-blend-mode: difference` 悬停态）+ **CSS** 主标题渐变、首屏网格与扫描线、轻噪点；触控与「减少动态效果」下自动关闭自定义指针。

## 页面滚动顺序

首屏 Hero（**Hello** 式多语言问候，节奏偏 Apple：长停留、慢进慢出、弱模糊）→ **教育** → **项目** → **履历** → **生活** → **博客**（与 `navItems` 一致）。

## 技术栈

- [Next.js 16](https://nextjs.org/)（App Router）
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)（`@import "tailwindcss"` + `@theme inline`）
- [framer-motion](https://www.framer.com/motion/)（入场、交错、hover、首屏背景漂移；`MotionProvider` 开启 `reducedMotion: user`）
- [lucide-react](https://lucide.dev/guide/packages/lucide-react)（线框图标；社交区用 `FolderGit2`、`UsersRound` 等代替已移除的品牌图标）
- `next.config.ts` 中 `experimental.optimizePackageImports`：`lucide-react`、`framer-motion` 按需摇树，减小首包

## 体积与性能

- 已移除 `tsparticles` 系列；指针为 **纯 DOM + CSS + `public/custom-cursor.js`**，无 Canvas、无额外 React 指针组件。
- 指针：`requestAnimationFrame` + Lerp；仅在需要跟随时跑帧；`(pointer: coarse)` 与 `prefers-reduced-motion` 下脚本不注入、`cursor` 保持系统默认。
- 主标题持续动效在 CSS 中完成，避免为装饰再引入脚本库。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 <http://localhost:3000>。

```bash
npm run build
npm run start
npm run lint
```

## 项目结构

| 路径 | 说明 |
| --- | --- |
| `src/data/site.ts` | **所有展示内容** + 文件头「修改指南」；`sectionCopy` 管各区块眉题/大标题/说明与技能列名 |
| `src/app/layout.tsx` | 根布局、`MotionProvider`、`#custom-cursor-portal`、`next/script` 加载 `/custom-cursor.js`、`metadata` |
| `src/app/page.tsx` | 首页区块组合顺序；`main` 提高 `z-index` 以免被颗粒层盖住 |
| `src/app/globals.css` | 色板、首屏叠层、主标题、噪点、`card-shine`、**`.cc-*` 指针样式**、减少动效降级 |
| `next.config.ts` | `optimizePackageImports` |
| `public/custom-cursor.js` | 自定义指针逻辑（IIFE、原生 API） |
| `src/components/hello-cycle.tsx` | Hello 多语言轮播（暖色渐变字 + Apple 式缓动） |
| `src/components/blog-section.tsx` | 博客卡片、RSS、Web Share / 剪贴板分享 |
| `src/components/motion-provider.tsx` | Framer Motion 全局 `reducedMotion` |
| `src/components/site-nav.tsx` | 顶栏 + 滚动时当前区块高亮 |
| `src/components/hero.tsx` | Hello 轮播、加大主标题、科技图标条、背景叠层、社交 pill |
| `src/components/section-heading.tsx` | 区块标题入场（stagger） |
| `src/components/projects-section.tsx` | 项目卡片 |
| `src/components/resume-section.tsx` | 履历时间线 + 技能三列（带图标） |
| `src/components/timeline-section.tsx` | 教育时间线 |
| `src/components/education-section.tsx` | 教育区块 |
| `src/components/life-section.tsx` | 生活与爱好 |
| `src/components/site-footer.tsx` | 深色底栏（类似 Apple 页脚气质） |

## 自定义内容（改哪里）

| 想改的内容 | 文件与字段 |
| --- | --- |
| 浏览器标签标题、SEO 描述、作者名 | `site.ts` → `siteMeta` |
| 首屏 Hello 轮播文案 | `site.ts` → `hero.greetings`（字符串数组） |
| 首屏大标题、副标题、下面一行小字 | `site.ts` → `hero.headline` / `subline` / `statusLine` |
| 各区块中文眉题、大标题、灰色说明、项目外链、生活区小标题、技能列名、**博客区按钮与空状态提示** | `site.ts` → `sectionCopy`（含 `blog`）；技能列在 `resumeSkills.columns` |
| 博客文章列表、RSS 地址 | `site.ts` → `blogPosts`、`blogMeta.feedUrl`（留空则隐藏 RSS 按钮） |
| 顶栏文案与滚动锚点顺序 | `site.ts` → `navItems`（`id` 须与页面 `section` 的 `id` 一致） |
| 项目列表 | `site.ts` → `projects` |
| 工作经历 | `site.ts` → `experience` |
| 教育经历 | `site.ts` → `education` |
| 技能条目 | `site.ts` → `skills` |
| 爱好卡片、右侧随笔 | `site.ts` → `hobbies`、`lifeNotes` |
| 社交按钮与链接 | `site.ts` → `social`；按钮上的「GitHub / 邮件」等英文标签暂在 `hero.tsx` 的 `socialConfig` |
| 页脚版权句式 | `site-footer.tsx` 内文案 |

## 视觉调参

- 全局变量：`globals.css` 内 `:root`（`--bg` / `--accent` / `--link` 等暖色体系）。
- 社交图标映射在 `hero.tsx` 的 `socialConfig`；首屏装饰图标条在 `hero.tsx` 的 `techStrip`（可改图标与中文标签）。
- 指针：`public/custom-cursor.js` 内 `LERP`（跟随松紧）；`globals.css` 内 `.cc-ring` 尺寸与悬停 `scale`；可点击选择器字符串同文件内 `closest(...)`。自定义可点区域可加 `data-cursor-hover`。

## 部署到 Vercel

导入仓库后使用默认 Next.js 构建即可；域名在 Vercel **Settings → Domains** 配置。

## 内容清单速查

| 页面区域 | 数据来源 |
| --- | --- |
| 站点标题与描述 | `siteMeta` |
| 首屏 | `hero`（含 `greetings`）+ `social` |
| 博客 | `blogPosts` + `blogMeta` + `sectionCopy.blog` |
| 项目 | `projects` |
| 工作与技能 | `experience` + `skills` |
| 教育 | `education` |
| 生活与爱好 | `hobbies` + `lifeNotes` |
| 导航 | `navItems` |

## 许可证

私有个人项目；如需开源可自行添加 `LICENSE`。
