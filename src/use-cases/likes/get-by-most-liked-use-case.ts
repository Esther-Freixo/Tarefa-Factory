import { Post } from '@prisma/client';
import { LikesRepository } from '../../repositories/likes-repository.ts';
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts';

interface GetLikesByPostUseCaseResponse {
  posts: Post[];
}

export class GetMostLikedPostUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute(): Promise<GetLikesByPostUseCaseResponse> {
    const posts = await this.likesRepository.findMostLikedPosts();

    if(!posts) {
        throw new ResourceNotFoundError();
    }

    return {
      posts,
    };
  }
}