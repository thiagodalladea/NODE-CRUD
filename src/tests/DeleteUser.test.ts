import FakeCreateUserRepository from "./FakeRepositories/FakeCreateUsersRepository"
import CreateUserService from "../services/CreateUserService"
import DeleteUserService from "../services/DeleteUserService"

describe("DeleteUser", () => {

    it("should delete an user.", async () => {
        
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const createUser = new CreateUserService(fakeCreateUserRepository)
        const deleteUser = new DeleteUserService(fakeCreateUserRepository)

        await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        const user = await deleteUser.execute({
            cpf: "12312312300"
        })

        expect(user.cpf).toBe("12312312300")
        expect(user.name).toBe("Fulano")
        expect(user.last_name).toBe("Ciclano Beltrano")
        expect(user.phone).toBe("00912341234")
    })

    it("should not be able to delete an unexistent user.", async () => {
        const fakeCreateUserRepository = new FakeCreateUserRepository()
        const createUser = new CreateUserService(fakeCreateUserRepository)
        const deleteUser = new DeleteUserService(fakeCreateUserRepository)

        await createUser.execute({
            cpf: "12312312300",
            name: "Fulano",
            last_name: "Ciclano Beltrano",
            phone: "00912341234"
        })

        await deleteUser.execute({
            cpf: "12312312300"
        })

        expect(
            deleteUser.execute({
                cpf: "12312312300"
            })
        ).rejects.toBeInstanceOf(Error)
    })
})