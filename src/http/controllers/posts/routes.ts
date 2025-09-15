import { FastifyInstance } from "fastify";
import { create } from "./create.ts";
import { getAll } from "./getAll.ts";
import { deletePost } from "./delete.ts";
import { get } from "./get.ts";
import { getByUserId } from "./get-by-userId.ts";
import { verifyJWT } from "../../middleware/verify-jwt.ts";
import {  update } from "./update.ts";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', { onRequest: [verifyJWT] }, create)

    app.get('/posts', getAll)
    app.get('/posts/:postId', get)
    app.get('/posts/user/:userId', getByUserId)
        
    app.delete('/posts/:postId', { onRequest: [verifyJWT] }, deletePost)
    
    app.patch('/posts/:postId', { onRequest: [verifyJWT] }, update)
}