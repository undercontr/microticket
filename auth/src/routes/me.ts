import express, { Request, Response } from "express"
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/api/users/me", requireAuth, async (req: Request, res: Response) => {
    return res.send({user: req.user || null})
})

export {router as currentUserRouter}