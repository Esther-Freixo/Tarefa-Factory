import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { DeleteUserUseCase } from "../../users/delete-user-use-case"


export function makeDeleteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUseCase
}