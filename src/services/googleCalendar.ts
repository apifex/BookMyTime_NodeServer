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

  async checkBusy(startTime: string, endTime: string, userEmail: string = this.EMAIL): Promise<calendar_v3.Schema$TimePeriod[] | undefined | Error> {
    try {
      console.log('second check')
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
    } catch (error) {
      if (error instanceof Error) return error
    }
  }

  async addEventToCalendar(startTime: string, endTime: string, summary: string, description: string, attendees: { email: string }[]):
    Promise<calendar_v3.Schema$Event | Error> {
    try {
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
    } catch (error) {
      if (error instanceof Error) return error
      //ASK!
      return new Error('Error on AddEvent function')
    }
  }
}

export default new googleCalendar