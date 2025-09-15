import { Like } from '@prisma/client';

type HTTPLike = {
  id: string;
  createdAt: Date;
  userId: string;
  postId: string | null;
  commentId: string | null;
};

export class LikePresenter {
  static toHTTP(like: Like): HTTPLike;
  static toHTTP(likes: Like[]): HTTPLike[];
  static toHTTP(input: Like | Like[]): HTTPLike | HTTPLike[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u));
    }

    return {
      id: input.id,
      createdAt: input.created_at,
      userId: input.userId,
      postId: input.postId,
      commentId: input.commentId,
    };
  }
}
