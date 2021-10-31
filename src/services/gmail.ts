import { google } from 'googleapis'
import { gAuth } from './gAuth'
import { createMailBody } from '../utils/emailUtils/createEmailBody'

import { IEmail } from '../types'

export async function sendEmail({ from, to, subject, eventDetails }: IEmail): Promise<string | Error> {
  try {
    const auth = gAuth()
    const encodedMail = await createMailBody({ from, to, subject, eventDetails });
    const gmail = google.gmail({ version: 'v1', auth });
    const sendMailResponse = await gmail.users.messages.send({
      auth,
      userId: 'me',
      requestBody: {
        raw: encodedMail
      },
    })
    return sendMailResponse.statusText
  } catch (error) {
    if (error instanceof Error) return error
    return new Error('Error on sendEmail function')
  }
}


