import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository"
import { GetLikesByPostUseCase } from "../../likes/get-by-postId-use-case";

export function makeGetLikesByPostUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikesByPostUseCase = new GetLikesByPostUseCase(likesRepository);

    return getLikesByPostUseCase;
}