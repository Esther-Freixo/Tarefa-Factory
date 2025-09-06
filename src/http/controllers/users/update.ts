import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UpdateUserUseCase } from "../../../use-cases/users/update-user-use-case";


export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.string().uuid(),
    });

    const updateBodySchema = z.object({

        name: z.string().optional(),
        email: z.string().optional(),
        photo: z.string().optional(),
        password: z.string().optional(),
    })
    const { userId } = updateParamsSchema.parse(request.params);
    const { name, email, photo, password } = updateBodySchema.parse(request.body);
    const userIdAuth = request.user.sub;


    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        if (userId !== userIdAuth) {
            return reply.status(403).send({ message: "Permissão para atualizar este usuário foi negada." });
        }
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            userId, data: { name, email, photo, password }
        })

        return reply.status(200).send({ user });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw new Error
    }

};