import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository";
import { GetlikeUseCase } from "../../likes/get-all-likes-use-case";

export function makeGetLikeUseCase() {
  const likesRepository = new PrismaLikesRepository();
  const getLikeUseCase = new GetlikeUseCase(likesRepository);
  
  return getLikeUseCase;
}
