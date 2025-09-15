import { Like } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";
import { LikesRepository } from "../../repositories/likes-repository.ts";

interface DeleteLikeUseCaseRequest {
    likeId: string
}

interface DeleteLikeUseCaseResponse {
    like: Like
}

export class DeleteLikeUseCase {
    constructor(private LikesRepository: LikesRepository) { }

    async execute({ likeId }: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse> {
        const like = await this.LikesRepository.delete(likeId);
        
        if(!like){
            throw new ResourceNotFoundError
        }
        
        return { like };
    }
}