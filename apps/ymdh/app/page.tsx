import { Button } from "@/components/ui/button";
import { calBazi } from '@/utils/bazi';
import Link from 'next/link'

export default function Home() {
  calBazi({
    year: 1998,
    month: 11,
    day: 22,
    hour: 14,
    minute: 30,
    gender: 1
  })
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold font-serif text-white drop-shadow-lg">
          星辰相同的灵魂终将相遇
        </h1>
        <Link href={{pathname: '/explore'}}>
          <Button className="mt-8 bg-amber-600 hover:bg-amber-700">
            开始探索
          </Button>
        </Link>
      </div>
    </div>
  );
}
