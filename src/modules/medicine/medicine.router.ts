import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

export const router = express.Router()

router.post("/", auth(UserRole.SELLER, UserRole.ADMIN), medicineController.createMedicine)
router.get("/", auth(UserRole.ADMIN), medicineController.getAllMedicines)

export const medicineRouter: Router = router; 