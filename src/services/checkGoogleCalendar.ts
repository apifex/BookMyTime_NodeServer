import dayjs from 'dayjs'
import { googleCalendar } from './googleCalendar'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

interface IPeriodsForMeetings {
    start: string,
    end: string,
    availble: boolean,
}

interface IDaysInMonth {
    id: number,
    date: string,
    dayOfWeek: number,
    availble: boolean,
    periodsForMeeting: IPeriodsForMeetings[],
}

export async function checkGoogleCalendar(year: string, month: string) {
    const monthLength = dayjs(`${year}-${month}-01`).daysInMonth()
    const today = dayjs()
    const todayStr = today.format()
    const isSameMonth = today.month() == Number(month)
    const startDateString = isSameMonth?todayStr:dayjs(`${year}-${month}-01`).format()
    const endDateString = startDateString.substr(0, 8) + String(monthLength) + startDateString.substr(10, startDateString.length)
    const busy = await googleCalendar(startDateString, endDateString)
    
    const daysInMonth: IDaysInMonth[] = []

    dayjs.extend(isSameOrAfter)

    for (let i = 1; i <= monthLength; i++) {
        const dayStr = `${year}-${month}-${i}`
        const availble = dayjs(dayStr).isSameOrAfter(today, 'day')
        daysInMonth.push({
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
                {
                    start: `12:00`,
                    end: `12:55`,
                    availble,
                },
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

    function checkDay(dayIndex: number, el: { start: string, end: string }) {
        let totalFalse = 0
        daysInMonth[dayIndex].periodsForMeeting.map(hour => {
            if (hour.start.substr(0, 2) == el.start.substr(11, 2) &&
                hour.start.substr(3, 2) <= el.start.substr(14, 2)) { hour.availble = false; totalFalse++ }
            if (hour.start > el.start.substr(11, 5) &&
                hour.end < el.end.substr(11, 5)) { hour.availble = false; totalFalse++ }
            if (hour.end.substr(0, 2) == el.end.substr(11, 2) &&
                hour.end.substr(3, 2) >= el.end.substr(14, 2)) { hour.availble = false; totalFalse++ }
            if (totalFalse == daysInMonth[dayIndex].periodsForMeeting.length) daysInMonth[dayIndex].availble = false
        }
        )
    }
    

    if (busy) {
        busy.push({start: todayStr.substr(0, 11) + '01' + todayStr.substr(13, todayStr.length), end: todayStr})
        busy.forEach(el => {
            if (!el.start || !el.end) return
            const dayIndex = Number(el.start.substr(8, 2)) - 1
            if (el.start.substr(8, 2) == el.end.substr(8, 2)) {
                checkDay(dayIndex, { start: el.start, end: el.end })
            } else {
                const difference = Number(el.end.substr(8, 2)) - Number(el.start.substr(8, 2))
                const dayEndIndex = dayIndex + difference
                const startDayEndString = el.start.substr(0, 11) + '23' + (el.start.substr(13, el.start.length))
                const endDayStartString = el.end.substr(0, 11) + '01' + (el.start.substr(13, el.start.length))
                checkDay(dayIndex, { start: el.start, end: startDayEndString })
                checkDay(dayEndIndex, { start: endDayStartString, end: el.end })
                if (difference >= 1) {
                    for (let i = 1; i <= difference; i++) {
                        daysInMonth[dayIndex + i].availble = false
                    }
                }
            }
        }
        )
    }
    return daysInMonth
}