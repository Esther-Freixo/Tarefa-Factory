import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { GetUserUseCase } from "../../../use-cases/users/get-user-use-case";


export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
    const { user } = await getUserUseCase.execute({ userId: request.user.sub })

    return reply.status(200).send({
        user:{
            ...user,
            password: undefined
        }
    })
};