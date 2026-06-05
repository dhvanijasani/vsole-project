import express from "express";
import VisitorController from "../controllers/VisitorController";
import authMiddleware from "../middleware/authMiddleware";

const router= express.Router();

router.post("/create",authMiddleware,VisitorController.create)
router.get("/find",authMiddleware,VisitorController.find);
router.patch("/checkout/:id",authMiddleware,VisitorController.checkout);
router.post("/login", VisitorController.visitorLogin);
router.put("/:id", VisitorController.update);
router.delete("/:id", VisitorController.delete);
router.patch("/active/:id", VisitorController.toggleActive);

export default router;