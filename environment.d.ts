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
}

export {}