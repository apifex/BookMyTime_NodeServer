import express, {Response, Request, NextFunction} from 'express'
import { sendEmail } from '../services/gmail'

export async function mailer (req: Request, res: Response, next: NextFunction) {
    const { from, to, subject, message } = req.body
   const response = await sendEmail (from, to, subject, message)
   console.log('email', response)
   res.send(response)
}  

