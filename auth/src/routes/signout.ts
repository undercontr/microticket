import express from "express"
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
    if (req.session?.jwt) {
        req.session = null
        res.send(200)
    } else {
        throw new BadRequestError("User is not signed in")
    }
})

export {router as signoutRouter}