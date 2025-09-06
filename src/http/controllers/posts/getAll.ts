import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { GetpostUseCase } from "../../../use-cases/posts/get-all-posts-use-case";


export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetpostUseCase(prismaPostsRepository)
        const post = await getPostUseCase.execute()   

        return reply.status(200).send( post );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };