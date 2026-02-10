import express, { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middleware/auth";
const router = express.Router()
router.get("/",  categoryController.getCategory)
export const categoryRouter: Router = router; 