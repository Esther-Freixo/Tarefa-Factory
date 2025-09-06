import { Prisma, Post } from "@prisma/client";

export interface  PostUpdateInput {
    title?: string,
    content?: string,
}

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findAllPosts(): Promise<Post[] | null>
    delete(postId: string): Promise<Post | null>
    update(id: string, data: PostUpdateInput): Promise<Post | null>
    findById(postId: string): Promise<Post | null>
    findByUserId(userId: string): Promise<Post[] | null>
}