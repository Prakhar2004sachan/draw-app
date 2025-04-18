import { Router } from "express";
import { createSession } from "../controllers/sessionController";
import { authenticateToken } from "../middlewares/authMiddleware";

const routerS: Router = Router();

// @ts-ignore
routerS.post("/create-session",authenticateToken, createSession);

export default routerS;
