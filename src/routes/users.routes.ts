import { Router } from "express"
import CreateUserService from "../services/CreateUserService"
import UpdateUserService from "../services/UpdateUserService"
import DeleteUserService from "../services/DeleteUserService"
import ListUserService from "../services/ListUserService"
import ListAllUsersService from "../services/ListAllUsersService"
import UsersRepository from "../repositories/UsersRepository"

const userRouter = Router()

const userRepository = new UsersRepository()

// Criação de usuário
userRouter.post("/", async (request, response) => {
    const { cpf, name, last_name, phone } = request.body

    const createUser = new CreateUserService(userRepository)

    const user = await createUser.execute({
        cpf,
        name,
        last_name,
        phone
    })

    return response.json(user)
})

// Listagem de usuários
userRouter.get("/", async (request, response) => {
    const listUser = new ListAllUsersService(userRepository)
    
    const listUsers = await listUser.execute()

    return response.json(listUsers)
})

// Listagem de um usuário por meio do cpf
userRouter.get("/id", async (request, response) => {
    const { cpf } = request.body

    const listUserService = new ListUserService(userRepository)

    const user = await listUserService.execute(cpf)

    return response.json(user)
})

// Atualização de usuários
userRouter.put("/id", async (request, response) => {
    const { cpf, name, last_name, phone } = request.body

    const updateUser = new UpdateUserService(userRepository)

    const user = await updateUser.execute({
        cpf,
        name,
        last_name,
        phone
    })

    return response.json(user)
})

// Deletagem de usuários
userRouter.delete("/", async (request, response) => {
    const { cpf } = request.body

    const deleteUser = new DeleteUserService(userRepository)

    deleteUser.execute({ cpf })
    
    return response.json(deleteUser)
})

export default userRouter