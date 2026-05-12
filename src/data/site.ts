/**
 * =============================================================================
 * 内容维护入口（优先改这里）
 * =============================================================================
 *
 * · siteMeta          → 浏览器标题、SEO 描述、作者名
 * · hero              → 首屏文案、焦点主题与统计卡片
 * · social            → 社交链接
 * · sectionCopy       → 各区块标题、说明与栏目文案
 * · projects          → 最新项目卡片
 * · experience        → 时间线
 * · education         → 教育经历
 * · skills            → 技能三列
 * · hobbies/lifeNotes → 生活区
 * · navItems          → 顶栏锚点顺序（需与 section id 一致）
 * · hero.greetings    → 首屏轮播文案
 * =============================================================================
 */

export const siteMeta = {
  title: "Jacob Liu | Agent Systems & AI Products",
  description:
    "Jacob Liu 的个人主页。复旦大学电子信息研究生，关注 Agent 评测、LLM 推理系统与本地优先 AI 产品，最近公开项目包括 SpecAgentLab 与 Briefly AI。",
  author: "Jacob Liu",
  handle: "lcxyalcx",
};

export const hero = {
  greetings: ["你好。", "Hello.", "Bonjour.", "こんにちは。"],
  headline: "Shipping agent products with a researcher’s eye for latency, quality, and trust.",
  subline:
    "I am Jacob Liu, a postgraduate student at Fudan University working at the intersection of LLM systems, agent evaluation, and AI product design. Recently, I shipped SpecAgentLab and Briefly AI to turn research workflows into tools people can actually use.",
  statusLine:
    "Current through-line: make AI systems measurable, inspectable, and calm enough to be trusted.",
  focusAreas: ["Agent Evaluation", "LLM Inference", "Local-first RAG", "Readable AI Interfaces"],
  principles: [
    {
      title: "Systems Thinking",
      detail: "Evaluation, inference, interface, and cost should be designed together.",
    },
    {
      title: "Inspectability",
      detail: "Trace, citation, latency, and system state must stay visible enough to earn trust.",
    },
    {
      title: "Calm Software",
      detail: "Technical tools should still feel legible, quiet, and durable in daily use.",
    },
  ],
  stats: [
    {
      label: "Recent public launches",
      value: "2",
      detail: "SpecAgentLab and Briefly AI",
    },
    {
      label: "Current operating mode",
      value: "Research → Product",
      detail: "turning benchmarks and reading workflows into usable software",
    },
    {
      label: "Base",
      value: "Fudan University",
      detail: "M.S. in Electronic Information · Shanghai",
    },
  ],
} as const;

export const social = {
  github: "https://github.com/lcxyalcx",
  email: "mailto:25213090162@m.fudan.edu.cn",
  twitter: "",
  linkedin: "",
};

export const sectionCopy = {
  education: {
    eyebrow: "Background",
    title: "教育与研究背景",
    hint: "研究训练、课程与学术环境，塑造了我做 Agent 系统和 AI 产品时的方法论。",
  },
  projects: {
    eyebrow: "Selected Work",
    title: "精选项目",
    hint: "这里收纳近期更完整的构建。最新更新包括 SpecAgentLab 与 Briefly AI，但它们不是我全部的工作面貌。",
    linkLabel: "View project",
  },
  resume: {
    eyebrow: "Build Log",
    title: "研究与构建",
    hint: "从多轮 Agent 评测到本地 RAG 工具，我更关心系统怎样被观察、解释和持续迭代。",
  },
  resumeSkills: {
    eyebrow: "Toolbox",
    title: "相关技能",
    columns: [
      { title: "语言与数据", skillKey: "languages" as const },
      { title: "产品工程", skillKey: "infra" as const },
      { title: "AI / 系统", skillKey: "frontend" as const },
    ],
  },
  life: {
    eyebrow: "Off Screen",
    title: "长期兴趣与偏好",
    hint: "我也关心器物、排版、摄影和系统如何被人真正使用，它们会反过来影响我做产品时的判断。",
    hobbiesColumn: "长期兴趣",
    notesColumn: "我相信的产品原则",
  },
  blog: {
    eyebrow: "Writing",
    title: "博客与笔记",
    hint: "记录我在 Agent、推理加速、工程设计和类型边界上的长期思考，也保留那些可复用的实践细节。",
    feedLabel: "RSS 订阅",
    shareLabel: "分享本站",
    readLabel: "阅读全文",
    emptyHint: "文章整理中。在 `blogPosts` 填入条目，并在 `blogMeta.feedUrl` 填写 RSS 地址即可启用订阅按钮。",
    siteLikeIntro: "如果这些记录对你有帮助，欢迎点一下赞。",
    likeSiteLabel: "点个赞",
    likePostLabel: "赞",
    likedLabel: "已赞",
    likeCountSuffix: "次",
    likeLocalHint:
      "未配置数据存储时不显示全站累计数字；你的支持仍会通过 Cookie 记录，避免重复点赞。配置见仓库 `.env.example`。",
    readApprox: "约",
    readMinutes: "分钟",
    backToBlog: "返回博客列表",
    postFooterLike: "喜欢这篇文章？",
  },
} as const;

export type { BlogPost } from "./blog-articles";
export { blogPosts } from "./blog-articles";

