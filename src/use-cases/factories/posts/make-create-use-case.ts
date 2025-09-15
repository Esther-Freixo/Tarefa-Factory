import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "../../posts/register-posts-use-case";

export function makeCreatePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new CreatePostUseCase(postsRepository);
  return useCase;
}
