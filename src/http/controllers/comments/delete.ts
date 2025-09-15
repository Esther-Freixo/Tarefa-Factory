import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeDeleteCommentUseCase } from "../../../use-cases/factories/comments/make-delete-use-case.ts";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };
  const userId = request.user.sub;

  try {
    const useCase = makeDeleteCommentUseCase();
    await useCase.execute({ commentId, userId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Comentário não encontrado." });
    }

    if (error instanceof Error && error.message === "PERMISSION_DENIED") {
      return reply.status(403).send({ message: "Você não tem permissão para deletar este comentário." });
    }

    throw error;
  }
}
