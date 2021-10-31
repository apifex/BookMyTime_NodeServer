import express from 'express'

import CalendarController from '../controllers/calendar-controller'

export const calendarRouter = express.Router()

calendarRouter.get('/calendar/check', CalendarController.checkCalendar)

calendarRouter.post('/calendar/event', CalendarController.addEvent)
