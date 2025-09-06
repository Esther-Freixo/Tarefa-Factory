import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { GetPostUseCase } from "../../../use-cases/posts/get-posts-use-case";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      postId: z.string().uuid(),
    });
  
    const { postId } = getParamsSchema.parse(request.params);
  
    try {
        const prismapostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismapostsRepository)
        const post = await getPostUseCase.execute({ postId })

        return reply.status(200).send( post );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };