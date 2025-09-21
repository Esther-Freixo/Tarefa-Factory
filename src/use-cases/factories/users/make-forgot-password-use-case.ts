import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository.ts"
import { ForgotPasswordUseCase } from "use-cases/users/forgot-password-use-case.ts"


export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}