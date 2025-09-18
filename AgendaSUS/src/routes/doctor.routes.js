import { Router } from "express";
import { create, findAll, findOne, update, remove } from "../controllers/doctor.controller.js";
import { authenticateToken, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/", authenticateToken, isAdmin, create);
router.get("/", authenticateToken, findAll);
router.get("/:id", authenticateToken, findOne);
router.put("/:id", authenticateToken, isAdmin, update);
router.delete("/:id", authenticateToken, isAdmin, remove);


export default router;