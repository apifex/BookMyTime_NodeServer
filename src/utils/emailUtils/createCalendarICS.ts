import env from '../envLoader'
import { IEmail } from '../../types'

export function createICS(event: IEmail["eventDetails"]): string {
    const start = event.start.replace(/[^0-9A-T]/g, '').slice(0, 15) + "Z"
    const end = event.end.replace(/[^0-9A-T]/g, '').slice(0, 15) + "Z"
    const ics =
        `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apifex Company//NONSGML HandCal//EN
BEGIN:VEVENT
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.summary}
LOCATION:${event.location}
ORGANIZER:MAILTO:${env.EMAIL}
END:VEVENT
END:VCALENDAR`

    return ics
}