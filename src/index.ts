import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { router } from './routes/router'

config()

const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(router)

server.listen(PORT, () => console.log(`server liestening on ${PORT}`))