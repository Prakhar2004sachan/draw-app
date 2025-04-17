import { Router } from "express";
import { login, signup } from "../controllers/authController";

const router: Router = Router();

// @ts-ignore
router.post('/signup', signup);
// @ts-ignore
router.post('/login', login);

export default router