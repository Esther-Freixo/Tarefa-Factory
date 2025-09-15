import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { UpdateCommentUseCase } from "../../comments/update-comments-use-case";

export function makeUpdateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new UpdateCommentUseCase(commentsRepository);
  return useCase;
}
