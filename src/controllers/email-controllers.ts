import { Response, Request, NextFunction } from 'express'
import { sendEmail } from '../services/gmail'
import { isValidEmailBody } from '../utils/validators'
import { errorHandler } from '../utils/errorHandler'

export function emailController(req: Request, res: Response,) {
    errorHandler(res, req, async () => {
        if (!isValidEmailBody(req.body)) throw new Error('Bad Request')
        const response = await sendEmail(req.body)
        res.status(200).send(response)
    })
}
