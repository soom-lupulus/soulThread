'use client'
import { Chrono } from 'react-chrono';
import { calDecadeFortune } from '@/utils/bazi'

export function DestinyTimeline({ bazi }: { bazi: string }) {
  const baziArr = bazi.split(' ') as [string, string, string, string]
  const { decadeFortune, decadeFortuneAge, decadeFortuneTenGanZhiAndYear } = calDecadeFortune(baziArr, 1, 1998)
  console.log(decadeFortuneTenGanZhiAndYear);
  console.log(decadeFortune);
  
  const timelineItems1 = decadeFortuneTenGanZhiAndYear.flatMap((decade, index) => {
    decade.unshift([decadeFortune[index]])
    return decade.map((year, idx) => {
      return {
        title: `${year}`,
        // cardTitle: "星辰旅人",
      }
    })
    
  })
  console.log(timelineItems1);
  
  // const timelineItems = decadeFortune.map((item, index) => {
  //   return {
  //     title: item + `(${decadeFortuneAge[index][0]}~${decadeFortuneAge[index][1]})`,
  //     cardTitle: "星辰旅人",
  //     cardSubtitle: "创办艺术学校",
  //     cardDetailedText: "在云南大理建立面向乡村儿童的艺术教育中心",
  //     icon: { child: "🐯" },
  //   }
  // })
  const customContent = [
    <div key="card1">
      <h3>Custom Card 1</h3>
      <p>This is the first custom card with unique content.</p>
    </div>,
    <div key="card2">
      <h3>Custom Card 2</h3>
      <p>This is the second custom card, also uniquely rendered.</p>
    </div>,
  ];
  return (
    <div className="relative">
      <div className="relative z-10">
        <Chrono
          items={timelineItems1}
          mode="VERTICAL"
          disableToolbar
          theme={{
            primary: "#f59e0b",
            secondary: "transparent",
            cardBgColor: "rgba(15, 23, 42, 0.7)",
            cardForeColor: "white",
            titleColor: "#f59e0b"
          }}
          cardHeight={200}
          classNames={{
            card: 'backdrop-blur-md border border-amber-500/20',
            title: 'text-amber-400'
          }}
        >
        </Chrono>
      </div>
    </div>
  );
}