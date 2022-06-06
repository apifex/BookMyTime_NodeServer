import { config } from 'dotenv'

config()

const { EMAIL, PORT, KEY, KEYID, GEMAIL } = process.env

const env = { EMAIL, PORT, KEY, KEYID, GEMAIL }

export default env
