import env from '../utils/envLoader'
import { google } from 'googleapis'

const { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL } = env;

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'];

export function gAuth () {
    const auth = new google.auth.JWT({
        keyFile: GOOGLE_APPLICATION_CREDENTIALS_PATH,
        scopes: SCOPES,
        subject: EMAIL
    })
    return auth
}