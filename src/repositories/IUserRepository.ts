interface Request {
    cpf: string;
    name: string;
    last_name: string;
    phone: string;
}

interface IUserRepository {
    create({ cpf, name, last_name, phone }: Request): Promise<Request>
    findUser(cpf: string): Promise<Request | null | undefined>
    listUsers(): Promise<Request[]>
    updateUser({ cpf, name, last_name, phone }: Request): Promise<Request>
    deleteUser(cpf: string): Promise<Request | null | undefined>
}

export { Request, IUserRepository }
