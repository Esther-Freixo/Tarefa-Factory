import { Like } from '@prisma/client';
import { LikesRepository } from '../../repositories/likes-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

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