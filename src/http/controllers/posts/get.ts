import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetPostUseCase } from "../../../use-cases/factories/posts/make-postId-use-case.ts";

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const { postId } = getParamsSchema.parse(request.params);

  try {
    const useCase = makeGetPostUseCase();
    const { post } = await useCase.execute({ postId });

    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
