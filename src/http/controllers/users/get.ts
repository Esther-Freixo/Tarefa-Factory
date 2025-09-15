import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetUserUseCase } from "../../../use-cases/factories/users/make-getById-use-case.ts";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
  
    try {
        const getUserUseCase = makeGetUserUseCase();
        const user = await getUserUseCase.execute({ userId })

        return reply.status(200).send( user );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };