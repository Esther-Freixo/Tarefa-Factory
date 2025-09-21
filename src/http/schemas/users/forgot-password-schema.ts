import { z } from 'zod'
import { emailSchema } from '../utils/email.ts'
import { usernameSchema } from '../utils/username.ts'


export const forgotPasswordSchema = z.object({
  login: z.union([usernameSchema, emailSchema]),
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>