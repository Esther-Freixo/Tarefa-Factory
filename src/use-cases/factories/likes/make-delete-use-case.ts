import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository"
import { DeleteLikeUseCase } from "../../likes/delete-likes-use-case"


export function makeDeleteLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

  return deleteLikeUseCase
}