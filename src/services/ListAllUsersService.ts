import { IUserRepository } from "../repositories/IUserRepository"

class ListUserService {
    constructor (private userRepository: IUserRepository) {}
    
    public async execute(){
        const users = await this.userRepository.listUsers()

        return users
    }
}

export default ListUserService