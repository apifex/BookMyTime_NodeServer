import { IEmail } from "../types"

export const isValidEmailBody = (body: IEmail) => {
    const { from, to, subject, eventDetails } = body
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const iso8601Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i
    const isFromEmail = emailRegex.test(from)   
    const isToEmail = emailRegex.test(to)
    const isSubjectString = subject ? typeof (subject) == 'string' : true
    const isStartTimeString = eventDetails.start.length >= 16 && iso8601Regex.test(eventDetails.start) && new Date(eventDetails.start).toString() != 'Invalid Date'
    const isEndTimeString = eventDetails.end.length >= 16 && iso8601Regex.test(eventDetails.end) && new Date(eventDetails.end).toString() != 'Invalid Date'
    const isGuestNameString = eventDetails.guestName ? typeof (eventDetails.guestName) == 'string' : true
    const isSummaryString = eventDetails.summary ? typeof (eventDetails.summary) == 'string' : true
    const isLocationString = eventDetails.location ? typeof (eventDetails.location) == 'string' : true
    return isFromEmail && isToEmail && isSubjectString && isStartTimeString && isEndTimeString && isGuestNameString && isSummaryString && isLocationString
}

export const isValidDate = (year: unknown, month: unknown): boolean => {
    const isString = typeof year === 'string' && typeof month === 'string'
    if (!isString) return false
    const numeric = /[0-9]/
    return !!year && !!month && numeric.test(year) && numeric.test(month) &&
       Number(month) >= 0 && Number(month) <= 11 && Number(year) > 2010
 }
 
export const isValidEvent = (startTime: string, endTime: string, summary?: string, description?: string, attendees?: { 'email': string }[]) => {
    const iso8601Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i
    const isStartTimeString = startTime.length >= 16 && iso8601Regex.test(startTime) && new Date(startTime).toString() != 'Invalid Date'
    const isEndTimeString = endTime.length >= 16 && iso8601Regex.test(endTime) && new Date(endTime).toString() != 'Invalid Date'
    const isDescriptionString = description ? typeof (description) == 'string' : true
    const isSummaryString = summary ? typeof (summary) == 'string' : true
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isArrayWithMails = attendees ? attendees.reduce<boolean>((acc: boolean, curent: { 'email': string }) => ((acc == true) && emailRegex.test(curent.email)), true) : true
    return !!startTime && !!endTime && isStartTimeString && isEndTimeString && isDescriptionString && isSummaryString && isArrayWithMails
 }

 // uzyc biblioteki 