"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CHROMA_PALETTES } from "@/data/chroma-palettes";
import { hero } from "@/data/site";

/** Apple 式：偏长的停留、慢进慢出、几乎不用缩放与强模糊 */
const easeApple = [0.25, 0.1, 0.25, 1] as const;

type Props = {
  /** 与 hero 色彩条带同步：每换一句「你好」切换一套渐变 */
  onChromaIndexChange?: (index: number) => void;
};

export function HelloCycle({ onChromaIndexChange }: Props) {
  const lines = hero.greetings;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) return;
    const dwell = 3600;
    const t = setInterval(() => setI((v) => (v + 1) % lines.length), dwell);
    return () => clearInterval(t);
  }, [lines.length]);

  const chromaIdx = i % CHROMA_PALETTES.length;
  const bg = CHROMA_PALETTES[chromaIdx]!.hello;

  useEffect(() => {
    onChromaIndexChange?.(chromaIdx);
  }, [chromaIdx, onChromaIndexChange]);

  return (
    <div className="hello-stage mb-2 min-h-[1.2em] overflow-visible pb-0.5 sm:mb-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={lines[i]}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: -10,
            filter: "blur(4px)",
            transition: { duration: 0.44, ease: easeApple },
          }}
          transition={{ duration: 0.62, ease: easeApple }}
          className="hello-line font-display text-center text-[clamp(1.95rem,4vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-left"
          style={{
            backgroundImage: bg,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFeatureSettings: '"ss01"',
          }}
        >
          {lines[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
