import {prisma} from "../config/prisma";
import {Request, Response} from "express";
import {uuid} from "uuidv4";

export const buySubscription = async (req: Request, res: Response) => {
    try {
        const { userId, planId } = req.body;
        if (!userId || !planId) {
            return res.status(400).json({ message: "userId and planId are required" });
        }
        const id = uuid();
        const subscription = await prisma.subscriptions.create({
            data: {
                id,
                userId,
                planId,
                isActive: true
            }
        });
        res.status(201).json({ message: "Subscription created successfully", subscription });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};