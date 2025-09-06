import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/comments-repository";

interface GetCommentsByPostRequest {
  postId: string;
}

interface GetCommentsByPostResponse {
  comments: Comment[];
}

export class GetCommentsByPostUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    postId,
  }: GetCommentsByPostRequest): Promise<GetCommentsByPostResponse> {
    const comments = await this.commentsRepository.findByPost(postId);
    return { comments };
  }
}
