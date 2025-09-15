import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { GetCommentsByUserUseCase } from "../../comments/get-by-userId-user-case";

export function makeGetCommentsByUserUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new GetCommentsByUserUseCase(commentsRepository);
  return useCase;
}
