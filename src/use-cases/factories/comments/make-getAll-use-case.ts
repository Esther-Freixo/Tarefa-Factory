import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository";
import { GetAllCommentsUseCase } from "../../comments/get-all-comments-use-case";

export function makeGetAllCommentsUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const useCase = new GetAllCommentsUseCase(commentsRepository);
  return useCase;
}
