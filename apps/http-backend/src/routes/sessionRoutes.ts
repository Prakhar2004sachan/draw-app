import { Router } from "express";
import { createSession } from "../controllers/sessionController";

const routerS: Router = Router();

// @ts-ignore
routerS.post("/create-session", createSession);

export default routerS;
