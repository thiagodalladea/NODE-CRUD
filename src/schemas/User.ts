import mongoose from 'mongoose'

const validateCpf = (cpf: string) => {
    const re = /\d{11}/
    return re.test(cpf)
}

const validatePhone = (phone: string) => {
    const re = /\d{11}/
    return re.test(phone)
}

const validateNames = (name: string) => {
    const re = /^[a-zA-Z\s]*$/
    return re.test(name)
}

const userSchema = new mongoose.Schema({
    cpf: {
        type: String,
        required: [true, "CPF is required."],
        immutable: true,
        validate: [validateCpf, "Please fill a valid CPF"],
        match: [
            /\d{11}/,
            "Please fill a valid CPF",
        ],
    },

    name: {
        type: String,
        required: [true, "Name is required."],
        validate: [validateNames, "Please fill a valid name"],
        match: [
            /^[a-zA-Z\s]*$/,
            "Please fill a valid name",
        ],
    },

    last_name: {
        type: String,
        required: [true, "Last name is required."],
        validate: [validateNames, "Please fill a valid last name"],
        match: [
            /^[a-zA-Z\s]*$/,
            "Please fill a valid last name",
        ],
    },

    phone: {
        type: String,
        required: [true, "Phone number is required."],
        validate: [validatePhone, "Please fill a valid phone number"],
        match: [
            /\d{11}/,
            "Please fill a valid phone number",
        ],
    }
})

const User = mongoose.model("User", userSchema)

export default User