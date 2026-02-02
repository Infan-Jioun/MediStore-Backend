import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { getMe } from "./auth.controller";


const router = express.Router();
router.get("/me", auth(), getMe);

export const authRouter: Router = router;