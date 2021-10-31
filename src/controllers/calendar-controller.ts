import { Response, Request, NextFunction } from 'express'
import { checkGoogleCalendar } from '../utils/calendarUtils/checkGoogleCalendar'
import googleCalendar from '../services/googleCalendar'
import { isValidDate, isValidEvent } from '../utils/validators'

class CalendarController {
   checkCalendar = async (req: Request, res: Response, next: NextFunction) => {
      const { year, month } = req.body
      if (!isValidDate(year, month)) return next(new Error('Bad Request'))
      const response = await checkGoogleCalendar(year, month)
      if (response instanceof Error) return next(response)
      res.status(200).send(response)
   }

   addEvent = async (req: Request, res: Response, next: NextFunction) => {
      const { startTime, endTime, summary, description, attendees } = req.body
      if (!isValidEvent(startTime, endTime, summary, description, attendees)) return next(new Error('Bad Request'))
      const response = await googleCalendar.addEventToCalendar(startTime, endTime, summary, description, attendees)
      if (response instanceof Error) return next(response)
      res.status(200).send(response)
   }
}

export default new CalendarController