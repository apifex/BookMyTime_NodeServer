import { config } from 'dotenv'

config()

const { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL, PORT, KEY, KEYID, GEMAIL } = process.env

const env = { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL, PORT, KEY, KEYID, GEMAIL }

export default env
