import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { categoryContoller } from "./category.controller";
const router = express.Router()
router.post("/", auth(UserRole.ADMIN, UserRole.SELLER), categoryContoller.
    createCategoryController)
router.get("/", categoryContoller.getCategoryController)
export const categoryRouter: Router = router