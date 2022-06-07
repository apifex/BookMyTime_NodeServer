import env from '../utils/envLoader'
import { google } from 'googleapis'

const { EMAIL, KEY, KEYID, GEMAIL } = env;

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'];

export function gAuth () {
    const auth = new google.auth.JWT({
        keyId: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDxPjxejUh/uShC\nUH5xoVCWpzrPph2zmJyNUD1GUq+0mCsWJxvJ7OK45Kil/39J1vYB+HjS8DW3Sm3V\nA+0j6S7AO6pVbObcwyqySEmxeErnduKYAtdA3FPirDLdAnHMQmsvJtTmA/IVKi68\na++lv9JPFoKIP+syljP+OLE78Yj+tGgXqCKmquxWNOJd/uulwUO85pu2DSN42N3N\nC95MONf4WjQ5enrOLeVXZ9sKmLNeuM92Fx8ojXAbzySqmzycnllyB96mbRLQ21Cp\ncl951ZoudgZ3vpkKccpBwGbs4o97MuViCvka4xq10PHaWaYJK8VS3/E7dfQLtsza\nND3h/iRBAgMBAAECggEABlhrinXjQ9tHHR/shIEAi3bmeczh8/3yE7g6JV/yR9D3\nFKoGjcgTolb+3d9nneXH4p9CT9OSSSH9u7QyzA6TjIpBOaYfuCuwwz/aIt8x8q7G\niOatumK1OOWMQLKSU1PlqXfHMq3kw6RgdnOtGfYuwiZqnGp4fXQUleWwOT46Gw9v\nCPNZI5F0YwawmGiUWiEHTDNFBzx9xRUnnfIK1bRqBEEviY20iD22h4vjrSlGKbJg\nLn97lEon2CZ4x4aSXoGLOWSOhO74D1MFZMadDRyUVX+3XvkGLHXMOkyFoJ/XWixL\neD23iTQxDotlUgDcLMc0YK89szjAxi6b1Qhm6jX6QQKBgQD46B7VZlJxDB+jycfJ\n+F6uUyEbs+Q5qA9/DZmM0duMbworAZ/At/z+LvL3mXR6XLjsqhd6Cq9oe22Ut6rk\nezsrLJoTFULf2QxGPmMwgOBTRAUbQ+urZDirrHShxT07RqI057gQtDd0rrVX9EUX\nHHNF9xKouqE/8a+1k39L2Icq4QKBgQD4HjTCciWbEE1Oh2rucrudpjRKS0dPZxQi\nAKCQk2XBRzcP1nGK6l9iB0lQjPwdUL1+OFHxsBNhRUe5Gsn4dgzHpJvRYP6J6bwh\nFih2/kj1yBm1SzYCAavSw8duvRPQJtfu927G4xrhJTJvj6PxtVq4KSu9/0h8Fi8T\nGNH3zYCFYQKBgBzLzfVmVxdZDbgHOiP1pg6I84We9EJvXQuX6THPfZTrq8N59p93\nKb/GcrmOeVlGrOZEb17hKZXu4aiY7x5r21aNXG3kwc3f8HmX8iXEYy9+6RBUdUlo\n2N2ToBKvHPxkmZOBU1wrXVcUd0prqiqYUgXAJdp7bPhW37skC1AdBtZBAoGBAPKc\n/rP/z7vPdfhKvAnLUJ93zHu1HlaLEYmqGVclegNDMpke9EmEoZ4GR+8m3MOBlrkc\nMyxkIp8jkl1yz3lPXXG+CMr00BBk6BtmQk0QmqESd+jpUTcnES93VsR2yC/qO40k\nj0KVAUyUBbxGtWV9EucvAuG3BNapDoDa7T0kyf4hAoGAEdWxUhUMntgGGhN1dVb8\nunfuQwOMmiOo+6YzJ8Gul8gXqkz01bhcLgPhI1lEWXBl7/iVUOZ5JvB1dxEDD+DS\n8La2vlB2KIUEqKpCyljsUKPvflxXAWMqK4tDbZwH9TOG3rVmRFMQaSGPOCHWBWjP\ndO8Lf0hwGdrR/luXKhIQ6RM=\n-----END PRIVATE KEY-----\n",
        key: KEY,
        email: GEMAIL,
        scopes: SCOPES,
        subject: EMAIL
    })
    return auth
}