declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CREDENTIALS_PATH: string;
        TOKEN_PATH: string,
        MAIL_ADDRESS: string,
        PORT?: string,
        access_token: string,
        refresh_token: string,
        scope: string,
        token_type: string,
        expiry_date: number,
        client_id: string,
        client_secret: string,
        redirect_uris: string
      }
    }

    interface IPeriodsForMeetings {
      start: string,
      end: string,
      availble: boolean,
    }

    interface IDaysInMonth {
      id: number,
      date: string,
      dayOfWeek: number,
      availble: boolean,
      periodsForMeeting: IPeriodsForMeetings[],
    }

    interface IMonth {
      m: string,
      y: string,
      length: number,
    }

    interface IFreeBusy {
      "start": string,
      "end": string
    }

    interface IEvent {
      "summary": string,
      "description": string,
      "start": {
        "dateTime": string
      },
      "end": {
        "dateTime": string
      }
    }
    
    interface IMail {
      to: string,
      from: string,
      subject: string,
      message: string
    
    }
    
}



export {}