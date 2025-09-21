import { Attachment } from 'nodemailer/lib/mailer/index.js'
import { sendEmail } from 'utils/send-email.ts'

interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: Attachment[]
}

export class SendEmailUseCase {
  async execute({ to, subject, message, html, attachments }: SendEmailUseCaseRequest) {
    return await sendEmail({ to, subject, message, html, attachments })
  }
}