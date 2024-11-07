import { NextFunction, Request, Response } from "express"
import prisma from "../config/prisma"
import { HTTPError } from "../utils/HTTPError"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"

const select = {
    id: true,
    username: true,
    email: true,
    createdAt: true
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await prisma.user.findMany({ select })

        res.json(users)
    } catch (error) {
        next(error)
    }
}

export async function getUserByUsername(req: Request, res: Response, next: NextFunction) { 
    try {
        const { username } = req.params

        const user = await prisma.user.findUnique({ where: { username }})

        if (!user){
            next(new HTTPError("User not found", 404))
        }

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            next(new HTTPError("Username, email and password are required", 400))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({ data: {
            username,
            email,
            password: hashedPassword
        }, select })

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { username, email, password } = req.body

        if (!username && !email && !password) {
            return next(new HTTPError("Operation denied. Please provide at least username, email or password", 400))
        }

        const updateData: Partial<User> = {}

        if (username) updateData.username = username
        if (email) updateData.email = email
        if (password) updateData.password = await bcrypt.hash(password, 10)

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            select
        })

        res.json(updatedUser)
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        await prisma.user.delete({ where: { id }})
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}