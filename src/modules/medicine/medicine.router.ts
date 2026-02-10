import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

export const router = express.Router()

router.post("/", auth(UserRole.SELLER, UserRole.ADMIN), medicineController.createMedicine)
router.get("/", medicineController.getAllMedicines)
router.get("/:id",  medicineController.getMedicinesById)

export const medicineRouter: Router = router; 