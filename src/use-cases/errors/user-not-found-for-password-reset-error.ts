import { messages } from "@constants/messages.ts";

export class UserNotFoundForPasswordResetError extends Error {
  constructor() {
    super(messages.info.passwordResetGeneric)
  }
}