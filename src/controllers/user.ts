import { NextFunction, Request, Response } from "express"
import prisma from "../config/prisma"

const select = {
    id: true,
    username: true,
    email: true,
    createdAt: true
}


export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({ select })

    res.json(users)
}

export function getUserByUsername(req: Request, res: Response) { }

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body

        const newUser = await prisma.user.create({ data: { username, email, password }, select })

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export function updateUser(req: Request, res: Response) { }

export function deleteUser(req: Request, res: Response) { }