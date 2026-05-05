"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dify-chat-hint-dismissed";

type Props = {
  enabled: boolean;
};

export function DifyChatOnboarding({ enabled }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    let bubble: HTMLElement | null = null;

    const dismiss = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    };

    const onBubbleClick = () => dismiss();

    const attach = () => {
      bubble = document.getElementById("dify-chatbot-bubble-button");
      if (!bubble) return false;
      bubble.setAttribute("title", "点击打开对话");
      bubble.setAttribute("aria-label", "打开聊天助手");
      bubble.addEventListener("click", onBubbleClick, { capture: true });
      setVisible(true);
      return true;
    };

    if (attach()) {
      return () => {
        bubble?.removeEventListener("click", onBubbleClick, { capture: true });
      };
    }

    const obs = new MutationObserver(() => {
      if (attach()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => obs.disconnect(), 20000);

    return () => {
      obs.disconnect();
      window.clearTimeout(timeout);
      bubble?.removeEventListener("click", onBubbleClick, { capture: true });
    };
  }, [enabled]);

  const onDismissClick = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!enabled || !visible) return null;

  return (
    <div
      role="note"
      className="pointer-events-auto fixed z-[2147483000] max-w-[min(18rem,calc(100vw-2rem)))] rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-3 text-sm leading-relaxed text-[var(--fg)] shadow-lg"
      style={{
        bottom: "8rem",
        right: "max(1rem, var(--dify-chatbot-bubble-button-right, 1rem))",
      }}
    >
      <p className="mb-2.5 text-[var(--muted)]">
        点击页面<strong className="font-medium text-[var(--fg)]">右下角「Talk to me」旁的蓝色按钮</strong>
        即可打开聊天窗口；再次点击可收起。
      </p>
      <button
        type="button"
        onClick={onDismissClick}
        className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--link)] transition-colors hover:text-[var(--link-hover)]"
      >
        知道了
      </button>
    </div>
  );
}
