import { config } from 'dotenv'

config()

const { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL, PORT } = process.env

const env = { GOOGLE_APPLICATION_CREDENTIALS_PATH, EMAIL, PORT }

export default env
