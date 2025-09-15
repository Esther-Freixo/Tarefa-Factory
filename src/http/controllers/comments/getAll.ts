import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetAllCommentsUseCase } from "../../../use-cases/factories/comments/make-getAll-use-case.ts";

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
  try {
    const useCase = makeGetAllCommentsUseCase();
    const { comments } = await useCase.execute();

    return reply.status(200).send(comments);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Nenhum comentário encontrado." });
    }
    throw error;
  }
}
