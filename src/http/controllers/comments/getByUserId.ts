import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetCommentsByUserUseCase } from "../../../use-cases/factories/comments/make-userId-use-case.ts";

export async function getCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as { userId: string };

  try {
    const useCase = makeGetCommentsByUserUseCase();
    const { comments } = await useCase.execute({ userId });

    return reply.status(200).send(comments);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Nenhum comentário encontrado para este usuário." });
    }
    throw error;
  }
}
