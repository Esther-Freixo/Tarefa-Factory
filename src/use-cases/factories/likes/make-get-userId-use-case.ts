import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository.ts"
import { GetlikeUseCase } from "../../likes/get-all-likes-use-case.ts"


export function makeGetLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const getLikeUseCase = new GetlikeUseCase(likesRepository)

  return getLikeUseCase
}