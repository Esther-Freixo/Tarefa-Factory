import { z } from 'zod'

export const publicIdSchema = z.object({
  publicId: z.uuid(),
})

export type publicIdSchemaType = z.infer<typeof publicIdSchema>