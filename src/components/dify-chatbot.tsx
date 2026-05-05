import Script from "next/script";

const DIFY_EMBED_SRC = "https://udify.app/embed.min.js";

export function DifyChatbot() {
  const token = process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN;
  if (!token) return null;

  const configJson = JSON.stringify({
    token,
    /** udify embed 默认用 body.onload；Next 常在 load 后才执行脚本，须立即初始化 */
    dynamicScript: true,
    /** 气泡锚点：安全区 + 略抬高，给对话窗留出视口 */
    containerProps: {
      style: {
        right: "max(1rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1.35rem, env(safe-area-inset-bottom, 0px))",
      },
    },
    inputs: {},
    systemVariables: {},
    userVariables: {},
  });

  return (
    <>
      <Script id="dify-chatbot-config" strategy="afterInteractive">
        {`window.difyChatbotConfig = ${configJson};`}
      </Script>
      <Script id={token} src={DIFY_EMBED_SRC} strategy="afterInteractive" />
    </>
  );
}
