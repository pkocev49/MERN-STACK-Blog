import AuthController from "../controllers/authController.js";
import { Router } from "express";

const authController = new AuthController();

export const authRouter = Router();
authRouter.post("/login", authController.login_post);
