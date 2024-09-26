import { type Transporter, createTransport } from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { env } from "../env"

interface SendMailData {
  to: {
    name: string
    email: string
  }
  subject: string
  body: string
  html?: string
}

export class MailProvider {
  private transport: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.transport = createTransport({
      host: env.MAILER_HOST,
      port: env.MAILER_PORT,
      secure: env.MAILER_HOST === "465",
      auth: {
        user: env.MAILER_SENDER_EMAIL,
        pass: env.MAILER_SENDER_PASS,
      },
    })
  }

  send({ to, subject, body, html }: SendMailData) {
    this.transport.sendMail({
      from: {
        name: "Marshmallow Watch",
        address: env.MAILER_SENDER_EMAIL,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: body,
      html,
    })
  }
}
