import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository.ts"
import { ResetPasswordUseCase } from "use-cases/users/reset-passwors-use-case.ts"


export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

  return resetPasswordUseCase
}