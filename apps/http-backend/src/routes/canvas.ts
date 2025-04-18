import { Router } from "express";
import {
  createCanvas,
  deleteCanvas,
  getCanvasById,
  updateCanvas,
} from "../controllers/canvasController";
import { authenticateToken } from "../middlewares/authMiddleware"

const router: Router = Router();

// @ts-ignore
router.get("get-canvas/:id", authenticateToken, getCanvasById);
// @ts-ignore
router.post("create-canvas", authenticateToken, createCanvas);
// @ts-ignore
router.patch("update-canvas/:id", authenticateToken, updateCanvas);
// @ts-ignore
router.delete("delete-canvas/:id", authenticateToken, deleteCanvas);

export default router;
