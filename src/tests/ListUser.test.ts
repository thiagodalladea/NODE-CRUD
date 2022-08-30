import FakeCreateUserRepository from "./FakeRepositories/FakeCreateUsersRepository"
import CreateUserService from "../services/CreateUserService"
import ListUserServices from "../services/ListUserService"

describe("ListUser", () => {
    
    it("should be able to list an especific user.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const listUser = new ListUserServices(fakeCreateUserRepository)
        const createUser = new CreateUserService(fakeCreateUserRepository)

        let user = await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        user = await listUser.execute(user.cpf)

        expect(user.name).toBe("Fulano")
        expect(user.last_name).toBe("Ciclano Beltrano")
        expect(user.phone).toBe("00912341234")
    })

    it("should not be able to list an unexistent user.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const listUser = new ListUserServices(fakeCreateUserRepository)
        const createUser = new CreateUserService(fakeCreateUserRepository)

        const user = {
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        }

        expect(listUser.execute(user.cpf)).rejects.toBeInstanceOf(Error)
    })
})