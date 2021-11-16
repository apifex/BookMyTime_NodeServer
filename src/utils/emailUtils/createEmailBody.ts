import mjml2html from 'mjml'
import dayjs from 'dayjs'
import updateLocal from 'dayjs/plugin/updateLocale'
import MailComposer from 'nodemailer/lib/mail-composer'
import { createICS } from './createCalendarICS'
dayjs.extend(updateLocal)
dayjs.updateLocale('en', {
    months: [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ],
    weekdays: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ]
})

import { IEmail } from '../../types'

export async function createMailBody({ to, from, subject, eventDetails }: IEmail): Promise<string> {
  const calendarICS = createICS(eventDetails)
  const eventDate = dayjs(eventDetails.start)
  const displayDate = eventDate.format('DD MMMM YYYY')
  const displayTime = eventDate.format('HH:mm')
  const htmlContent = mjml2html(`
      <mjml>
        <mj-head>
          <mj-attributes>
            <mj-all padding="0px"></mj-all>
            <mj-text font-family="Ubuntu, Helvetica, Arial, sans-serif" padding="0 2px" font-size="13px"></mj-text>
            <mj-section background-color="#ffffff"></mj-section>
            <mj-class name="preheader" color="#000000" font-size="11px"></mj-class>
          </mj-attributes>
          <mj-style inline="inline">a { text-decoration: none!important; color: inherit!important; }</mj-style>
        </mj-head>
        <mj-body background-color="#bedae6">
          <mj-section>
            <mj-column width="100%">
              <mj-image src="https://cdn.pixabay.com/photo/2019/02/18/01/11/bees-4003580_960_720.jpg" alt="header image" padding="0px"></mj-image>
            </mj-column>
          </mj-section>
          <mj-section padding-bottom="20px" padding-top="10px">
            <mj-column>
              <mj-text align="center" padding="10px 25px" font-size="20px" color="#512d0b"><strong>Hey ${eventDetails.guestName}!</strong></mj-text>
              <mj-text align="center" font-size="18px" font-family="Arial">Your meeting have been confirmed.<br/></mj-text>
              <mj-text align="center" color="#489BDA" font-size="25px" font-family="Arial, sans-serif" font-weight="bold" line-height="35px" padding-top="20px">We are waiting for you on ${displayDate}<br/>at ${displayTime}<br/>
                <span style="font-size:18px">Location: <a href="maps.google.com">${eventDetails.location}</a></span></mj-text>
              <mj-text align="center" color="#000000" font-size="14px" font-family="Arial, sans-serif" padding-top="40px">Best, <br /> The Apifex Team
                <p></p>
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
      `)

  const mail = new MailComposer({
    from: from,
    to: to,
    subject: subject,
    html: htmlContent.html,
    icalEvent: calendarICS
  })

  const emailBody = await mail.compile().build()

  return emailBody.toString('base64')
}