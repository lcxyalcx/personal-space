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
      "#1f103f 0%",
      "#3b2fff 20%",
      "#1fc7ff 44%",
      "#58f3c3 70%",
      "#08203f 100%",
    ),
    icon: "#32d1ff",
    caption: "color-mix(in oklab, #32d1ff 46%, var(--muted-2))",
  },
  {
    hello: hello(
      "#291333 0%",
      "#8f2cff 22%",
      "#ff5db1 46%",
      "#ffb067 70%",
      "#2a1638 100%",
    ),
    icon: "#ff5db1",
    caption: "color-mix(in oklab, #ff5db1 44%, var(--muted-2))",
  },
  {
    hello: hello(
      "#061527 0%",
      "#0061ff 22%",
      "#00c2ff 46%",
      "#8df7ff 72%",
      "#10224a 100%",
    ),
    icon: "#00c2ff",
    caption: "color-mix(in oklab, #00c2ff 44%, var(--muted-2))",
  },
  {
    hello: hello(
      "#231224 0%",
      "#ff3f6c 24%",
      "#ff7b54 48%",
      "#ffd166 72%",
      "#40213f 100%",
    ),
    icon: "#ff7b54",
    caption: "color-mix(in oklab, #ff7b54 44%, var(--muted-2))",
  },
] as const;
