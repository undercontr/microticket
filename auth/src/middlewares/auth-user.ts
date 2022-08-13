import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user: UserPayload | null
        }
    }
}

export function authUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        req.user = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    } catch (error) {
    }

    next();
}