export const blogMeta = {
  feedUrl: "",
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  year: string;
  status: string;
  role: string;
  description: string;
  highlight: string;
  bullets: string[];
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    name: "SpecAgentLab",
    year: "2026",
    status: "Live Demo",
    role: "多轮 Agent 评测工作台",
    description:
      "把 Baseline 与 Draft+Verifier 两类执行路径放到同一套 bench 里，对 latency、cost、quality 与 tool reliability 做可追踪的对比分析。",
    highlight: "让 Agent 评测不只停留在分数，而是能回到 trace、工具调用和每次运行的上下文里继续判断。",
    bullets: [
      "围绕任务包、评分、run detail、dashboard 搭起完整的评测闭环。",
      "用 Prisma + Postgres 记录 Run 与 ToolCall，为比较不同执行策略提供结构化数据。",
      "在线 demo 面向公开展示，既能讲清思路，也能直接上手体验。",
    ],
    stack: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "Vercel AI SDK", "Recharts"],
    links: [
      { label: "Live Demo", href: "https://spec-agent-lab.vercel.app" },
      { label: "GitHub", href: "https://github.com/lcxyalcx/SpecAgent-Lab" },
    ],
  },
  {
    name: "Briefly AI",
    year: "2026",
    status: "Desktop App",
    role: "本地优先论文阅读工作流",
    description:
      "把 PDF 导入、结构化解析、混合检索和 citation-grounded 对话收进一个桌面应用里，让研究阅读从“堆文件”变成“可复用上下文”。",
    highlight: "重点不是更炫的聊天，而是让回答始终能追溯到文献原文、目录结构和具体引用位置。",
    bullets: [
      "Electron 三栏桌面界面，适合长时间阅读、做笔记和跨文献回看。",
      "默认支持本地启发式摘要，同时兼容 Ollama 与 OpenAI-compatible API 路由。",
      "在 chunk 级检索与回答中保留引用链路，让理解、摘要与二次写作更可靠。",
    ],
    stack: ["Electron", "React", "TypeScript", "Local RAG", "Ollama", "OpenAI-compatible APIs"],
    links: [{ label: "GitHub", href: "https://github.com/lcxyalcx/Briefly-AI" }],
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  detail: string;
};

export const experience: TimelineItem[] = [
  {
    title: "SpecAgentLab | 多轮 Agent 评测工作台",
    org: "个人项目 · Evaluation Systems / Full-stack Product",
    period: "2026.05 — 至今",
    detail:
      "围绕任务包、评分、trace、dashboard 和 run detail 设计完整评测闭环，把 Baseline 与 Draft+Verifier 两类策略放到同一视图中比较 latency、cost、quality 与 tool reliability，并通过在线 demo 对外展示方法与结果。",
  },
  {
    title: "Briefly AI | 本地优先论文阅读桌面应用",
    org: "个人项目 · Desktop Product / Local RAG",
    period: "2026.05 — 至今",
    detail:
      "使用 Electron 构建从 PDF 导入、结构化解析、混合检索到 citation-grounded 对话的阅读工作流，支持本地启发式、Ollama 与 OpenAI-compatible API 模型路由，让研究笔记、引用和原文上下文保持可追踪。",
  },
  {
    title: "Multi-turn Agent RL 评测与优化",
    org: "研究方向 · Agent Evaluation / Reinforcement Learning",
    period: "2026.02 — 至今",
    detail:
      "基于多轮规划任务搭建评测环境，关注中间信号设计、轨迹质量与跨轮知识传递，让 Agent 优化过程不只追求最终成功率，也能更稳定地反映真实交互表现。",
  },
];

export const education: TimelineItem[] = [
  {
    title: "电子信息 · 硕士研究生",
    org: "复旦大学 · 计算与智能创新学院",
    period: "2025.09 — 至今",
    detail: "研究方向聚焦大语言模型推理系统、Agent 架构与评测，以及 AI 产品如何把复杂能力组织成可理解的交互体验。",
  },
  {
    title: "通信工程 · 本科",
    org: "南京大学 · 电子科学与工程学院",
    period: "2021.09 — 2025.06",
    detail: "在通信、信号与系统训练之外，也逐渐把兴趣转向系统工程、推理效率与人机交互之间的连接点。",
  },
];

export const skills = {
  languages: ["Python", "TypeScript", "SQL", "C++"],
  infra: ["Next.js 16", "Electron", "Prisma", "PostgreSQL", "Docker"],
  frontend: ["Vercel AI SDK", "RAG", "Ollama", "Agent Evaluation", "Prompt / UX Writing"],
};

export const hobbies = [
  {
    title: "胶片、相机与 photobook",
    body: "喜欢慢节奏测光、冲洗和翻阅成册图像。它提醒我：信息密度、留白和节奏感，本来就是设计的一部分。",
  },
  {
    title: "键盘与桌面器物",
    body: "会认真折腾配列、键程、材质和手感。对我来说，输入设备和软件界面一样，都在塑造长期工作的情绪与效率。",
  },
  {
    title: "独立游戏与空间叙事",
    body: "常常从关卡节奏、引导方式和失败反馈里学产品设计，尤其在信息揭示和学习曲线的拿捏上很受启发。",
  },
];

export const lifeNotes = [
  "我喜欢能自我解释的产品：trace、引用、延迟数字和状态提示，本身就是界面的一部分。",
  "研究一旦能被非研究者看懂、复现和使用，价值才真正开始放大。",
  "文案、默认值、文档和边界处理不是收尾工作，它们常常决定了系统是否真的可用。",
];

export const navItems = [
  { id: "resume", label: "研究" },
  { id: "education", label: "背景" },
  { id: "projects", label: "项目" },
  { id: "blog", label: "写作" },
  { id: "life", label: "偏好" },
] as const;
