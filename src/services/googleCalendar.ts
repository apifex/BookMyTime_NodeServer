import { config } from 'dotenv'
import {google, calendar_v3} from 'googleapis'
import { gAuth } from './gAuth';

config()

const { EMAIL } = process.env

export async function googleCalendar (startTime: string, 
  endTime: string, userEmail: string = EMAIL): Promise<calendar_v3.Schema$TimePeriod[] | undefined> {
    try{
      const auth = gAuth()
      const calendar: calendar_v3.Calendar = google.calendar({version: 'v3', auth});
      const busy = await calendar.freebusy.query({
          requestBody: {
            "timeMin": startTime,
            "timeMax": endTime,
            "timeZone": "Europe/Paris",
            "items": [
              { "id": EMAIL }
            ],
          }
        })
      if (!busy.data.calendars) throw new Error()
      return busy.data.calendars[userEmail].busy
      //TODO 
    } catch(error) {
      return undefined
    }
    
}
