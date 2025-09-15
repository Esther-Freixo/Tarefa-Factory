import { Post } from '@prisma/client';

type HTTPPosts = {
  id: string;
  title: string;
  content: string;
  created_at: Date; 
  userId: string;
};

export class PostPresenter {
  static toHTTP(posts: Post): HTTPPosts;
  static toHTTP(posts: Post[]): HTTPPosts[];
  static toHTTP(input: Post | Post[]): HTTPPosts | HTTPPosts[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u));
    }

    return {
      id: input.id,
      title: input.title,
      content: input.content,
      created_at: input.created_at,
      userId: input.userId,
    };
  }
}