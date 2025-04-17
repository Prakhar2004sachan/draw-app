import { Router } from "express";
import {
  createCanvas,
  deleteCanvas,
  getCanvasById,
  updateCanvas,
} from "../controllers/canvasController";
import { authenticatToken } from "../middlewares/authMiddleware";

const router: Router = Router();

// @ts-ignore
router.get("get-canvas/:id", getCanvasById);
// @ts-ignore
router.post("create-canvas", authenticatToken, createCanvas);
// @ts-ignore
router.patch("update-canvas/:id", authenticatToken, updateCanvas);
// @ts-ignore
router.delete("delete-canvas/:id", authenticatToken, deleteCanvas);

export default router;
