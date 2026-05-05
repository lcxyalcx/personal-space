import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { DifyChatCue } from "@/components/dify-chat-cue";
import { DifyChatOnboarding } from "@/components/dify-chat-onboarding";
import { DifyChatPolish } from "@/components/dify-chat-polish";
import { DifyChatbot } from "@/components/dify-chatbot";
import { MotionProvider } from "@/components/motion-provider";
import { siteMeta } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const difyEnabled = Boolean(process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN);

  return (
    <html lang="zh-CN" className={`h-full scroll-smooth antialiased ${dmSans.variable}`}>
      <body className="min-h-full bg-bg font-sans text-fg">
        <div className="site-ambient" aria-hidden>
          <div className="site-ambient__grid" />
          <div className="site-ambient__orb site-ambient__orb--a" />
          <div className="site-ambient__orb site-ambient__orb--b" />
          <div className="site-ambient__orb site-ambient__orb--c" />
          <div className="site-ambient__sheen" />
          <div className="site-ambient__vignette" />
        </div>
        <DifyChatbot />
        {difyEnabled ? <DifyChatCue /> : null}
        <DifyChatPolish enabled={difyEnabled} />
        <DifyChatOnboarding enabled={difyEnabled} />
        <div className="relative z-10 flex min-h-full flex-col">
          <MotionProvider>
            {children}
            <div id="custom-cursor-portal" aria-hidden="true" />
            <Script src="/custom-cursor.js" strategy="afterInteractive" />
          </MotionProvider>
        </div>
      </body>
    </html>
  );
}
