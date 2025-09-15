import { PrismaPostsRepository } from "repositories/prisma/prisma-posts-repository.ts";
import { GetAllPostsUseCase } from "use-cases/posts/get-all-posts-use-case.ts";

export function makeGetAllPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new GetAllPostsUseCase(postsRepository);
  return useCase;
}
