import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserUseCase } from "../../../use-cases/factories/users/make-getById-use-case.ts";



export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const getUserUseCase = makeGetUserUseCase();
    const { user } = await getUserUseCase.execute({ userId: request.user.sub })

    return reply.status(200).send({
        user:{
            ...user,
            password: undefined
        }
    })
};