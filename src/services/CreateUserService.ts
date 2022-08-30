import { IUserRepository } from "../repositories/IUserRepository";

interface Request {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

class CreateUserService {
    constructor (private userRepository: IUserRepository) {}
    
    public async execute({ cpf, name, last_name, phone }: Request): Promise<Request> {
        const userExists = await this.userRepository.findUser(cpf)
        
        if(userExists) {
            throw new Error("This user is already registered.")
        }

        const user = await this.userRepository.create({ cpf, name, last_name, phone })

        return user
    }
}

export default CreateUserService