import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { GetCommentsByPostUseCase } from "../../comments/get-by-postId";

export function makeGetCommentsByPostUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new GetCommentsByPostUseCase(commentsRepository);
  return useCase;
}
