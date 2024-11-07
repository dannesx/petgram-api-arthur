import express from "express"
import { userRouter, authRouter } from "./routes"
import ErrorHandler from "./middlewares/ErrorHandler"

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use("/users", userRouter)
app.use("/auth", authRouter)

app.use(ErrorHandler)

app.listen(port, () => console.log(`Server running at port ${port}`))