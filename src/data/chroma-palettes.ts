/**
 * 首页「你好」与装饰色彩条共用 `hello`。
 * 所有色板使用同一角度，仅色标变化，避免「只有蓝黑斜向」的错觉。
 */
export const CHROMA_GRADIENT_ANGLE = "122deg" as const;

export type ChromaPalette = {
  hello: string;
  icon: string;
  caption: string;
}

function hello(...stops: string[]): string {
  return `linear-gradient(${CHROMA_GRADIENT_ANGLE}, ${stops.join(", ")})`;
}

export const CHROMA_PALETTES: readonly ChromaPalette[] = [
  {
    hello: hello(
      "#1a0a2e 0%",
      "#5b21b6 18%",
      "#c026d3 36%",
      "#e11d48 54%",
      "#ea580c 72%",
      "#0e7490 88%",
      "#172554 100%",
    ),
    icon: "#7c3aed",
    caption: "color-mix(in oklab, #7c3aed 52%, var(--muted-2))",
  },
  {
    hello: hello(
      "#292524 0%",
      "#9a3412 20%",
      "#ea580c 38%",
      "#facc15 56%",
      "#eab308 74%",
      "#78716c 92%",
      "#1c1917 100%",
    ),
    icon: "#c2410c",
    caption: "color-mix(in oklab, #c2410c 48%, var(--muted-2))",
  },
  {
    hello: hello(
      "#022c22 0%",
      "#0f766e 22%",
      "#14b8a6 40%",
      "#0ea5e9 58%",
      "#3b82f6 76%",
      "#6366f1 92%",
      "#1e1b4b 100%",
    ),
    icon: "#0d9488",
    caption: "color-mix(in oklab, #0f766e 50%, var(--muted-2))",
  },
  {
    hello: hello(
      "#3b0764 0%",
      "#7c3aed 24%",
      "#c026d3 44%",
      "#db2777 64%",
      "#f472b6 80%",
      "#4c1d95 100%",
    ),
    icon: "#a855f7",
    caption: "color-mix(in oklab, #c026d3 46%, var(--muted-2))",
  },
  {
    hello: hello(
      "#0c1929 0%",
      "#1d4ed8 22%",
      "#38bdf8 42%",
      "#22d3ee 60%",
      "#818cf8 78%",
      "#4c1d95 100%",
    ),
    icon: "#0284c7",
    caption: "color-mix(in oklab, #0284c7 48%, var(--muted-2))",
  },
] as const;
