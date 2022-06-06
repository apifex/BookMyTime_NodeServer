import { Request, Response } from 'express'
import { Query, Params } from 'express-serve-static-core'

export interface IMonthObject {
    id: number,
    date: string,
    dayOfWeek: number,
    availble: boolean,
    periodsForMeeting:
    {
        start: string,
        end: string,
        availble: boolean
    }[],
}

export interface IEmail {
    from: string,
    to: string,
    subject: string,
    eventDetails: {
        guestName: string,
        start: string,
        end: string,
        summary: string,
        location: string,
    },
}

export interface TypedRequest<T extends Query, U> extends Request {
    query: T,
    body: U
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_APPLICATION_CREDENTIALS_PATH: string,
            EMAIL: string,
            PORT: Number,
            GEMAIL: string,
            KEYID: string,
            KEY: string
        }
    }
}



export { }