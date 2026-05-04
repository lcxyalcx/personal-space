# personal.space

受 [Apple 官网](https://www.apple.com) 启发的个人站点：大留白、系统字体栈、中性灰分区、克制链接色与圆角卡片；图标使用 [Lucide](https://lucide.dev/) 线框风格。**不**使用 Apple 商标图形。多数展示文案集中在 `src/data/site.ts`（含 `sectionCopy`）。全局为 **暖石纸面 + 炭灰字 + 青铜强调**。动效：**Framer Motion** + **原生 JS 极简自定义指针**（`public/custom-cursor.js`：实心点 + Lerp 跟随空心环、`mix-blend-mode: difference` 悬停态）+ **CSS** 主标题渐变、首屏网格与扫描线、轻噪点；触控与「减少动态效果」下自动关闭自定义指针。

## 页面滚动顺序（以代码为准）

首页 `src/app/page.tsx` 当前顺序：**Hero**（Hello 多语言问候）→ **教育** → **履历** → **生活** → **博客**。与 `site.ts` 里 `navItems` 的锚点 `id` 保持一致即可。若要在首页增加「精选项目」等区块，在 `page.tsx` 中插入对应组件，并为 `section` 设置与 `navItems` 相同的 `id`。

站内博客文章路由：`/blog/[slug]`，正文与列表数据在 `src/data/blog-articles.ts`。

## 技术栈

- [Next.js 16](https://nextjs.org/)（App Router）
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)（`@import "tailwindcss"` + `@theme inline`）
- [framer-motion](https://www.framer.com/motion/)（入场、交错、hover、首屏背景漂移；`MotionProvider` 开启 `reducedMotion: user`）
- [lucide-react](https://lucide.dev/guide/packages/lucide-react)
- [Upstash Redis](https://upstash.com/)（可选）：全站 / 单篇点赞持久化，见 `.env.example`
- `next.config.ts` 中 `experimental.optimizePackageImports`：`lucide-react`、`framer-motion` 按需摇树

## 体积与性能

- 指针为 **纯 DOM + CSS + `public/custom-cursor.js`**，无 Canvas。
- 指针仅在 `(pointer: fine)` 且非 `prefers-reduced-motion: reduce` 时启用。

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

## 项目结构（速查）

| 路径 | 说明 |
| --- | --- |
| `src/data/site.ts` | 站点元信息、`hero`、`sectionCopy`、`navItems`、时间线、技能、社交、博客元数据等；**文件头有注释索引** |
| `src/data/blog-articles.ts` | **站内博客**：每篇 `slug`、标题、日期、标签、摘要、**正文分段**；并导出首页列表用 `blogPosts`（`href` 为 `/blog/...`） |
| `src/app/page.tsx` | 首页各区块 **组合顺序** |
| `src/app/blog/layout.tsx` | 博客子页：顶栏 + 页脚包装 |
| `src/app/blog/[slug]/page.tsx` | 单篇博客静态页 |
| `src/app/api/likes/route.ts` | 点赞 API（Edge；可选 Redis） |
| `src/app/layout.tsx` | 根布局、`MotionProvider`、自定义指针 portal 与脚本、`metadata` |
| `src/app/globals.css` | 色板、首屏、主标题、噪点、卡片光泽、**`.cc-*` 指针样式** |
| `public/custom-cursor.js` | 自定义指针逻辑 |
| `public/author-avatar.jpg` | 顶栏作者旁 **小头像**（替换即换图，文件名与 `site-nav.tsx` 中 `src` 一致即可） |
| `.env.example` | 可选：`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`（点赞累计） |
| `src/components/*.tsx` | 各区块 UI；`like-button.tsx` 点赞按钮；`blog-section.tsx` 博客列表与分享 |

---

## 自定义内容要改哪里（按主题）

下面按「你想改什么」→「改哪个文件 / 字段」列出；**优先改 `site.ts` 与 `blog-articles.ts`**，一般不必动组件逻辑。

### 站点与 SEO

| 想改的内容 | 位置 |
| --- | --- |
| 浏览器标签标题、默认 SEO 描述、`openGraph` | 改 `site.ts` → `siteMeta.title`、`siteMeta.description`（`layout.tsx` 中 `metadata` 从 `siteMeta` 读取） |
| 作者显示名（顶栏、页脚版权） | `site.ts` → `siteMeta.author` |
| 社交/站外标识（如 GitHub handle 文案） | `site.ts` → `siteMeta.handle`（若组件有引用） |

### 首屏 Hero

| 想改的内容 | 位置 |
| --- | --- |
| Hello 轮播文案（你好 / Hello / Bonjour…） | `site.ts` → `hero.greetings`（字符串数组，顺序即轮播顺序） |
| 大标题、副标题、状态一行小字 | `site.ts` → `hero.headline`、`hero.subline`、`hero.statusLine` |
| Hello 行 **渐变色与动效节奏** | `src/components/hello-cycle.tsx`（`HELLO_GRADIENTS`、停留时间 `dwell` 等） |
| 首屏 **科技关键词** 小 pill 图标与文字 | `src/components/hero.tsx` → `techStrip` |
| 社交按钮 **链接与是否显示** | `site.ts` → `social`（留空 `""` 隐藏对应按钮） |
| 社交按钮 **英文标签**（GitHub / 邮件等） | `src/components/hero.tsx` → `socialConfig`（与 `social` 字段对应） |

### 导航与首页区块顺序

| 想改的内容 | 位置 |
| --- | --- |
| 顶栏锚点文字与顺序、对应页面区块 | `site.ts` → `navItems`（每项 `id` 必须与页面上对应 `<section id="...">` 一致） |
| 首页 **区块出现顺序**或是否显示某块 | `src/app/page.tsx`（增删 `<EducationSection />` 等） |

### 各区块标题与说明文案

| 想改的内容 | 位置 |
| --- | --- |
| 眉题、大标题、灰色说明、小栏目标题等 | `site.ts` → `sectionCopy`（如 `education`、`resume`、`life`、`blog` 等） |
| 博客区：**RSS / 分享 / 阅读全文 / 点赞相关文案 / 返回列表 / 文末点赞提示** | `site.ts` → `sectionCopy.blog`（字段随功能扩展，见该对象内注释与同文件顶部总览） |
| 履历下技能 **三列表头** 与对应数据键 | `site.ts` → `sectionCopy.resumeSkills.columns`（与 `skills` 内 key 对应） |

### 时间线、项目、技能、生活

| 想改的内容 | 位置 |
| --- | --- |
| 教育经历 | `site.ts` → `education` |
| 工作经历 / 项目履历时间线 | `site.ts` → `experience` |
| 精选项目卡片（若首页启用 `ProjectsSection`） | `site.ts` → `projects` |
| 技能三列具体条目 | `site.ts` → `skills` |
| 生活区左栏卡片 | `site.ts` → `hobbies` |
| 生活区右栏随笔 | `site.ts` → `lifeNotes` |

### 博客（列表 + 独立文章页）

| 想改的内容 | 位置 |
| --- | --- |
| **文章篇目、标题、摘要、日期、标签、正文**；列表 `href` 自动生成 | `src/data/blog-articles.ts` → `articles` 数组（每项 `slug` 对应 URL `/blog/{slug}`） |
| 增删文章后无需改路由：构建时会 `generateStaticParams` | 同上，保存后执行 `npm run build` 即可 |
| RSS 按钮是否显示与订阅地址 | `site.ts` → `blogMeta.feedUrl`（**留空字符串**则隐藏 RSS 按钮） |
| 博客列表区 UI 逻辑（分享、卡片布局、点赞位置） | `src/components/blog-section.tsx`（通常只改 `site.ts` / `blog-articles.ts` 即可） |

### 点赞与数据

| 想改的内容 | 位置 |
| --- | --- |
| 是否启用 **全站累计点赞数**（需服务端存储） | 在项目根目录配置 `.env`（参考 **`.env.example`**）填入 Upstash Redis 的 `UPSTASH_REDIS_REST_URL` 与 `UPSTASH_REDIS_REST_TOKEN` |
| 未配置 Redis 时：仍可点赞，Cookie 防重复，**不展示全网数字**（行为见 `src/app/api/likes/route.ts`） | — |

### 顶栏头像

| 想改的内容 | 位置 |
| --- | --- |
| 作者旁小图 | 替换 `public/author-avatar.jpg`，或改 `src/components/site-nav.tsx` 里 `<Image src="..." />` 的路径/文件名 |

### 页脚

| 想改的内容 | 位置 |
| --- | --- |
| 版权行中的 **年份与作者名** | 年份为运行时当前年；作者名来自 `siteMeta.author`（改 `site.ts`） |
| 右侧说明（如「Next.js · 部署于 Vercel」） | `src/components/site-footer.tsx` 内对应文案 |

### 视觉与指针（进阶）

| 想改的内容 | 位置 |
| --- | --- |
| 全局色板、链接色、纸面背景 | `src/app/globals.css` → `:root` 与 `@theme inline` |
| 指针跟手松紧、可点击判定 | `public/custom-cursor.js`（如 `LERP`、`closest(...)`）与 `globals.css` 中 `.cc-*` |

---

## 内容清单速查（数据从哪来）

| 页面区域 | 数据来源 |
| --- | --- |
| 站点标题与描述 | `siteMeta`（`layout.tsx` metadata） |
| 首屏 | `hero`（含 `greetings`）+ `social` + `hero.tsx` 内 `techStrip` / `socialConfig` |
| 博客列表摘要与链接 | `blog-articles.ts` 导出的 `blogPosts` |
| 博客单篇正文 | `blog-articles.ts` → `articles` |
| 项目 | `projects` |
| 工作与技能 | `experience` + `skills` |
| 教育 | `education` |
| 生活与爱好 | `hobbies` + `lifeNotes` |
| 导航 | `navItems` |

## 部署到 Vercel

导入仓库后使用默认 Next.js 构建；环境变量在 Vercel **Settings → Environment Variables** 中配置（若使用点赞累计，添加 Upstash 两项）。域名在 **Settings → Domains** 配置。

## 许可证

私有个人项目；如需开源可自行添加 `LICENSE`。
