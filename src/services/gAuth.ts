import { config } from 'dotenv'
import { google } from 'googleapis'

config()

const { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL } = process.env;
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'];

export function gAuth () {
    const auth = new google.auth.JWT({
        keyFile: GOOGLE_APPLICATION_CREDENTIALS_PATH,
        scopes: SCOPES,
        subject: EMAIL
    })
    return auth
}