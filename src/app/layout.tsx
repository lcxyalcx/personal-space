import type { Metadata } from "next";
import Script from "next/script";
import { MotionProvider } from "@/components/motion-provider";
import { siteMeta } from "@/data/site";
import "./globals.css";

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
  return (
    <html lang="zh-CN" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-bg font-sans text-fg">
        <MotionProvider>
          {children}
          <div id="custom-cursor-portal" aria-hidden="true" />
          <Script src="/custom-cursor.js" strategy="afterInteractive" />
        </MotionProvider>
      </body>
    </html>
  );
}
