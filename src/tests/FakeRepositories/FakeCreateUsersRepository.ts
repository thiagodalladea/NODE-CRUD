import { IUserRepository } from "../../repositories/IUserRepository"
import User from "../../schemas/User"

interface Request {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

class FakeUsersRepository implements IUserRepository {
    private users: Request[] = [] 

    public async create({ cpf, name, last_name, phone }: Request): Promise<Request> {
        const user = new User()

        Object.assign(user, {
            cpf,
            name,
            last_name,
            phone
        })

        this.users.push(user)

        return user
    }
    
    public async findUser(cpf: string): Promise<Request | null | undefined> {
        const user = this.users.find(user => user.cpf === cpf)

        return user
    }

    public async listUsers(): Promise<Request[]> {
        return this.users
    }

    public async updateUser({ cpf, name, last_name, phone }: Request): Promise<Request> {
        const userExists = this.users.find(user => user.cpf === cpf)

        if(!userExists) {
            throw new Error("User not found.")
        }

        const findIndex = this.users.findIndex(findUser => findUser.cpf === cpf)
        
        const user = {
            cpf,
            name,
            last_name,
            phone
        }

        this.users[findIndex] = user

        return user
    }

    public async deleteUser(cpf: string): Promise<Request | null | undefined> {
        const user = this.users.find(user => user.cpf === cpf)
        this.users = this.users.filter((user) => { user.cpf !== cpf })
        
        return user
    }
}

export default FakeUsersRepository