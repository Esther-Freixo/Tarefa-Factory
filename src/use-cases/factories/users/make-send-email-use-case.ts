import { SendEmailUseCase } from "use-cases/messaging/send-email.ts";

export function makeSendEmailUseCase() {
  return new SendEmailUseCase()
}