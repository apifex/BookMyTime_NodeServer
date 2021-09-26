interface token {
    access_token: string,
    refresh_token: string,
    scope: string,
    token_type: string,
    expiry_date: number
}

interface IMail {
    from: string,
    to: string,
    subject: string, 
    message: string,
}

declare global{
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_APPLICATION_CREDENTIALS: string,
            EMAIL: string,
            PORT: Number
        }
    }
}



export {}