import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetByCommentIdUseCase } from "../../../use-cases/factories/likes/make-commentId-use-case.ts";

export async function getLikesByComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };

  const useCase = makeGetByCommentIdUseCase();
  const likes = await useCase.execute({ commentId });

  return reply.status(200).send(likes);
}
