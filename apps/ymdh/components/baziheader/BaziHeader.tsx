import { BaziBadge } from "@/components/SbtBadge"

export function BaziHeader({ bazi, zodiac }: { bazi: string, zodiac: string }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4 md:mb-0">
                <BaziBadge bazi={bazi} zodiac={zodiac} size="lg" />
                <div className="ml-6">
                    <h1 className="text-3xl font-bold text-white">
                        {bazi.split('|').join(' ')}
                    </h1>
                    <p className="text-gray-300 mt-2">
                        共有 <span className="text-amber-400">12</span> 位相似灵魂在此分享人生
                    </p>
                </div>
            </div>

            <div className="text-center">
                <div className="inline-block bg-amber-900/30 px-4 py-2 rounded-full">
                    <p className="text-amber-400 font-mono">当前大运: 2023-2033</p>
                </div>
            </div>
        </div>
    );
}