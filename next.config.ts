import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    /** 默认左下角「N」易与右下角聊天气泡混淆 */
    position: "top-right",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
