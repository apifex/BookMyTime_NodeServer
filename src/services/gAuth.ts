import env from '../utils/envLoader'
import { google } from 'googleapis'

const { EMAIL, KEY, KEYID, GEMAIL } = env;

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'];

export function gAuth () {
    const auth = new google.auth.JWT({
        keyId: KEYID,
        key: KEY.replace(/\\n/gm, '\n'),
        email: GEMAIL,
        scopes: SCOPES,
        subject: EMAIL
    })
    return auth
}