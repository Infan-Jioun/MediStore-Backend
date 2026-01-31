import express, { Router } from "express";
import { adminController } from "./admin.controller";
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers)
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus)
router.post("/categories", auth(UserRole.ADMIN), adminController.createCategoryController)
router.get("/categories", auth(UserRole.ADMIN), adminController.getCategory)
router.patch("/categories/:id", auth(UserRole.ADMIN), adminController.updateCategory)
router.delete("/categories/:id", auth(UserRole.ADMIN), adminController.deleteCategory)



export const adminRouter: Router = router;
