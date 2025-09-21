import { prisma } from 'lib/prisma/index.ts'
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository.ts";

export class PrismaUsersRepository implements UsersRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }


    async findAllUsers() {
        const user = await prisma.user.findMany();

        return user;
    }

    async delete(id: string) {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user;
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }
    
    async update(id: string, data: any) {
        const user = await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                photo: data.photo,
                password: data.password,
            }
        })
        return user; 
    }
    
    async searchMany(query: string, page:number) {
        const result = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                }
            }
        })
        let filterResult = result.slice((page - 1) * 20, page * 20);
        return filterResult
    }

    async findBy(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({
      where,
    })
  }

    async updateCred(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }
}