import { Router } from "express";
import { createPlan } from "../controllers/plan.controller";

const router:Router = Router();

router.post("/", createPlan);

export default router;