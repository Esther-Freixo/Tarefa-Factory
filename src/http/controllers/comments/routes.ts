import { FastifyInstance } from "fastify";
import { createComment } from "./create";
import { deleteComment } from "./delete";
import { updateComment } from "./update";
import { verifyJWT } from "../../middleware/verify-jwt";
import { getAllComments } from "./getAll";
import { getCommentById } from "./getById";
import { getCommentsByUser } from "./getByUserId";
import { getCommentsByPost } from "./getByPostId";

export async function commentsRoutes(app: FastifyInstance) {

    app.get("/comments", getAllComments);
    app.get("/comments/:commentId", getCommentById);
    app.get("/comments/user/:userId", getCommentsByUser);
    app.get("/comments/post/:postId", getCommentsByPost);

    app.post("/comments", { onRequest: [verifyJWT] }, createComment);
    app.delete("/comments/:commentId", { onRequest: [verifyJWT] }, deleteComment);
    app.patch("/comments/:commentId", { onRequest: [verifyJWT] }, updateComment);
}
