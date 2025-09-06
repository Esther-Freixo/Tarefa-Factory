import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";
import { PostsRepository } from "../../repositories/posts-repository";


interface GetpostUseCaseResponse {
    post: Post[]
}

export class GetpostUseCase {
    constructor(private PostsRepository: PostsRepository) { }

    async execute(): Promise<GetpostUseCaseResponse> {
        const post = await this.PostsRepository.findAllPosts();
        
        if(!post){
            throw new ResourceNotFoundError
        }
        
        return { post };
    }
}