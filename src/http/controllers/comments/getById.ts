import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetCommentByIdUseCase } from "../../../use-cases/factories/comments/make-get-commentId-use-case.ts";

export async function getCommentById(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };

  try {
    const useCase = makeGetCommentByIdUseCase();
    const { comment } = await useCase.execute({ commentId });

    return reply.status(200).send(comment);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Comentário não encontrado." });
    }
    throw error;
  }
}
