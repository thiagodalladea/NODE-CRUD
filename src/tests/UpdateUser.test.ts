import FakeCreateUserRepository from "./FakeRepositories/FakeCreateUsersRepository"
import CreateUserService from "../services/CreateUserService"
import UpdateUserService from "../services/UpdateUserService"

describe("UpdateUser", () => {

    it("should be able to update an existent user.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const createUser = new CreateUserService(fakeCreateUserRepository)
        const updateUser = new UpdateUserService(fakeCreateUserRepository)

        await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        const user = await updateUser.execute({
            cpf: "12312312300",
            name: "Ciclano",
            last_name: "Fulano Beltrano",
            phone: "00943214321"
        })

        expect(user.cpf).toBe("12312312300")
        expect(user.name).toBe("Ciclano")
        expect(user.last_name).toBe("Fulano Beltrano")
        expect(user.phone).toBe("00943214321")
    })

    it("should not be able to update an unexistent user.", async () => {

        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const updateUser = new UpdateUserService(fakeCreateUserRepository)
        
        expect(
            updateUser.execute({
                cpf: "32132132100",
                name: "Fulano",
                last_name: "Ciclano Beltrano",
                phone: "00912341234"
            })
        ).rejects.toBeInstanceOf(Error)
    })
})