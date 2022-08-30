import FakeCreateUserRepository from "./FakeRepositories/FakeCreateUsersRepository"
import CreateUserService from "../services/CreateUserService"
import ListAllUsersServices from "../services/ListAllUsersService"

describe("ListAllUsers", () => {
    
    it("should be able to list all booked users.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const listUsers = new ListAllUsersServices(fakeCreateUserRepository)
        const createUser = new CreateUserService(fakeCreateUserRepository)

        let users = await listUsers.execute()

        expect(users.length).toBe(0)

        await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        users = await listUsers.execute()
        
        expect(users.length).toBe(1)
    })
})