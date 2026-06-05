import express from "express";
import DashboardController from "../controllers/DashboardController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", authMiddleware,DashboardController.stats);

export default router;