import { config } from 'dotenv'
import {google } from 'googleapis'
import { gAuth } from './gAuth'

config()

interface IEmail {
  from: string,
  to: string,
  subject: string, 
  message: string,
}

const makeMailBody = ({to, from, subject, message}:IEmail) => {
    const str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');
    return Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
  }
  
export const sendEmail = async ( from: string, to: string, subject: string, message: string) => {
    try {
      const auth = gAuth()
      const encodedMail = makeMailBody({to, from, subject, message});
      const gmail = google.gmail({version: 'v1', auth});
      const sendMailResponse = await gmail.users.messages.send({
        auth,
        userId: 'me',
        requestBody: {
          raw: encodedMail
        },
      })
      return sendMailResponse.statusText
    } catch(error) {
      console.log("Error on sendMail in googleApi: ", error)
    }
  }