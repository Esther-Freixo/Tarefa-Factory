import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreatePostUseCase } from "../../../use-cases/factories/posts/make-create-use-case.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    created_at: z.string().transform((str) => new Date(str)),
    content: z.string(),
  });

  const { title, content, created_at } = createBodySchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const createPostUseCase = makeCreatePostUseCase();
    await createPostUseCase.execute({
      title,
      content,
      created_at,
      userId,
    });

    return reply.status(201).send({ message: "Post criado com sucesso!" });
  } catch (error) {
    throw error;
  }
}
