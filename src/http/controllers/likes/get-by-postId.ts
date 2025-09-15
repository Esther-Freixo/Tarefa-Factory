import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetLikesByPostUseCase } from "../../../use-cases/factories/likes/make-postId-use-case.ts";

export async function getLikesByPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };

  const useCase = makeGetLikesByPostUseCase();
  const result = await useCase.execute({ postId });

  return reply.status(200).send(result);
}
