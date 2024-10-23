import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    let message = error.message || "Something went wrong"
    let status = 500

    console.log("[ERROR]", message)

    res.status(status).json({
        error: true,
        message
    })
}
