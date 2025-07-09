import { LunarHour, SolarTime, ChildLimit, Gender, EightChar } from "tyme4ts";

type BaziType = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    gender: Gender
}

export const calBazi = (birthTime: BaziType) => {
    const { year, month, day, hour, minute } = birthTime
    // 转农历
    const _solarTime = SolarTime.fromYmdHms(year, month, day, hour, minute, 0)
    const _lunar = _solarTime.getLunarHour();

    const e = LunarHour.fromYmdHms(
        _lunar.getYear(),
        _lunar.getMonth(),
        _lunar.getDay(),
        _lunar.getHour(),
        _lunar.getSecond(),
        0).getEightChar();


    return [
        e.getYear().getName(),
        e.getMonth().getName(),
        e.getDay().getName(),
        e.getHour().getName()
    ]
}

// 计算大运
export const calDecadeFortune = (bazi: [string, string, string, string], gender: Gender, bornYear: number) => {
    const [year, month, day, hour] = bazi
    const _solarTime = new EightChar(year, month, day, hour).getSolarTimes(bornYear, bornYear)[0];
    console.log(_solarTime);
    
    // 计算大运
    const childLimit = ChildLimit.fromSolarTime(_solarTime, gender)
    // 所有的大运
    const decadeFortune = Array.from({ length: 10 }).map((i, index) => {
        return childLimit.getStartDecadeFortune().next(index).getName()
    })
    // 每个大运起始和结束的年纪
    const decadeFortuneAge = Array.from({ length: 10 }).map((i, index) => {
        const decadeFortune = childLimit.getStartDecadeFortune().next(index)
        return [decadeFortune.getStartAge(), decadeFortune.getEndAge()]
    })
    // 每个大运起始和结束的年份
    const decadeFortuneSixtyCycleYear = Array.from({ length: 10 }).map((i, index) => {
        const decadeFortune = childLimit.getStartDecadeFortune().next(index)
        return [decadeFortune.getStartSixtyCycleYear(), decadeFortune.getEndSixtyCycleYear()]
    })
    // 获取每个大运十年的干支和六年
    const decadeFortuneTenGanZhiAndYear = Array.from({ length: 10 }).map((i, index) => {
        const decadeFortune = childLimit.getStartDecadeFortune().next(index)
        const decadeSixtyCycleYear = Array.from({ length: 10 }).map((i, index) => {
            const ganzhi = decadeFortune.getStartSixtyCycleYear().next(index).getName()
            const year = decadeFortune.getStartLunarYear().next(index).getYear()
            return [ganzhi, year]
        })
        return decadeSixtyCycleYear
    })
    return {
        decadeFortune,
        decadeFortuneAge,
        decadeFortuneSixtyCycleYear,
        decadeFortuneTenGanZhiAndYear
    }
}