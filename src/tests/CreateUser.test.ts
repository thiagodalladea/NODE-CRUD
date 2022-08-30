import FakeCreateUserRepository from "./FakeRepositories/FakeCreateUsersRepository"
import CreateUserService from "../services/CreateUserService"

describe("CreateUser", () => {
    
    it("should be able to create a new user.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const createUser = new CreateUserService(fakeCreateUserRepository)

        const user = await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        expect(user).toBeDefined()
        expect(user).toHaveProperty("_id")
    })

    it("should not be able to create two users with the same CPF.", async () => {

        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const createUser = new CreateUserService(fakeCreateUserRepository)

        await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        expect(
            createUser.execute({
                cpf: "12312312300",
                name: "Ciclano",
                last_name: "Fulano Beltrano",
                phone: "00943214321"
            })
        ).rejects.toBeInstanceOf(Error)
    })
})