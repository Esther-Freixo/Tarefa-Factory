import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts"
import { RegisterUseCase } from "../../users/register-user-use-case.ts"


export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}