import express, {Response, Request, NextFunction} from 'express'
import { checkGoogleCalendar } from '../services/checkGoogleCalendar'

export async function checkCalendar (req: Request, res: Response, next: NextFunction) {
   const { year, month } = req.body
   const response = await checkGoogleCalendar(year, month)
   res.send(response)
}  

