import express from "express";
import AttendanceController from "../controllers/AttendanceController";
import authMiddleware from "../middleware/authMiddleware";

const router= express.Router();

router.post("/clockin",authMiddleware,AttendanceController.clockIn);
router.patch("/clockout",authMiddleware,AttendanceController.clockOut);
router.get("/history",authMiddleware,AttendanceController.history);
router.get("/all",authMiddleware,AttendanceController.findAll);
router.put("/timer", AttendanceController.updateTimer);

export default router;