import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";
import { PostsRepository } from "../../repositories/posts-repository.ts";

interface GetAllPostsUseCaseResponse {
  posts: Post[];
}

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetAllPostsUseCaseResponse> {
    const posts = await this.postsRepository.findAllPosts();

    if (!posts || posts.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { posts };
  }
}
