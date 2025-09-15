import { FastifyInstance } from 'fastify'
import { userRoutes } from './users/routes.ts'
import { postsRoutes } from './posts/routes.ts'
import { likesRoutes } from './likes/routes.ts'
import { commentsRoutes } from './comments/routes.ts'


export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes)
  app.register(postsRoutes)
  app.register(commentsRoutes)
  app.register(likesRoutes)
}
