import { GetMostLikedPostUseCase } from "use-cases/likes/get-by-most-liked-use-case.ts"
import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository.ts"

export function makeGetMostLikedPostUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const getLikeUseCase = new GetMostLikedPostUseCase(likesRepository)

  return getLikeUseCase
}