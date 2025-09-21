import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository.ts"
import { DeleteLikeUseCase } from "../../likes/delete-likes-use-case.ts"


export function makeDeleteLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

  return deleteLikeUseCase
}