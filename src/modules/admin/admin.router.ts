import express, { Router } from "express";
import { adminController } from "./admin.controller";
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers)
export const adminRouter: Router = router;
