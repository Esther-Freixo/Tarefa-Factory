import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetAllUserUseCase } from "../../../use-cases/factories/users/make-get-all-use-case.ts";


export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getUserUseCase = makeGetAllUserUseCase();
        const user = await getUserUseCase.execute()   

        return reply.status(200).send( user );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };