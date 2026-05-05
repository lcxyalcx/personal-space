"use client";

import { useEffect } from "react";

type Props = {
  enabled: boolean;
};

function isChatOpen(iframe: HTMLElement) {
  return iframe.style.display !== "none" && iframe.style.display !== "";
}

/** 按气泡上方可用高度限制 iframe，避免顶边冲出视口（getBoundingClientRect 为视口坐标） */
function clampChatToViewport(iframe: HTMLElement) {
  const bubble = document.getElementById("dify-chatbot-bubble-button");
  const br = bubble?.getBoundingClientRect();
  const gap = 12;
  const reserveTop = 56;
  const topEdgeRoom = Math.floor((br ? br.top : window.innerHeight) - reserveTop - gap);
  const maxPx = Math.max(260, topEdgeRoom);
  iframe.style.setProperty("max-height", `${maxPx}px`, "important");
}

/**
 * udify 嵌入用 display 切换 iframe；同步 class 做打开动画，并在打开时按视口夹紧高度。
 */
export function DifyChatPolish({ enabled }: Props) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let iframeMo: MutationObserver | null = null;
    let attached = false;

    const syncOpenClass = (iframe: HTMLElement) => {
      const open = isChatOpen(iframe);
      iframe.classList.toggle("dify-window-open", open);
      if (open) {
        clampChatToViewport(iframe);
        requestAnimationFrame(() => {
          clampChatToViewport(iframe);
          iframe.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
    };

    const onResize = () => {
      const iframe = document.getElementById("dify-chatbot-bubble-window");
      if (iframe && isChatOpen(iframe)) clampChatToViewport(iframe);
    };

    const wireIframe = (iframe: HTMLElement) => {
      if (attached) return;
      attached = true;
      syncOpenClass(iframe);
      iframeMo = new MutationObserver(() => syncOpenClass(iframe));
      iframeMo.observe(iframe, { attributes: true, attributeFilter: ["style"] });
      window.addEventListener("resize", onResize, { passive: true });
    };

    const tryWire = () => {
      const iframe = document.getElementById("dify-chatbot-bubble-window");
      if (iframe) wireIframe(iframe);
    };

    tryWire();

    const bodyMo = new MutationObserver(tryWire);
    bodyMo.observe(document.body, { childList: true, subtree: true });

    return () => {
      bodyMo.disconnect();
      iframeMo?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  return null;
}
