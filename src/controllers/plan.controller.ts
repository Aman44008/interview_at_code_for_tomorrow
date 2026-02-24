import {prisma} from "../config/prisma";
import {Request, Response} from "express";
import {uuid} from "uuidv4";

export const createPlan = async (req: Request, res: Response) => {
    try {
        const { name, monthlyQuota, extraChargePerUnit } = req.body;

        if (!name || !monthlyQuota || !extraChargePerUnit) {
            return res.status(400).json({ message: "Name, monthlyQuota and extraChargePerUnit are required" });
        }

        const id = uuid();
        const plan = await prisma.plan.create({
            data: {
                id,
                name,
                monthlyQuota,
                extraChargePerUnit
            }
        });
        res.status(201).json({ message: "Plan created successfully", plan });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};