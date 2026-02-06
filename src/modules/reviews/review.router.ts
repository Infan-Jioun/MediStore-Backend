import express, { Router } from "express";
import { auth, UserRole } from "../../middleware/auth";
import { ReviewController } from "./review.controller";
const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), ReviewController.createReview);
router.get("/medicine/:medicineId", auth(UserRole.CUSTOMER), ReviewController.getReviewsByMedicine);
router.put("/:medicineId", auth(UserRole.CUSTOMER), ReviewController.updateReview);
router.delete("/:medicineId", auth(UserRole.CUSTOMER), ReviewController.deleteReview);

export const ReviewRouter: Router = router;

