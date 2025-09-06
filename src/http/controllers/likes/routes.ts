import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "../../middleware/verify-jwt";
import { deleteLike } from "./delete";
import { getAll } from "./getAll";
import { getLikesByUser } from "./get-by-userId";
import { getLikesByPost } from "./get-by-postId";
import { getLikesByComment } from "./get-by-commentId";

export function likesRoutes(app: FastifyInstance) {
    app.post('/like', { onRequest: [verifyJWT] }, create)
    app.delete('/like/:likeId', { onRequest: [verifyJWT] }, deleteLike)
    
    app.get('/like/all', getAll)
    app.get('/like/user/:userId', getLikesByUser);
    app.get('/like/post/:postId', getLikesByPost);
    app.get('/like/comment/:commentId', getLikesByComment);
}