import type { Metadata } from "next";
import "./globals.css";
import WalletConnect from "@/components/WalletConnect"
import { ParticleBackground } from "@/components/particles/ParticleBackground";
import NavBar from "@/components/navbar/NavBar";

export const metadata: Metadata = {
  title: "SoulThread",
  description: "Record our story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased p-5`}
      >
        <ParticleBackground /> {/* 粒子背景组件 */}
        <WalletConnect>
          <NavBar />
          {children}
        </WalletConnect>
      </body>
    </html>
  );
}
