import { IUserRepository } from "../repositories/IUserRepository"

interface Request {
    cpf: string;
}

interface IUser {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

class DeleteUserService {
    constructor (private userRepository: IUserRepository) {}

    public async execute({ cpf }: Request): Promise<IUser> {
        const user = await this.userRepository.deleteUser(cpf)

        if(!user) {
            throw new Error("User not found.")
        }
        
        return user
    }
}

export default DeleteUserService