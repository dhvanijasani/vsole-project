import express from "express";
import TenantController from "../controllers/TenantController";

const router = express.Router();

router.post("/create",TenantController.create);

export default router;