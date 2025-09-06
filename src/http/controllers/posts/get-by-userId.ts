import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { GetPostByUserIdUseCase } from "../../../use-cases/posts/get-by-userId-user-case";


export async function getByUserId(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
  
    try {
        const prismapostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostByUserIdUseCase(prismapostsRepository)
        const post = await getPostUseCase.execute({ userId })

        return reply.status(200).send( post );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };