
// import React from 'react'
// import { Avatar } from "@heroui/avatar";

// const BaziBadge = ({ bazi }: { bazi: string }) => {
//   // 根据八字生成生肖图标（示例）
//   const zodiac = bazi.includes('寅') ? '🐯' : bazi.includes('辰') ? '🐉' : '✨';

//   return (
//     <Avatar 
//       className="bg-gradient-to-br from-purple-500 to-cyan-400 w-20 h-20 text-3xl"
//       name={bazi} 
//       getInitials={() => zodiac}
//     />
//   );
// }

// export default BaziBadge

import { cn } from "@/lib/utils"

interface BaziBadgeProps {
  bazi: string
  zodiac?: string
  size?: "default" | "lg"
}

export function BaziBadge({ bazi, zodiac, size = "default" }: BaziBadgeProps) {
  // 根据八字生成生肖图标（示例）
  const zodiacMap: Record<string, string> = {
    寅: "🐯", 卯: "🐰", 辰: "🐉", 巳: "🐍",
    午: "🐴", 未: "🐑", 申: "🐵", 酉: "🐔",
    戌: "🐶", 亥: "🐷", 子: "🐭", 丑: "🐮"
  }

  const zodiacChar = zodiac || Object.entries(zodiacMap).find(([key]) =>
    bazi.includes(key)
  )?.[1] || "✨"

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg",
      size === "default" ? "w-14 h-14 text-2xl" : "w-20 h-20 text-4xl",
      "border-2 border-amber-400/30"
    )}>
      <span className="drop-shadow-md">{zodiacChar}</span>
    </div>
  );
}