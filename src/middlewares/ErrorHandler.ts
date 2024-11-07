import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../utils/HTTPError";

export default function ErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    let message = error.message || "Something went wrong"
    let status = 500

    if (error instanceof PrismaClientKnownRequestError) {
        const { code, meta } = error

        switch (code) {
            case 'P2002':
                message = `Failed to create a new ${meta?.modelName}. This ${meta?.target} already exists`
                status = 400
                break
        }
    }

    if (error instanceof HTTPError){
        status = error.status
    }

    console.log("[ERROR]", error)

    res.status(status).json({
        error: true,
        message
    })
}
