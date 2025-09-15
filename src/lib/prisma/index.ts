import { PrismaClient } from '@prisma/client'
import { env } from '@env/index.ts'

export const prisma = new PrismaClient({
  log: env.LOG_LEVEL === 'debug' ? ['query', 'info', 'warn'] : [],
})