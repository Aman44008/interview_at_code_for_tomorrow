import { Router } from "express";
import { buySubscription } from "../controllers/subscription.controller";

const router:Router = Router();

router.post("/", buySubscription);

export default router;