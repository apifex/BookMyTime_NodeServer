import env from '../utils/envLoader'
import { google, calendar_v3 } from 'googleapis'
import { gAuth } from './gAuth';

class googleCalendar {
  calendar: calendar_v3.Calendar
  EMAIL: string

  constructor() {
    const auth = gAuth()
    this.calendar = google.calendar({ version: 'v3', auth })
    this.EMAIL = env.EMAIL
  }

  async checkBusy(startTime: string, endTime: string, userEmail: string = this.EMAIL): Promise<calendar_v3.Schema$TimePeriod[] | undefined> {
    const busy = await this.calendar.freebusy.query({
      requestBody: {
        "timeMin": startTime,
        "timeMax": endTime,
        "timeZone": "Europe/Paris",
        "items": [
          { "id": this.EMAIL }
        ],
      }
    })
    if (!busy.data.calendars) throw new Error("Error on Google calendar request")
    return busy.data.calendars[userEmail].busy
  }

  async addEventToCalendar(startTime: string, endTime: string, summary: string, description: string, attendees: { email: string }[]):
    Promise<calendar_v3.Schema$Event> {
    const addEvent = await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        summary: summary,
        description: description,
        attendees: attendees
      }
    })
    return addEvent.data
  }
}

export default new googleCalendar