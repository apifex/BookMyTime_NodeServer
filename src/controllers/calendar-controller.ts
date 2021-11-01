import { Response, Request, NextFunction } from 'express'
import { checkGoogleCalendar } from '../utils/calendarUtils/checkGoogleCalendar'
import googleCalendar from '../services/googleCalendar'
import { isValidDate, isValidEvent } from '../utils/validators'
import { errorHandler } from '../utils/errorHandler'

class CalendarController {
   checkCalendar = (req: Request, res: Response) => errorHandler(res, req, async () => {
      const { year, month } = req.body
      if (!isValidDate(year, month)) throw new Error('Bad Request')
      const response = await checkGoogleCalendar(year, month)
      res.status(200).send(response)
   })

   addEvent = (req: Request, res: Response) => errorHandler(res, req, async () => {
      const { startTime, endTime, summary, description, attendees } = req.body
      if (!isValidEvent(startTime, endTime, summary, description, attendees)) throw new Error('Bad Request')
      const response = await googleCalendar.addEventToCalendar(startTime, endTime, summary, description, attendees)
      res.status(200).send(response)
   })
}

export default new CalendarController