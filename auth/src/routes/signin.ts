import express, { Request, Response } from "express"
import {body, validationResult} from "express-validator"
import {signinValidator, signinValidatorArr} from "../middlewares/signinValidator";

const router = express.Router();

router.post("/api/users/signin", ...signinValidatorArr, (req: Request, res: Response) => {
    res.send({message: "hi there"})
})

router.use(signinValidator)

export {router as signinRouter}