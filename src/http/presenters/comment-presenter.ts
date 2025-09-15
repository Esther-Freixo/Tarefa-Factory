import { Comment } from "@prisma/client";

type HTTPComment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  postId: string;
};

export class CommentPresenter {
  static toHTTP(comment: Comment): HTTPComment;
  static toHTTP(comments: Comment[]): HTTPComment[];
  static toHTTP(input: Comment | Comment[]): HTTPComment | HTTPComment[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u));
    }

    return {
      id: input.id,
      content: input.content,
      createdAt: input.created_at,
      userId: input.userId,
      postId: input.postId,
    };
  }
}
