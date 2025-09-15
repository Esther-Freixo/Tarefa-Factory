import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists-error.ts";
import { makeRegisterUseCase } from "../../../use-cases/factories/users/make-register-use-case.ts";


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    photo: z.string(),
    password: z.string().min(6),
  })

  const { name, email, photo, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    const { user } = await registerUseCase.execute({
      name,
      email,
      photo,
      password,
    })

    return reply.status(201).send({ user })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
