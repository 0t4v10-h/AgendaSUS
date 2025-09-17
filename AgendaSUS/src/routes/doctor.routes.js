import { Router } from "express";
import { create, findAll, findOne, update, remove } from "../controllers/doctor.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, findAll);
router.get("/:id", authMiddleware, findOne);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;