import { Like } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";
import { LikesRepository } from "../../repositories/likes-repository.ts";


interface GetLikeUseCaseResponse {
    like: Like[]
}

export class GetlikeUseCase {
    constructor(private likesRepository: LikesRepository) { }

    async execute(): Promise<GetLikeUseCaseResponse> {
        const like = await this.likesRepository.findAllLikes();
        
        if(!like){
            throw new ResourceNotFoundError
        }
        
        return { like };
    }
}