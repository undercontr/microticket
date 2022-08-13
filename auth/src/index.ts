import express from "express"
import "express-async-errors"
import mongoose from "mongoose";
import cookieSession from "cookie-session"

import type { Express } from "express"
import routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { authUser } from "./middlewares/auth-user";

const app: Express = express();
app.set("trust proxy", true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
}))

app.use(authUser)

app.use(...routes)

app.all("*", async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is not defined.")
    }

    try {
        const db = await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    
    } catch (error) {
        console.log(error)
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}

start()