import {prisma} from "../config/prisma";
import {Request, Response} from "express";
import {uuid} from "uuidv4";

export const createUsage = async (req: Request, res: Response) => {
    try {
        const { userId, usedUnit, action } = req.body;

        if (!userId || !usedUnit || !action) {
            return res.status(400).json({ message: "userId, usedUnit and action are required" });
        }

        const id = uuid();
        const usage = await prisma.usageRecords.create({
            data: {
                id,
                userId,
                usedUnit,
                action
            }
        });
        res.status(201).json({ message: "Usage created successfully", usage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};