import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error.ts'
import { makeDeleteLikeUseCase } from '../../../use-cases/factories/likes/make-delete-use-case.ts'

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    likeId: z.string().uuid(),
  })

  const { likeId } = getParamsSchema.parse(request.params)
  const userId = request.user.sub

  try {
    const deleteLikeUseCase = makeDeleteLikeUseCase()
    const like = await deleteLikeUseCase.execute({ likeId, userId })

    return reply.status(204).send(like)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof Error && error.message === 'PERMISSION_DENIED') {
      return reply
        .status(403)
        .send({ message: 'Permissão para deletar este like negada.' })
    }

    throw error
  }
}
