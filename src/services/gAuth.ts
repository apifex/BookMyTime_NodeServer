import env from '../utils/envLoader'
import { google } from 'googleapis'

const { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL, KEY, KEYID, GEMAIL } = env;

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'];

export function gAuth () {
    console.log(GOOGLE_APPLICATION_CREDENTIALS_PATH)
    const auth = new google.auth.JWT({
        keyId: KEYID,
        key: KEY,
        email: GEMAIL,
        scopes: SCOPES,
        subject: EMAIL
    })
    return auth
}