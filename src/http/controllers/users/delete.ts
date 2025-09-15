import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeDeleteUseCase } from "../../../use-cases/factories/users/make-delete-use-case.ts";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = getParamsSchema.parse(request.params);
  const userIdAuth = request.user.sub;

  try {
    const deleteUserUseCase = makeDeleteUseCase();

    if (userId !== userIdAuth) {
      return reply
        .status(403)
        .send({ message: "Permissão para excluir este usuário foi negada." });
    }

    await deleteUserUseCase.execute({ userId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
