import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import EmployeeDashboardController from "../controllers/EmployeeDashboardController";

const router = express.Router();
router.get("/dashboard/:id", authMiddleware, EmployeeDashboardController.dashboard);
export default router;