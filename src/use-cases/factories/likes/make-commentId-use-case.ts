import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository"
import { GetLikesByCommentUseCase } from "../../likes/get-by-commentId-use-case"

export function makeGetByCommentIdUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const getByCommentIdUseCase = new GetLikesByCommentUseCase(likesRepository)

  return getByCommentIdUseCase
}
