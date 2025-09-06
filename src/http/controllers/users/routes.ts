import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { deleteUser } from "./delete";
import { update } from "./update";
import { get } from "./get";
import { verifyJWT } from "../../middleware/verify-jwt";
import { profile } from "./profile";
import { authenticate } from "./authenticate";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)

    app.get('/profile', { onRequest: [verifyJWT]}, profile)
    app.get('/users', getAll)
    app.get('/users/:userId', get)

    app.delete('/users/:userId', { onRequest: [verifyJWT] }, deleteUser)

    app.patch('/users/:userId',{ onRequest: [verifyJWT] }, update)

}