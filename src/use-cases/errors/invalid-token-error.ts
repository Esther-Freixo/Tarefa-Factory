import { messages } from "@constants/messages.ts";

export class InvalidTokenError extends Error {
  constructor() {
    super(messages.errors.invalidToken)
  }
}