import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BaziGrid } from "@/components/bazigrid/BaziGrid";

// 八字数据示例
const baziData = [
  { id: "1", bazi: "戊寅 癸亥 癸酉 己未", count: 12, zodiac: "🐯" },
  { id: "2", bazi: "辛丑 壬寅 庚子 戊申", count: 8, zodiac: "🐂" },
  { id: "3", bazi: "庚子 己亥 戊戌 丁酉", count: 5, zodiac: "🐭" },
  // 更多数据...
];

export default function ExplorePage() {
  return (
    <div className="relative min-h-screen">
      <div className="container relative z-10 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
            星辰命运共同体
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            探索与你生辰交织的灵魂故事，在时间的长河中寻找共鸣
          </p>
        </div>

        <BaziGrid baziData={baziData} />
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            每一个八字都是宇宙中的独特频率，等待与相似的灵魂共振
          </p>
        </div>
      </div>
    </div>
  );
}