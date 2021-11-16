import express from 'express'

import EmailController from '../controllers/email-controllers'

export const emailRouter = express.Router()

emailRouter.post('/email/send', EmailController.sendEmail)
