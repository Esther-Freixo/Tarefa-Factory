import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetLikeUseCase } from "../../../use-cases/factories/likes/make-allUsers-use-case.ts";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getLikeUseCase = makeGetLikeUseCase();
    const likes = await getLikeUseCase.execute();

    return reply.status(200).send(likes);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
