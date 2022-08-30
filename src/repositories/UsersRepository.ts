import { IUserRepository } from "./IUserRepository"
import User from "../schemas/User"

interface Request {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

class UsersRepository implements IUserRepository {
    public async create({ cpf, name, last_name, phone }: Request): Promise<Request> {
        try {
            const user = await User.create({
                cpf,
                name,
                last_name,
                phone
            })

            await user.save()

            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }
    
    public async findUser(cpf: string): Promise<Request | null | undefined> {
        const user = await User.findOne({ cpf })
        
        return user
    }

    public async listUsers(): Promise<Request[]> {
        const listUsers = await User.find()

        return listUsers
    }

    public async updateUser({ cpf, name, last_name, phone }: Request): Promise<Request> {
        const user = await User.findOneAndUpdate({ cpf }, { 
            name,
            last_name,
            phone
        })

        if(!user) {
            throw new Error("User not found.")
        }

        await user.save()

        return user
    }

    public async deleteUser(cpf: string): Promise<Request | null | undefined> {
        const user = await User.findOneAndDelete({ cpf })

        return user
    }
}

export default UsersRepository