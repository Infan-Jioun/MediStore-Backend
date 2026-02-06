import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { sellerController } from "./seller.contrller";
const router = express.Router();

router.post("/medicines", auth(UserRole.SELLER), sellerController.createMedicines)
router.get("/medicines", auth(UserRole.SELLER), sellerController.getSellerMedicines);
router.get("/medicines/:id", auth(UserRole.SELLER), sellerController.getMedicineById)
router.put("/medicines/:id", auth(UserRole.SELLER), sellerController.updateMedicines)
router.delete("/medicines/:id", auth(UserRole.SELLER), sellerController.deleteMedicines)
router.get("/orders", auth(UserRole.SELLER), sellerController.getSellerOrders)
router.patch("/orders/:id", auth(UserRole.SELLER), sellerController.updateStatusOrder)
export const sellerRouter: Router = router

