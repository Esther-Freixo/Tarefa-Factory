import { FastifyRequest, FastifyReply } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetCommentsByPostUseCase } from "../../../use-cases/factories/comments/make-get-PostId-use-case.ts";

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };

  try {
    const useCase = makeGetCommentsByPostUseCase();
    const { comments } = await useCase.execute({ postId });

    return reply.status(200).send(comments);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Nenhum comentário encontrado para este post." });
    }
    throw error;
  }
}
