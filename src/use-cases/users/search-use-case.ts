import { UsersRepository } from '../../repositories/users-repository.ts'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from 'use-cases/errors/resource-not-found-error.ts';

interface SearchUsersUseCaseRequest {
    query: string;
    page: number;
}

interface SearchUsersUseCaseResponse {
    users: User[];
}

export class SearchUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        query,
        page
    }: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
        const users = await this.usersRepository.searchMany(query, page)

        if (!users || users.length === 0) {
            throw new ResourceNotFoundError();
        }


        return { users };
    }
}
