import { Router } from "express";
import { createUsage} from "../controllers/usage.controller";

const router:Router = Router();

router.post("/", createUsage);

export default router;