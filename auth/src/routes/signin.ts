import express, { Request, Response } from "express"

const router = express.Router();

router.post("/api/users/signin", (req: Request, res: Response) => {
    throw new Error("onder")
    res.send({message: "hi there"})
})

export {router as signinRouter}