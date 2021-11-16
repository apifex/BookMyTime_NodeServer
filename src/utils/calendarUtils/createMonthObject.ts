import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { IMonthObject } from '../../types'

export function createMonthObject(year: string, month: string, monthLength: number, today: dayjs.Dayjs): IMonthObject[] {
    dayjs.extend(isSameOrAfter)
    const monthObject: IMonthObject[] = []
    for (let i = 1; i <= monthLength; i++) {
        const dayStr = `${year}-${month}-${i}`
        const availble = dayjs(dayStr).isSameOrAfter(today, 'day')
        monthObject.push({
            id: i,
            date: dayStr,
            dayOfWeek: dayjs(dayStr).day(),
            availble,
            periodsForMeeting: [
                {
                    start: `08:00`,
                    end: `08:55`,
                    availble,
                },
                {
                    start: `09:00`,
                    end: `09:55`,
                    availble,
                },
                {
                    start: `10:00`,
                    end: `10:55`,
                    availble,
                },
                {
                    start: `11:00`,
                    end: `11:55`,
                    availble,
                },
                // {
                //     start: `12:00`,
                //     end: `12:55`,
                //     availble,
                // },
                {
                    start: `13:00`,
                    end: `13:55`,
                    availble,
                },
                {
                    start: `14:00`,
                    end: `14:55`,
                    availble,
                },
                {
                    start: `15:00`,
                    end: `15:55`,
                    availble,
                },
                {
                    start: `16:00`,
                    end: `16:55`,
                    availble,
                },
                {
                    start: `17:00`,
                    end: `17:55`,
                    availble,
                }
            ]
        })
    }
    return monthObject
}