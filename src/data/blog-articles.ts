/**
 * 站内博客：正文与列表同源，修改后 `generateStaticParams` 会生成对应静态页。
 * 列表字段亦导出为 `blogPosts` 供首页与 `site.ts` 再导出。
 */

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  tag?: string;
};

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  date: string;
  tag?: string;
  excerpt: string;
  sections: BlogSection[];
};

const articles: BlogArticle[] = [
  {
    slug: "speculative-decoding-practice",
    title: "投机解码落地：在异步 RL 里稳住接受率",
    date: "2026-01-18",
    tag: "推理加速",
    excerpt:
      "草稿模型滞后、接受率抖动、回退策略——把投机解码从论文搬进训练流水线时，我们踩过哪些坑，又如何用动态阈值把吞吐拉上去。",
    sections: [
      {
        heading: "为什么异步 RL 特别吃延迟",
        paragraphs: [
          "异步强化学习里，Rollout 与训练器之间的队列长度会直接反映在梯度时效性上：同样的算法，吞吐掉一点，等效 batch 就「变旧」，方差会悄悄变大。",
          "投机解码的本质是用便宜的小步猜测换大模型少次前向；一旦接受率不稳，省下来的算力又会被重算与回退吃掉，整体反而更慢。",
        ],
      },
      {
        heading: "我们实际调的三组旋钮",
        paragraphs: [
          "一是草稿与主模型的版本差：差太大，接受率断崖；差太小，收益有限。需要把「更新草稿」当成和调学习率同级的例行操作，而不是一次性部署。",
          "二是阈值与温度：把「低于某接受率就暂时关掉投机」做成自动策略，比人工盯盘可靠；阈值要和业务 SLA 对齐，而不是只追 benchmark。",
          "三是观测：至少要有「接受率 / 回退次数 / 队列深度」三条时间序列对齐看，否则很容易把吞吐波动误判成网络或存储问题。",
        ],
      },
      {
        heading: "可复制的检查清单",
        paragraphs: [
          "上线前跑一轮「坏草稿」演练：故意推旧版本草稿，看系统是否在 SLA 内降级到全量解码；演练通过再谈放量。",
          "把「何时算恢复」写进 on-call 手册：是接受率回到基线，还是 p99 延迟先恢复——避免指标各自为政。",
        ],
      },
    ],
  },
  {
    slug: "multi-turn-rl-evaluation",
    title: "多轮 Agent 评测：不止看成功率",
    date: "2025-12-06",
    tag: "强化学习",
    excerpt:
      "在数学推理、WebShop 等多轮场景里，如何把「做对」拆成可训练的中间信号，并用轨迹多样性约束过拟合。",
    sections: [
      {
        heading: "成功率会骗人",
        paragraphs: [
          "单看最终答案是否命中，很容易奖励到「模板化轨迹」：模型学会走最短路径，却牺牲探索与纠错能力，一换分布就崩。",
          "更稳妥的做法是同时记录：轮次长度、无效动作比例、是否触发工具错误、以及跨轮是否复用错误假设——这些才是上线后真实用户会遇到的。",
        ],
      },
      {
        heading: "把评测写进数据管线",
        paragraphs: [
          "评测配置与训练配置应同源版本管理：同一套任务定义、同一套随机种子策略，否则对比实验会在不知不觉中混入「环境漂移」。",
          "建议为每条轨迹落盘最小摘要（任务 id、轮次、关键工具调用结果），方便事后做切片分析，而不是只存一个布尔 success。",
        ],
      },
      {
        heading: "给业务同学的一句话",
        paragraphs: [
          "告诉他们：多轮 RL 的「稳」来自指标集合，而不是单一 KPI；先把共识写在文档里，再谈加功能。",
        ],
      },
    ],
  },
  {
    slug: "typescript-contract-boundaries",
    title: "用类型系统把 API 边界钉在仓库里",
    date: "2025-10-22",
    tag: "TypeScript",
    excerpt:
      "在领域模型与 HTTP 层之间，用 zod / 显式 DTO 与 branded type，把「口头约定」变成编译期错误。",
    sections: [
      {
        heading: "DTO 不是多余的一层",
        paragraphs: [
          "对外 JSON 与对内领域对象混在同一类型里，短期省代码，长期会在「字段可空吗」「单位是秒还是毫秒」上反复扯皮。",
          "DTO 负责「线上长什么样」，领域模型负责「业务认为它是什么」；中间用 parse 函数失败即拒绝请求，比运行时 if 分散在各处干净得多。",
        ],
      },
      {
        heading: "branded type 防混用",
        paragraphs: [
          "`UserId` 与 `ProjectId` 在运行时都是 string，但在类型层不相交，能拦住把用户 id 当项目 id 传的低级错误；对大型单体仓库性价比极高。",
        ],
      },
      {
        heading: "落地顺序",
        paragraphs: [
          "先挑一条最容易出事故的请求路径做样板：入站 parse、出站 serialize、单测覆盖非法载荷；再横向推广到其他模块。",
        ],
      },
    ],
  },
  {
    slug: "vllm-rollout-operations",
    title: "vLLM Rollout：运维侧的几个硬习惯",
    date: "2025-08-30",
    tag: "工程",
    excerpt:
      "从容量规划、版本发布到回滚，把推理服务当成「会参与训练的数据源」来运维，而不是普通在线 API。",
    sections: [
      {
        heading: "把 GPU 利用率拆开看",
        paragraphs: [
          "Rollout 阶段的瓶颈经常在 KV cache 与并发调度，而不是单纯 FLOPs；监控里要同时看 batch、序列长度分布与排队时间。",
        ],
      },
      {
        heading: "发布与训练解耦",
        paragraphs: [
          "推理镜像升级不要与训练主分支强绑定：为 Rollout 维护可读的配置清单（模型名、tensor parallel、max seq），训练任务只引用版本号。",
          "回滚演练要包含「正在跑的长任务」场景：优雅排空连接比直接 kill 更省重跑成本。",
        ],
      },
      {
        heading: "文档即值班手册",
        paragraphs: [
          "把「谁有权改哪项配置」「改了会影响哪些实验」写进同一页；个人站可以简陋，团队里这是救命钱。",
        ],
      },
    ],
  },
];

const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a])) as Record<string, BlogArticle>;

export function getBlogSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return bySlug[slug];
}

export const blogPosts: BlogPost[] = articles.map((a) => ({
  title: a.title,
  excerpt: a.excerpt,
  date: a.date,
  href: `/blog/${a.slug}`,
  tag: a.tag,
}));
