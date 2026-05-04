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
  headline: "探索大模型与 Agent 的技术边界。",
  subline: "作为一名计算机背景的研究生，我对大语言模型推理加速、强化学习及 Agent 架构有着深刻理解。能够精准评估 AI 产品的技术边界与算力成本，并熟练运用投机解码等前沿技术优化模型性能表现，拥有敏锐的业务嗅觉与跨团队协作能力。",
  /** 首屏副标题下方的一行补充说明 */
  statusLine: "复旦大学 · 电子信息研究生 · 计算与智能创新学院",
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
    hint: "学位、导师方向、竞赛与课程项目都可以写进 detail 字段。",
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
    title: "Multi-turn AI Agent 强化学习评测与优化",
    org: "多轮交互场景建模, Multi-turn RL",
    period: "2026.02 — 至今",
    detail:
      "业务场景拆解与建模：基于 RAGEN 实现了 MetaMathQA (数学推理)、WebShop（多步规划）等经典 Agent 任务场景。通过任务成功率、轨迹多样性等指标，评估 Agent 在 Multi-turn 环境下的训练表现。\n优化方案探索：创新性提出利用相邻轮次有效特征指导当前轮决策的优化方案，通过建立跨轮次的知识传递与信息重用机制，提升 Rollout 阶段的样本利用效率，显著降低多轮交互任务下的训练耗时并加速收敛。",
  },
  {
    title: "基于 AReaL 的投机解码加速",
    org: "AReaL, Rollout 算力资源优化, vLLM/SGLang, 投机解码",
    period: "2025.10 — 2026.01",
    detail:
      "降本增效策略落地：针对异步强化学习高并发性与长尾延迟的痛点，提出了基于投机解码的加速方案。在保证核心训练效果无损的前提下，将 Rollout 吞吐量提升 1.2-1.5 倍，降低了 Rollout 的算力成本。\n动态更新解决瓶颈：针对异步强化学习中草稿模型的滞后问题，设计了“基于自适应阈值的动态更新策略”，引入动态回退机制，保障了投机解码的接受率与训练结果的可用性。",
  },
  {
    title: "大模型投机解码评测平台",
    org: "多业务场景评测，投机解码，Spec-Bench 测评",
    period: "2025.06 — 2025.10",
    detail:
      "算法部署与指标定义：构建标准化的投机解码性能评测平台，统一部署 EAGLE、Medusa 等前沿加速算法。面向数学推理、RAG、多轮对话等 6 大核心业务场景，定义端到端加速比、响应延迟等评估指标。\n数据赋能业务决策：基于多维度评测数据产出各算法的性能报告，为后续不同业务场景下的投机解码算法的选择、推理成本核算提供了坚实的数据支撑与决策依据。",
  },
];

export const education: TimelineItem[] = [
  {
    title: "电子信息 · 硕士研究生",
    org: "复旦大学 — 计算与智能创新学院",
    period: "2025.09 — 至今",
    detail: "方向：大语言模型推理加速、强化学习及 Agent 架构。",
  },
  {
    title: "通信工程 · 本科生",
    org: "南京大学 — 电子科学与工程学院",
    period: "2021.09 — 2025.06",
    detail: "相关课程与基础学习。",
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
