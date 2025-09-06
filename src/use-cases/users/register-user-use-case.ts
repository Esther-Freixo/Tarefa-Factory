import { hash } from 'bcryptjs';
import { UserAlreadyExists } from '../../errors/user-already-exists-error';
import { UsersRepository } from '../../repositories/users-repository';

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    photo: string,
    password: string
}


export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        photo,
        password
    }: RegisterUseCaseRequest) {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }
    
        const password_hash = await hash(password, 6);
        
        await this.usersRepository.create({
            name,
            email,
            photo,
            password: password_hash,
        })

        console.log("criado com sucesso")
    }
}
