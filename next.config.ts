import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', '@firebase/app', '@firebase/firestore'],
};

export default nextConfig;
