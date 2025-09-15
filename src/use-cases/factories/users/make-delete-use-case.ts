import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts"
import { DeleteUserUseCase } from "../../users/delete-user-use-case.ts"


export function makeDeleteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUseCase
}