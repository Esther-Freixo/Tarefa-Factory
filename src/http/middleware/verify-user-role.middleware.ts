import { UserRole } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { messages } from '@constants/messages.ts'

export function verifyUserRole(allowedRoles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user as { sub: string; role: UserRole }

    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: messages.errors.forbidden })
    }
  }
}
