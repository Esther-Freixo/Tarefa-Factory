import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts"
import { AuthenticateUseCase } from "../../users/authenticate-use-case.ts"


export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}