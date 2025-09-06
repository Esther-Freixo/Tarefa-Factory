import { prisma } from './../../app';
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

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
    
}