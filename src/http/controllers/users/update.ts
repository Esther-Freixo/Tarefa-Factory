import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "use-cases/errors/resource-not-found-error.ts";
import { makeUpdateUseCase } from "use-cases/factories/users/make-update-use-case.ts";


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
        const updateUserUseCase = makeUpdateUseCase();
        if (userId !== userIdAuth) {
            return reply.status(403).send({ message: "Permissão para atualizar este usuário foi negada." });
        }
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