/**
 * =============================================================================
 * 文案与内容修改指南（改这里即可，一般不用动 components）
 * =============================================================================
 *
 * · siteMeta          → 浏览器标签标题、SEO 描述、作者名（顶栏、页脚）
 * · hero              → 首屏大标题 headline、副标题 subline、一行补充 statusLine
 * · social            → 社交链接（留空 "" 不显示该按钮）
 * · sectionCopy       → 各区块「眉题 / 大标题 / 说明」与栏目小标题、项目卡片外链文案
 * · projects          → 每个项目的 name、description、stack、year、link
 * · experience        → 工作经历时间线
 * · education         → 教育经历时间线
 * · skills            → 技能三列数组
 * · hobbies / lifeNotes → 生活区左右两栏正文
 * · navItems          → 顶栏顺序与锚点 id（须与页面 section 的 id 一致）
 * · hero.greetings    → 首屏「Hello」式多语言轮播文案（数组顺序即轮播顺序）
 * · blogPosts（见 `blog-articles.ts`）/ blogMeta / sectionCopy.blog → 博客、RSS、点赞与阅读时间
 *
 * =============================================================================
 */

export const siteMeta = {
  title: "Jacob Liu | 个人主页",
  description: "复旦大学电子信息研究生。关注大语言模型推理加速、强化学习及 Agent 架构。",
  author: "Jacob Liu",
  /** 用于页脚与结构化展示 */
  handle: "lcxyalcx",
};

export const hero = {
  /** Apple「Hello」式开场：多行轮播，可增删语言 */
  greetings: ["你好。", "Hello.", "Bonjour.", "Hola."],
  headline: "Exploring the frontier of large language models and agents.",
  subline:
    "I am Jacob Liu, a postgraduate student at Fudan University working on LLM inference acceleration, reinforcement learning, and Agent architecture. This site collects my projects, writing, and small experiments.",
  /** 首屏副标题下方的一行补充说明 */
  statusLine: " ",
};

export const social = {
  github: "https://github.com/lcxyalcx",
  email: "mailto:25213090162@m.fudan.edu.cn",
  /** 可留空字符串隐藏对应按钮 */
  twitter: "",
  linkedin: "",
};

