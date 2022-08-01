import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const signinValidatorArr = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").trim().isLength({min: 4, max: 20}).withMessage("Please enter the password in right structure")
      
]

export function signinValidator(req: Request,res: Response, next: NextFunction) {

    const errors = validationResult(req)
    console.log(errors.array())
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send(errors.array())
    }
}