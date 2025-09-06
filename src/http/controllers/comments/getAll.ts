import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
  const repo = new PrismaCommentsRepository();
  const comments = await repo.findAll();

  return reply.status(200).send(comments);
}
