import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger/index.ts'
import { resetPasswordSchema } from '@http/schemas/users/reset-password-schema.ts'
import { InvalidTokenError } from 'use-cases/errors/invalid-token-error.ts';
import { makeResetPasswordUseCase } from 'use-cases/factories/users/make-reset-password-use-case.ts';

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { password, token } = resetPasswordSchema.parse(request.body)

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase()

    const { user } = await resetPasswordUseCase.execute({ password, token })

    logger.info({ userId: user.id }, 'Password changed successfully!')

    return reply.status(200).send({ message: 'Password changed successfully!' })
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}