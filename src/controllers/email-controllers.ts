import { Response, Request, NextFunction } from 'express'
import { sendEmail } from '../services/gmail'
import { isValidEmailBody } from '../utils/validators'

export async function emailController(req: Request, res: Response, next: NextFunction) {
    if (!isValidEmailBody(req.body)) return next(new Error('Bad Request'))
    const response = await sendEmail(req.body)
    res.status(200).send(response)
}

