import express, { Router } from "express";
import { orderController } from "./order.controller";
import { auth, UserRole } from "../../middleware/auth";
const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SELLER), orderController.createOrder);
router.get("/", auth(UserRole.ADMIN), orderController.getOrders)
router.get("/:id", auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN), orderController.getOrdersById)
export const orderRouter: Router = router;
