import { Router } from "express";
import {
    create,
    findAll,
    findOne,
    update,
    remove,
    myAppointments,
    queueToday,
    changeStatus
} from "../controllers/appointment.controller.js";
import { authenticateToken, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/my", authenticateToken, myAppointments);
router.get("/queue/today", authenticateToken, isAdmin, queueToday);
router.post("/", authenticateToken, create);
router.get("/", authenticateToken, findAll);
router.get("/:id", authenticateToken, findOne);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, remove);
router.put("/:id/status", authenticateToken, isAdmin, changeStatus);

export default router;