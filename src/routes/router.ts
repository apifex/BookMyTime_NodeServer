import express from 'express'
import { checkCalendar } from '../controllers/calendar-controller'
import { mailer } from '../controllers/email-controllers'

export const router = express.Router()

router.get('/checkcalendar', checkCalendar)

router.get('/sendemail', mailer)


