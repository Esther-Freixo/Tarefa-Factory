import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { GetAllUserUseCase } from "../../users/get-all-user-use-case"


export function makeGetAllUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllUserUseCase = new GetAllUserUseCase(usersRepository)

  return getAllUserUseCase
}