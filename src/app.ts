import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { postsRoutes } from './http/controllers/posts/routes';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { env } from 'process';
import fastifyCookie from '@fastify/cookie';
import { likesRoutes } from './http/controllers/likes/routes';
import { commentsRoutes } from './http/controllers/comments/routes';

export const app = fastify();
export const prisma = new PrismaClient();

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m'
  }
})

app.register(userRoutes);
app.register(postsRoutes);
app.register(likesRoutes);
app.register(commentsRoutes);

app.setErrorHandler((error, resquest, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.format() })
  }

  return reply.status(500).send({ message: "Internal server error" })
})