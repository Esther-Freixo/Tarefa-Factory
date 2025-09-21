import cron from 'node-cron';
import { sendEmail } from 'utils/send-email.ts';
import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeGetMostLikedPostUseCase } from 'use-cases/factories/likes/make-get-by-most-liked-use-case.ts';


async function topPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const useCase = makeGetMostLikedPostUseCase();
    const  posts  = await useCase.execute();

    return reply.status(200).send(posts);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}



cron.schedule('10 * * * * *', async () => {
    await sendEmail({
        to: 'esther.freixo@injunior.com.br',
        subject: 'Top 5 de Hoje!',
        message: `Resuminho de hoje!`,
        html: `<h1>Top 5!</h1><p>aqui vai os 5 top posts mais curtidos de hoje.</p>`,
    })
})