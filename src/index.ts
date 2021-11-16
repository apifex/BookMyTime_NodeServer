import express, {Express} from 'express'
import cors from 'cors'
import env from './utils/envLoader'
import { calendarRouter } from './routes/calendar-router'
import { emailRouter } from './routes/email-router'

function initializeServer (server: Express) {
    server.use(express.json())
    server.use(cors())
}

function configureRoutes (server: Express) {
    server.use(calendarRouter)
    server.use(emailRouter)
}

function startServer () {
    const server = express()
    const PORT = env.PORT || 4000
    initializeServer(server)
    configureRoutes(server)
    server.listen(PORT, () => console.log(`server liestening on ${PORT}`))
}

startServer()


// spróbować z nest