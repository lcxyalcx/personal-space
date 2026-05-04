"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { hero } from "@/data/site";

/** 与全局暖石配色一致：低饱和炭灰、青铜、暖灰 — 类似 Apple Hello 的克制渐变字 */
const HELLO_GRADIENTS = [
  "linear-gradient(118deg, #1c1b19 6%, #6b5d4c 38%, #9a7b52 58%, #3d3a36 92%)",
  "linear-gradient(122deg, #4a433c 0%, #1c1b19 42%, #7d6a56 72%, #2a2826 100%)",
  "linear-gradient(120deg, #1c1b19 10%, #5c5348 45%, #b89a72 62%, #1c1b19 95%)",
  "linear-gradient(124deg, #6e6256 0%, #2a2623 35%, #8a735c 55%, #1c1b19 88%)",
];

/** Apple 式：偏长的停留、慢进慢出、几乎不用缩放与强模糊 */
const easeApple = [0.25, 0.1, 0.25, 1] as const;

export function HelloCycle() {
  const lines = hero.greetings;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) return;
    const dwell = 3600;
    const t = setInterval(() => setI((v) => (v + 1) % lines.length), dwell);
    return () => clearInterval(t);
  }, [lines.length]);

  const bg = HELLO_GRADIENTS[i % HELLO_GRADIENTS.length];

  return (
    <div className="hello-stage mb-3 min-h-[1.2em] overflow-visible pb-0.5 sm:mb-5">
      <AnimatePresence mode="wait">
        <motion.p
          key={lines[i]}
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: -16,
            filter: "blur(4px)",
            transition: { duration: 0.52, ease: easeApple },
          }}
          transition={{ duration: 0.72, ease: easeApple }}
          className="hello-line text-center text-[clamp(2.85rem,11vw,5.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-left"
          style={{
            background: bg,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundSize: "165% 100%",
            fontFeatureSettings: '"ss01"',
          }}
        >
          {lines[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
