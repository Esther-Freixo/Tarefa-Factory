import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeUpdateCommentUseCase } from "../../../use-cases/factories/comments/make-update-use-case.ts";

export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };
  const userId = request.user.sub;

  const schema = z.object({
    content: z.string(),
  });

  const { content } = schema.parse(request.body);

  try {
    const useCase = makeUpdateCommentUseCase();
    const { comment } = await useCase.execute({ commentId, userId, content });

    return reply.status(200).send(comment);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Comentário não encontrado." });
    }

    if (error instanceof Error && error.message === "PERMISSION_DENIED") {
      return reply.status(403).send({ message: "Você não tem permissão para atualizar este comentário." });
    }

    throw error;
  }
}
