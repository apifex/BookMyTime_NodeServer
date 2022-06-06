import { Response, Request, NextFunction } from 'express'
import { sendEmailApi } from '../services/gmail'
import { isValidEmailBody } from '../utils/validators'
import { errorHandler } from '../utils/errorHandler'

class EmailController {
    @errorHandler
    async sendEmail (req: Request, res: Response,) {
        if (!isValidEmailBody(req.body)) throw new Error('Bad Request')
        const response = await sendEmailApi(req.body)
        res.status(200).send(response)
    }   
}

export default new EmailController