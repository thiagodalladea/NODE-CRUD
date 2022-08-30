import { IUserRepository } from "../repositories/IUserRepository"


class ListUserService {
    constructor (private userRepository: IUserRepository) {}

    public async execute(cpf: string){
        const user = await this.userRepository.findUser(cpf)

        if(!user) {
            throw new Error("User not found.")
        }

        return user
    }
}

export default ListUserService