import { Router } from "express";
import { createUser, currentMonthUsage, billingSummary } from "../controllers/users.controller";

const router:Router = Router();

router.post("/", createUser);
router.get("/:id/current-usage", currentMonthUsage);
router.get("/:id/billing-summary", billingSummary);

export default router;