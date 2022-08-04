import express, { Request, Response } from "express"
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post("/api/users/signup",
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Please enter the password in right structure"),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }  

        const {email, password} = req.body;

        const existingUser = await User.findOne({email})

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build({email, password})
        await user.save();

        return res.send({message: "User saved", user})
    })

export { router as signupRouter }