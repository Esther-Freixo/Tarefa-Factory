import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../../users/register-user-use-case"


export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}