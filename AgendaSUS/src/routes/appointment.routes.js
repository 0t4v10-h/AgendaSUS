import { Router } from "express";
import { create, findAll, findOne, update, remove } from "../controllers/appointment.controller.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", authenticateToken, create);
router.get("/", authenticateToken, findAll);
router.get("/:id", authenticateToken, findOne);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, remove);

export default router;