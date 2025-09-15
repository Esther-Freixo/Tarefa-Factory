import fastify from 'fastify'
import { env } from 'env/index.ts'
import { logger, runWithRequestId, runWithUserContext } from '@lib/logger/index.ts'
import { logError } from 'lib/logger/helpers.ts'
import { v7 as uuidv7 } from 'uuid'
import z, { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { appRoutes } from 'http/controllers/routes.ts'
import { messages } from 'constants/messages.ts'

z.config(z.locales.pt())

export const app = fastify({
  logger: false,
})

// --- Sentry ---
if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profileSessionSampleRate: 1.0,
    profileLifecycle: 'trace',
  })

  Sentry.setupFastifyErrorHandler(app as any)
}

// --- Hooks ---
import type { FastifyInstance, onRequestAsyncHookHandler } from 'fastify'

// ...

const onRequestHook: onRequestAsyncHookHandler = async (request, reply) => {
  const requestId = uuidv7()
  const xff = request.headers['x-forwarded-for']
  const clientIp = Array.isArray(xff)
    ? xff[0]
    : (xff?.split(',')[0]?.trim() ?? request.ip)

  await runWithRequestId(requestId, async () => {
    try {
      const decoded = await request.jwtVerify<{ sub: string }>()
      runWithUserContext(decoded.sub, () => logRequestDetails())
    } catch {
      logRequestDetails()
    }
  })

  function logRequestDetails() {
    logger.info(
      {
        method: request.method,
        url: request.url,
        ip: clientIp,
        remotePort: request.socket.remotePort,
        userAgent: request.headers['user-agent'],
      },
      'Incoming request',
    )
  }
}

app.addHook('onRequest', onRequestHook)

// --- Plugins ---
app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  maxAge: 3600,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// --- Rotas ---
app.register(appRoutes)

// --- Error handler ---
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    logger.debug(z.treeifyError(error), 'Validation error occurred')

    return reply
      .status(400)
      .send({ message: messages.validation.invalidData, details: z.treeifyError(error) })
  }

  if (error instanceof SyntaxError) {
    logger.error(error, 'JSON inválido recebido')
    return reply.status(400).send({ message: messages.validation.invalidJson })
  }

  if (env.NODE_ENV === 'development') {
    logError(error, {}, 'Unhandled error occurred')
  } else {
    if (env.SENTRY_DSN) {
      Sentry.captureException(error)
    }
    logger.error('Unhandled error occurred')
  }

  reply.status(500).send({ message: messages.errors.internalServer })
})
