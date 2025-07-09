import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BaziBadge } from "@/components/SbtBadge";

export function BaziGrid({ baziData }: { baziData: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {baziData.map((item) => (
        <Link key={item.id} href={`/bazi/${item.bazi}`}>
          <Card className="bg-white/10 backdrop-blur-md border border-gray-700 hover:border-amber-500 transition-all hover:scale-[1.02]">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-xl font-medium text-white">
                {item.bazi.split(' ').join(' ')}
              </CardTitle>
              <BaziBadge bazi={item.bazi} zodiac={item.zodiac} />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-gray-300">
                <span>{item.zodiac} 生肖</span>
                <span className="text-amber-400">
                  {item.count} 个灵魂故事
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}