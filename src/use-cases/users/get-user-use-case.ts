import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ userId }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);
        
        if(!user){
            throw new ResourceNotFoundError
        }
        
        return { user };
    }
}