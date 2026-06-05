import express from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create",authMiddleware,UserController.create);
router.get("/find",authMiddleware,UserController.find);
router.delete("/:id",UserController.delete);
router.put("/:id",UserController.update);
router.patch("/active/:id",UserController.toggleActive);''

export default router;