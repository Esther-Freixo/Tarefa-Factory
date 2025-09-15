import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts"
import { GetUserUseCase } from "../../users/get-user-use-case.ts"


export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(usersRepository)

  return getUserUseCase
}