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

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_APPLICATION_CREDENTIALS_PATH: string,
            EMAIL: string,
            PORT: Number
        }
    }
}

export { }