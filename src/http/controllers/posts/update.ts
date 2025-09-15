import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { makeUpdatePostUseCase } from "../../../use-cases/factories/posts/make-update-use-case.ts"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts"

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })

  const bodySchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  })

  const { postId } = paramsSchema.parse(request.params)
  const { title, content } = bodySchema.parse(request.body)
  const userId = request.user.sub

  try {
    const useCase = makeUpdatePostUseCase()
    const { post } = await useCase.execute({
      postId,
      userId,
      data: { title, content },
    })

    return reply.status(200).send(post)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof Error && error.message === "PERMISSION_DENIED") {
      return reply.status(403).send({ message: "Permissão negada." })
    }

    throw error
  }
}
