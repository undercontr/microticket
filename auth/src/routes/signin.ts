import express, { Request, Response } from "express"
import { body } from "express-validator"
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/api/users/signin",
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
    validateRequest
    , async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new BadRequestError("User is not found associated with supplied email")
        }

        const passwordsMatch = await Password.compare(user!.password, password)

        if (!passwordsMatch) {
            throw new BadRequestError("Credentials are wrong or user not found")
        } 

        req.session = {
            jwt: jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!)
        }

        res.status(200).send(user)
    })

export { router as signinRouter }