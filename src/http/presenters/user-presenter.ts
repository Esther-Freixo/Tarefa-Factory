import { User } from '@prisma/client'


type HTTPUser = {
  id: string
  name: string
  email: string
  photo: string
}

export class UserPresenter {
  static toHTTP(user: User): HTTPUser
  static toHTTP(users: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u))
    }

    return {
      id: input.id,
      name: input.name,
      email: input.email,
      photo: input.photo,
    }
  }
}