/** 各区块展示用中文标题与说明（原先写死在组件里的，现集中于此） */
export const sectionCopy = {
  education: {
    eyebrow: "教育",
    title: "教育经历",
    hint: "学位、研究方向、竞赛与课程项目",
  },
  projects: {
    eyebrow: "精选",
    title: "个人作品",
    hint: "这里将展示其他小工具与探索项目（开发中）。",
    linkLabel: "进一步了解",
  },
  resume: {
    eyebrow: "履历",
    title: "项目经历",
    hint: "在强化学习、多智能体与推理加速层面的业务实践。",
  },
  resumeSkills: {
    eyebrow: "能力",
    title: "相关技能",
    /** 三列标题，顺序对应 languages / infra / frontend */
    columns: [
      { title: "编程语言", skillKey: "languages" as const },
      { title: "框架与工具", skillKey: "infra" as const },
      { title: "AI 与算法底座", skillKey: "frontend" as const },
    ],
  },
  life: {
    eyebrow: "生活",
    title: "生活与爱好",
    hint: "技术之外的你，同样是个人品牌的一部分。",
    hobbiesColumn: "爱好与长期投入",
    notesColumn: "随笔与状态",
  },
  blog: {
    eyebrow: "写作",
    title: "博客与分享",
    hint: "长文、笔记与可复用的经验；支持 RSS 订阅、一键分享本站，以及为单篇或全站点赞（可选接入 Redis 汇总）。",
    feedLabel: "RSS 订阅",
    shareLabel: "分享本站",
    readLabel: "阅读全文",
    emptyHint: "文章整理中。在 `blogPosts` 填入条目，并在 `blogMeta.feedUrl` 填写 RSS 地址即可启用订阅按钮。",
    /** 博客区块顶部：全站鼓励语 */
    siteLikeIntro: "觉得内容有帮助？可以点一下为我加油。",
    likeSiteLabel: "点个赞",
    likePostLabel: "赞",
    likedLabel: "已赞",
    /** 跟在数字后，如「12 次」 */
    likeCountSuffix: "次",
    /** 未配置 Upstash 时显示在「全站点赞」下方 */
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

/** `feedUrl` 留空则不显示 RSS 按钮 */
export const blogMeta = {
  feedUrl: "",
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  link?: string;
  year: string;
};

export const projects: Project[] = [];

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  detail: string;
};

export const experience: TimelineItem[] = [
  {
    title: "Multi-turn AI Agent 强化学习评测与优化 | Multi-turn Agent RL Optimization",
    org: "多轮交互建模 / Multi-turn RL | Scenario Modeling",
    period: "2026.02 — 至今",
    detail:
      "基于 RAGEN 构建多步规划等多轮 Agent 任务，并在多维度进行评估。提出跨轮次知识传递机制，提升 Rollout 阶段样本利用效率，显著降低训练耗时。\nBuilt multi-turn Agent tasks using RAGEN. Proposed a cross-turn knowledge transfer mechanism to improve sampling efficiency and significantly reduce training time.",
  },
  {
    title: "基于 AReaL 的投机解码加速 | Speculative Decoding upon AReaL",
    org: "Rollout 算力优化 / 投机解码 | Computation Optimization",
    period: "2025.10 — 2026.01",
    detail:
      "针对异步强化学习高并发痛点，提出投机解码加速方案，将 Rollout 吞吐量提升 1.2-1.5 倍。设计自适应阈值动态更新策略，保障接受率与训练稳定性。\nProposed a speculative decoding acceleration scheme for asynchronous RL, increasing Rollout throughput by 1.2-1.5x. Designed an adaptive update strategy to ensure stable acceptance rates.",
  },
  {
    title: "大模型投机解码评测平台 | LLM Speculative Decoding Bench",
    org: "多业务场景评测 / Spec-Bench | Algorithm Evaluation",
    period: "2025.06 — 2025.10",
    detail:
      "构建标准化的投机解码评测平台，统一部署前沿加速算法，覆盖 6 大核心业务产出多维度数据报告，为推理成本与算法决策提供支撑。\nBuilt a standardized evaluation platform for speculative decoding algorithms, covering 6 core scenarios to provide solid data support for inference cost and algorithm selection.",
  },
];

export const education: TimelineItem[] = [
  {
    title: "电子信息 · 硕士研究生 | M.S. in Electronic Information",
    org: "复旦大学 — 计算与智能创新学院 | Fudan University",
    period: "2025.09 — 至今",
    detail: "方向：大语言模型推理加速、强化学习及 Agent 架构。\nResearch Insights: LLM Inference Acceleration, Reinforcement Learning, and Agent Architecture.",
  },
  {
    title: "通信工程 · 本科生 | B.S. in Communication Engineering",
    org: "南京大学 — 电子科学与工程学院 | Nanjing University",
    period: "2021.09 — 2025.06",
    detail: " ",
  },
];

export const skills = {
  languages: ["Python", "C++", "TypeScript", "Shell"],
  infra: ["vLLM", "SGLang", "Linux", "Docker"],
  frontend: ["PyTorch", "Hugging Face", "RAGEN", "Agent"],
};

export const hobbies = [
  {
    title: "机械键盘与配列实验",
    body: "喜欢 40% 与分体键盘，折腾固件映射与静音轴体，打字声也是一种 UX。",
  },
  {
    title: "胶片与暗房",
    body: "慢节奏测光与冲洗，和写代码一样：流程感与可复现性同样迷人。",
  },
  {
    title: "独立游戏与关卡设计",
    body: "关注「信息密度」与「学习曲线」，常从关卡节奏反推系统边界。",
  },
];

export const lifeNotes = [
  "相信「默认开源」与「文档即产品」能放大团队杠杆。",
  "通勤耳机里多半是合成器浪潮与后摇，写复杂状态机时反而听白噪。",
  "周末会刻意断网几小时：散步、做饭、或把书架上的纸书读完一章。",
];

/** 顺序即滚动顺序：教育 → 履历 → 生活 → 博客 */
export const navItems = [
  { id: "education", label: "教育" },
  { id: "resume", label: "项目经历" },
  { id: "life", label: "生活与爱好" },
  { id: "blog", label: "博客" },
] as const;
