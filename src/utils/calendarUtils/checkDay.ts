import { IMonthObject } from "../../types";

export function checkDay(monthObject: IMonthObject[], dayIndex: number, el: { start: string, end: string }): void {
    let totalFalse = 0
    monthObject[dayIndex].periodsForMeeting.map(period => {
        if (period.start.substr(0, 2) == el.start.substr(11, 2) &&
            period.start.substr(3, 2) <= el.start.substr(14, 2)) { period.availble = false; totalFalse++ }
        if (period.start > el.start.substr(11, 5) &&
            period.end < el.end.substr(11, 5)) { period.availble = false; totalFalse++ }
        if (period.end.substr(0, 2) == el.end.substr(11, 2) &&
            period.end.substr(3, 2) >= el.end.substr(14, 2)) { period.availble = false; totalFalse++ }
        if (totalFalse == monthObject[dayIndex].periodsForMeeting.length) monthObject[dayIndex].availble = false
    }
    )
}
