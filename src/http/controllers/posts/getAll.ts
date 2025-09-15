import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetAllPostsUseCase } from "../../../use-cases/factories/posts/make-getAll-use-case.ts";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const useCase = makeGetAllPostsUseCase();
    const { posts } = await useCase.execute();

    return reply.status(200).send(posts);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
