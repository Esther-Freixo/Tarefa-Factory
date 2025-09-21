import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository.ts";
import { DeletePostUseCase } from "../../posts/delete-posts-use-case.ts";

export function makeDeletePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new DeletePostUseCase(postsRepository);
  return useCase;
}
