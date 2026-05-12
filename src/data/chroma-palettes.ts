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
      "#191919 0%",
      "#334155 18%",
      "#0f766e 42%",
      "#1d4ed8 68%",
      "#0f172a 100%",
    ),
    icon: "#0f766e",
    caption: "color-mix(in oklab, #0f766e 42%, var(--muted-2))",
  },
  {
    hello: hello(
      "#1f1720 0%",
      "#6b3e26 24%",
      "#b45309 44%",
      "#d6a35e 68%",
      "#2b2118 100%",
    ),
    icon: "#b45309",
    caption: "color-mix(in oklab, #b45309 46%, var(--muted-2))",
  },
  {
    hello: hello(
      "#112433 0%",
      "#1d4e89 24%",
      "#3b82f6 48%",
      "#8aa4c4 74%",
      "#1c2533 100%",
    ),
    icon: "#2563eb",
    caption: "color-mix(in oklab, #2563eb 44%, var(--muted-2))",
  },
  {
    hello: hello(
      "#261919 0%",
      "#7c2d12 28%",
      "#b45309 54%",
      "#d97706 72%",
      "#2a1d17 100%",
    ),
    icon: "#c97316",
    caption: "color-mix(in oklab, #c97316 44%, var(--muted-2))",
  },
] as const;
