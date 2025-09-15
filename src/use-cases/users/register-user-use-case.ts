import { hash } from 'bcryptjs'
import { UserAlreadyExists } from '../errors/user-already-exists-error.ts'
import { UsersRepository } from '../../repositories/users-repository.ts'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  photo: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    photo,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      photo,
      password: password_hash,
    })

    return { user }
  }
}
