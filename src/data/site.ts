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
 * · blogPosts / blogMeta / sectionCopy.blog → 博客列表、RSS 链接、区块标题与按钮文案
 *
 * =============================================================================
 */

export const siteMeta = {
  title: "Jacob Liu · personal.space",
  description: "开发者 / 造物癖 / 在代码与生活里找节奏的个人站点。",
  author: "Jacob Liu",
  /** 用于页脚与结构化展示 */
  handle: "jacobliu",
};

export const hero = {
  /** Apple「Hello」式开场：多行轮播，可增删语言 */
  greetings: ["你好。", "Hello.", "Bonjour.", "Hola."],
  headline: "把抽象，落成别人用得上的东西。",
  subline: "构建可靠系统，也保留一点不合时宜的浪漫。",
  /** 首屏副标题下方的一行补充说明 */
  statusLine: "常驻上海 · 关注开发者体验与系统可靠性 · 本站由 Next.js 驱动",
};

export const social = {
  github: "https://github.com/jacobliu",
  email: "mailto:hello@example.com",
  /** 可留空字符串隐藏对应按钮 */
  twitter: "",
  linkedin: "",
};

/** 各区块展示用中文标题与说明（原先写死在组件里的，现集中于此） */
export const sectionCopy = {
  education: {
    eyebrow: "教育",
    title: "教育经历",
    hint: "学位、导师方向、竞赛与课程项目都可以写进 detail 字段。",
  },
  projects: {
    eyebrow: "项目",
    title: "精选项目",
    hint: "侧重点是架构、开发者体验与可维护性；链接可指向仓库或线上演示。",
    linkLabel: "进一步了解",
  },
  resume: {
    eyebrow: "履历",
    title: "工作与履历",
    hint: "时间线可按「公司 / 角色」增删；下方技能矩阵同样来自数据文件。",
  },
  resumeSkills: {
    eyebrow: "能力",
    title: "技能与工具",
    /** 三列标题，顺序对应 languages / infra / frontend */
    columns: [
      { title: "语言", skillKey: "languages" as const },
      { title: "基础设施", skillKey: "infra" as const },
      { title: "前端", skillKey: "frontend" as const },
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
    hint: "长文、笔记与可复用的经验；支持 RSS 订阅与一键分享本站。",
    feedLabel: "RSS 订阅",
    shareLabel: "分享本站",
    readLabel: "阅读全文",
    emptyHint: "文章整理中。在 `blogPosts` 填入条目，并在 `blogMeta.feedUrl` 填写 RSS 地址即可启用订阅按钮。",
  },
} as const;

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  tag?: string;
};

/** 博客文章列表；无内容时可置为空数组 `[]` */
export const blogPosts: BlogPost[] = [
  {
    title: "用类型系统把边界说清楚",
    excerpt: "在 API 与领域模型之间，用 TypeScript 减少「口头约定」带来的返工。",
    date: "2025-04-12",
    href: "https://example.com/blog/types-boundaries",
    tag: "TypeScript",
  },
  {
    title: "从一次线上事故学到的可观测性清单",
    excerpt: "指标、日志、链路之外，更重要的是团队对「何时算恢复」的共识。",
    date: "2025-03-02",
    href: "https://example.com/blog/observability",
    tag: "SRE",
  },
];

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

export const projects: Project[] = [
  {
    name: "CLI 工具链套件",
    description: "为团队内部工作流封装的脚手架与发布流水线，减少重复配置与人为失误。",
    stack: ["TypeScript", "Node", "GitHub Actions"],
    link: "https://github.com",
    year: "2025",
  },
  {
    name: "实时协作白板",
    description: "基于 CRDT 的多人编辑原型，探索低延迟同步与冲突合并策略。",
    stack: ["React", "WebSocket", "Rust"],
    year: "2024",
  },
  {
    name: "个人知识库",
    description: "本地优先的笔记与图谱，支持全文检索与版本快照。",
    stack: ["Next.js", "SQLite", "MDX"],
    year: "2024",
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
    title: "高级软件工程师",
    org: "某互联网产品团队",
    period: "2023 — 至今",
    detail:
      "负责核心服务稳定性与性能预算，推动可观测性落地与发布节奏标准化。",
  },
  {
    title: "全栈工程师",
    org: "初创公司",
    period: "2020 — 2023",
    detail:
      "从 0 到 1 搭建 B 端控制台与计费子系统，参与技术选型与代码评审文化建立。",
  },
];

export const education: TimelineItem[] = [
  {
    title: "计算机科学与技术 · 硕士",
    org: "示例大学",
    period: "2018 — 2020",
    detail: "研究方向：分布式系统与一致性模型；课程项目涵盖存储引擎与共识算法实现。",
  },
  {
    title: "软件工程 · 学士",
    org: "示例大学",
    period: "2014 — 2018",
    detail: "ACM 校队成员；毕业设计为基于容器的服务编排演示平台。",
  },
];

export const skills = {
  languages: ["TypeScript", "Go", "Python", "Rust（学习中）"],
  infra: ["Kubernetes", "Terraform", "PostgreSQL", "Redis"],
  frontend: ["React", "Next.js", "Tailwind CSS", "WebGL（兴趣）"],
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

/** 顺序即滚动顺序：教育 → 项目 → 履历 → 生活 → 博客 */
export const navItems = [
  { id: "education", label: "教育" },
  { id: "projects", label: "项目" },
  { id: "resume", label: "履历" },
  { id: "life", label: "生活与爱好" },
  { id: "blog", label: "博客" },
] as const;
