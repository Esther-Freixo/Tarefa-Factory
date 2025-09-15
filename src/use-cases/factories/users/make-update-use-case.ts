import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository.ts"
import { UpdateUserUseCase } from "use-cases/users/update-user-use-case.ts"


export function makeUpdateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserUseCase(usersRepository)
  return useCase
}