import express, { Request, Response } from "express"
import {body, validationResult} from "express-validator"
import {signinValidator, signinValidatorArr} from "../middlewares/signinValidator";

const router = express.Router();

router.post("/api/users/signin", ...signinValidatorArr, (req: Request, res: Response) => {
    throw new Error("onder")
    res.send({message: "hi there"})
})

router.use(signinValidator)

export {router as signinRouter}