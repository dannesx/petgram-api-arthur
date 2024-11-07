import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../utils/HTTPError";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function login(req: Request, res: Response, next: NextFunction){
    try {
        const { username, password } = req.body

        if(!username || !password) {
            return next(new HTTPError("Failed to login. Username and password are required", 400))
        }

        const user = await prisma.user.findUnique({ where: { username }})

        if(!user) {
            return next(new HTTPError("User not found", 404))
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return next(new HTTPError("Invalid credentials", 401))
        }

        const token = generateToken(user.id)

        res.json({ token })
    } catch (error) {
        next(error)
    }
}

function generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '24h'
    })
}