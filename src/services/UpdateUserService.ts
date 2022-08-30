import { IUserRepository } from "../repositories/IUserRepository"

interface Request {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

class UpdateUserService {
    constructor (private userRepository: IUserRepository) {}

    public async execute({ cpf, name, last_name, phone }: Request) {

        const user = await this.userRepository.updateUser({ cpf, name, last_name, phone })

        return user
    }
}

export default UpdateUserService