import express from 'express'

import { emailController } from '../controllers/email-controllers'

export const emailRouter = express.Router()

emailRouter.post('/email/send', emailController)
