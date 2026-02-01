import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { sellerController } from "./seller.contrller";
const router = express.Router();
router.post("/medicines", auth(UserRole.SELLER), sellerController.createMedicines)
router.put("/medicines/:id", auth(UserRole.SELLER), sellerController.updateMedicines)
export const sellerRouter: Router = router

