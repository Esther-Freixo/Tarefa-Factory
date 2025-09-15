import { Like } from '@prisma/client';
import { LikesRepository } from '../../repositories/likes-repository.ts';
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts';

interface GetLikesByCommentUseCaseRequest {
  commentId: string;
}

interface GetLikesByCommentUseCaseResponse {
  likes: Like[];
}

export class GetLikesByCommentUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    commentId,
  }: GetLikesByCommentUseCaseRequest): Promise<GetLikesByCommentUseCaseResponse> {
    const likes = await this.likesRepository.findByCommentId(commentId);

    if(!likes) {
        throw new ResourceNotFoundError();
    }

    return {
      likes,
    };
  }
}