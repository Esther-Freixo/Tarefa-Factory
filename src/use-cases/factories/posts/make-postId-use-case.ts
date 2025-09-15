import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { GetPostUseCase } from "../../posts/get-posts-use-case";

export function makeGetPostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new GetPostUseCase(postsRepository);
  return useCase;
}
