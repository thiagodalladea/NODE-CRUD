import express from "express"
import mongoose from 'mongoose'
import routes from "./routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use(routes)

console.log(process.env.BASE_URL)

mongoose.connect(process.env.BASE_URL, () => {
    console.log("Connected to mongo!")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running!")
})