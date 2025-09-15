import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { DeletePostUseCase } from "../../posts/delete-posts-use-case";

export function makeDeletePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new DeletePostUseCase(postsRepository);
  return useCase;
}
