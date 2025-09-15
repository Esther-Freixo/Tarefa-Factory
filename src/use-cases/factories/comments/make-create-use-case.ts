import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository"
import { CreateCommentUseCase } from "../../comments/register-comments-use-case"


export function makeCreateCommentUseCase() {
  const usersRepository = new PrismaCommentsRepository()
  const createUseCase = new CreateCommentUseCase(usersRepository)

  return createUseCase
}