import dayjs from 'dayjs'
import googleCalendarActions from '../../services/googleCalendar'
import { createMonthObject } from './createMonthObject'
import { checkDay } from './checkDay'

export async function checkGoogleCalendar(year: string, month: string) {
    const monthLength = dayjs(`${year}-${month}-01`).daysInMonth()
    const today = dayjs()
    const todayStr = today.format()
    const isSameMonth = today.month() == Number(month)

    const startDateString = isSameMonth ? todayStr : dayjs(`${year}-${month}-01`).format()
    const endDateString = startDateString.substr(0, 8) + String(monthLength) + startDateString.substr(10, startDateString.length)

    const busy = await googleCalendarActions.checkBusy(startDateString, endDateString)

    const monthObject = createMonthObject(year, month, monthLength, today)

    if (busy) {
        busy.push({ start: todayStr.substr(0, 11) + '01' + todayStr.substr(13, todayStr.length), end: todayStr })
        busy.forEach(el => {
            if (!el.start || !el.end) return
            const dayIndex = Number(el.start.substr(8, 2)) - 1
            if (el.start.substr(8, 2) == el.end.substr(8, 2)) {
                checkDay(monthObject, dayIndex, { start: el.start, end: el.end })
            } else {
                const difference = Number(el.end.substr(8, 2)) - Number(el.start.substr(8, 2))
                const dayEndIndex = dayIndex + difference
                const startDayEndString = el.start.substr(0, 11) + '23' + (el.start.substr(13, el.start.length))
                const endDayStartString = el.end.substr(0, 11) + '01' + (el.start.substr(13, el.start.length))
                checkDay(monthObject, dayIndex, { start: el.start, end: startDayEndString })
                checkDay(monthObject, dayEndIndex, { start: endDayStartString, end: el.end })
                if (difference >= 1) {
                    for (let i = 0; i < difference; i++) {
                        monthObject[dayIndex + i].availble = false
                    }
                }
            }
        }
        )
    }
    return monthObject
}