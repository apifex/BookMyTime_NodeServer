import express from 'express'
import cors from 'cors'
import env from './utils/envLoader'
import { calendarRouter } from './routes/calendar-router'
import { emailRouter } from './routes/email-router'
import { errorsHandler } from './utils/errorHandler'

//initialise server

const server = express()
const PORT = env.PORT || 3000

server.use(express.json())
server.use(cors())


//configure routes
server.use(calendarRouter, errorsHandler)
server.use(emailRouter, errorsHandler)

server.listen(PORT, () => console.log(`server liestening on ${PORT}`))




// spróbować z nest