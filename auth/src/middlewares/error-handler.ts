import type { NextFunction, Request, Response, Errback, ErrorRequestHandler } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(500).send({message: err.message})
}