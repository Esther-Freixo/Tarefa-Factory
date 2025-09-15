import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeDeletePostUseCase } from "../../../use-cases/factories/posts/make-delete-use-case.ts";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const { postId } = getParamsSchema.parse(request.params);
  const userId = request.user.sub;

  try {
    const useCase = makeDeletePostUseCase();
    await useCase.execute({ postId, userId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof Error && error.message === "PERMISSION_DENIED") {
      return reply.status(403).send({ message: "Permissão para deletar este post negada." });
    }

    throw error;
  }
}
