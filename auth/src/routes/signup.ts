import express, { Request, Response } from "express"
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

import jwt from "jsonwebtoken"
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signup",
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Please enter the password in right structure"),
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email})

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build({email, password})
        await user.save();

        const userJwt = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!);
        req.session = {
            jwt: userJwt
        }

        return res.send(user)
    })

export { router as signupRouter }