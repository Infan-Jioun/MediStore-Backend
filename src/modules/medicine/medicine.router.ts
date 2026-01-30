import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

export const router = express.Router()

router.post("/", medicineController.createMedicine)

export const medicineRouter: Router = router; 