import { Like } from '@prisma/client';
import { LikesRepository } from '../../repositories/likes-repository.ts';
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts';

interface GetLikesByUserUseCaseRequest {
  userId: string;
}

interface GetLikesByUserUseCaseResponse {
  likes: Like;
}

export class GetLikesByUserUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    userId,
  }: GetLikesByUserUseCaseRequest): Promise<GetLikesByUserUseCaseResponse> {
    const likes = await this.likesRepository.findById(userId);

    if (!likes) {
      throw new ResourceNotFoundError();
    }

    return { likes };
  }
}
