import { prisma } from "../config/prisma";
import { NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";

export const createUser = async (req:any, res: any) => {
    try {
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const id = uuid();
        const user = await prisma.user.create({
            data: {
                id,
                name
            }
        });

        res.status(201).json({message:"User created successfully", user});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const currentMonthUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = id as string;
        const usage = await prisma.usageRecords.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        const totalUsedUnits = usage.reduce((total, record) => total + record.usedUnit, 0);
        const plan = await prisma.subscriptions.findFirst({
            where: {
                userId: userId,
                isActive: true
            },
            include: {plan: true}
        });
        let remainingQuota = plan ? plan.plan.monthlyQuota - totalUsedUnits : 0;

        if(remainingQuota < 0) {
            remainingQuota = 0;
        }
        res.status(200).json({ message: "Current month usage retrieved successfully", totalUsedUnits, activePlan: plan ? plan.plan : "No Active Plan", remainingQuota });
    } catch (error) {
        next(error);
    }   
};

export const billingSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = id as string;
        const usage = await prisma.usageRecords.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });
        const totalUsedUnits = usage.reduce((total, record) => total + record.usedUnit, 0);
        const plan = await prisma.subscriptions.findFirst({
            where: {
                userId: userId,
                isActive: true
            },
            include: {plan: true}
        });
        const extraUnits = plan ? Math.max(0, totalUsedUnits - plan.plan.monthlyQuota) : totalUsedUnits;
        const extraCharges = plan ? extraUnits * Number(plan.plan.extraChargePerUnit) : 0;
        res.status(200).json({ message: "Billing summary retrieved successfully", totalUsedUnits, planQuota: plan?.plan.monthlyQuota, extraUnits, extraCharges, currentActivePlan: plan?.plan });

    } catch (error) {
        next(error);
    }
};