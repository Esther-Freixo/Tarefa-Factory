import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository"
import { CreateLikesUseCase } from "../../likes/register-like-use-case"


export function makeCreateLikesUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const createLikesUseCase = new CreateLikesUseCase(likesRepository)

  return createLikesUseCase
}