import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { DeleteCommentUseCase } from "../../comments/delete-comments-use-case";

export function makeDeleteCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new DeleteCommentUseCase(commentsRepository);
  return useCase;
}
