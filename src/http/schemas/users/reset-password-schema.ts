import { z } from 'zod'
import { passwordSchema } from '../utils/password.ts'

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  token: z.string(),
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>