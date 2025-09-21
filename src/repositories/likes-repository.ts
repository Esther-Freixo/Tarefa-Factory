import { Prisma, Like, Post } from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>;
    findAllLikes(): Promise<Like[]>;
    delete(id: string): Promise<Like | null>;
    findById(id: string): Promise<Like | null>;
    findByLikeId(userId: string): Promise<Like[]>;
    findByPostId(postId: string): Promise<Like[]>;
    findByCommentId(commentId: string): Promise<Like[]>;
    findMostLikedPosts(): Promise<Post[] | null>
}
