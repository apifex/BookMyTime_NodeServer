import { Response, Request, NextFunction } from 'express'
import { checkGoogleCalendar } from '../utils/calendarUtils/checkGoogleCalendar'
import googleCalendar from '../services/googleCalendar'
import { isValidDate, isValidEvent } from '../utils/validators'
import { TypedRequest } from '../types'
import { errorHandler } from '../utils/errorHandler'

class CalendarController {
  @errorHandler
  async checkCalendar(req: TypedRequest<{ year: string, month: string }, {}>, res: Response) {
    const { year, month } = req.query
    if (!isValidDate(year, month)) throw new Error('Bad Request')
    const response = await checkGoogleCalendar(year, (Number(month) + 1).toString())
    res.status(200).send(response)
  }
  @errorHandler
  async addEvent(req: TypedRequest<{}, { startTime: string, endTime: string, summary: string, description: string, attendees: { email: string }[] }>,
    res: Response) {
    const { startTime, endTime, summary, description, attendees } = req.body
    if (!isValidEvent(startTime, endTime, summary, description, attendees)) throw new Error('Bad Request')
    const response = await googleCalendar.addEventToCalendar(startTime, endTime, summary, description, attendees)
    res.status(200).send(response)
  }
}

export default new CalendarController
