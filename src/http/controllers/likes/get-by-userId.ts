import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetLikeUseCase } from "../../../use-cases/factories/likes/make-allUsers-use-case.ts";

export async function getLikesByUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as { userId: string };

  const useCase = makeGetLikeUseCase();
  const result = await useCase.execute();

  return reply.status(200).send(result);
}
