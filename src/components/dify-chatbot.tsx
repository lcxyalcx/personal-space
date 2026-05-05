"use client";

import { useEffect } from "react";

const DIFY_EMBED_SRC = "https://udify.app/embed.min.js";

export function DifyChatbot() {
  const token = process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN;

  useEffect(() => {
    if (!token) return;

    (window as typeof window & { difyChatbotConfig: unknown }).difyChatbotConfig = {
      token,
      /** udify embed 默认用 body.onload；SPA 须在加载 embed 前写入 */
      dynamicScript: true,
      containerProps: {
        style: {
          right: "max(1rem, env(safe-area-inset-right, 0px))",
          bottom: "max(1.35rem, env(safe-area-inset-bottom, 0px))",
        },
      },
      inputs: {},
      systemVariables: {},
      userVariables: {},
    };

    if (document.querySelector("script[data-dify-bootstrap]")) return;

    const s = document.createElement("script");
    s.src = DIFY_EMBED_SRC;
    s.id = token;
    s.defer = true;
    s.setAttribute("data-dify-bootstrap", "1");
    document.body.appendChild(s);
  }, [token]);

  return null;
}
