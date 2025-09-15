import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { GetCommentByIdUseCase } from "../../comments/get-comments-use-case";

export function makeGetCommentByIdUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new GetCommentByIdUseCase(commentsRepository);
  return useCase;
}
