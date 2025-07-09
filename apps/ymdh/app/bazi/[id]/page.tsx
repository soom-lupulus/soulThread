import { DestinyTimeline } from "@/components/destinytimeline/DestinyTimeline";
import { BaziHeader } from "@/components/baziheader/BaziHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import EveryOne from "@/components/everyone/EveryOne";

export default function BaziDetailPage({ params }: { params: { id: string } }) {
  const bazi = decodeURIComponent(params.id)
  // 示例数据
  const baziInfo = {
    id: params.id,
    bazi: "戊寅|癸亥|癸酉|己未",
    zodiac: "🐯",
    stories: [
      {
        id: "user1",
        name: "星辰旅人",
        events: [
          { year: 2010, event: "考入北京大学", tags: ["教育"] },
          { year: 2015, event: "创立科技公司", tags: ["事业"] },
          { year: 2020, event: "环游世界一年", tags: ["旅行"] }
        ]
      },
      {
        id: "user2",
        name: "时空画师",
        events: [
          { year: 2008, event: "美术学院毕业", tags: ["教育"] },
          { year: 2015, event: "作品国际展览", tags: ["成就"] },
          { year: 2022, event: "创办艺术学校", tags: ["事业"] }
        ]
      }
      // 更多用户...
    ],
    currentEvents: [
      { year: 2023, count: 3 },
      { year: 2024, count: 5 },
      { year: 2025, count: 2 }
    ]
  };

  return (
    <div className="relative min-h-screen">
      <div className="container relative z-10 py-12">
        <BaziHeader bazi={baziInfo.bazi} zodiac={baziInfo.zodiac} />
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">命运时间轴</h2>
            <EveryOne />
            <Button className="bg-amber-600 hover:bg-amber-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              添加我的故事
            </Button>
          </div>
          
          <DestinyTimeline 
            stories={baziInfo.stories} 
            currentEvents={baziInfo.currentEvents}
            bazi={bazi}
          />
        </div>
      </div>
    </div>
  );
}