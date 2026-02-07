import express, { Router } from "express"
import { auth, UserRole } from "../../middleware/auth"
import { ReviewController } from "./review.controller"


const router = express.Router()

router.post("/", auth(UserRole.CUSTOMER), ReviewController.createReview)


router.get("/", auth(UserRole.CUSTOMER), ReviewController.getMyReviews)


router.get("/medicine/:medicineId", auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SELLER),
    ReviewController.getReviewsByMedicine
)


router.put("/:id", auth(UserRole.CUSTOMER), ReviewController.updateReview)


router.delete("/:id", auth(UserRole.CUSTOMER), ReviewController.deleteReview)

export const ReviewRouter: Router = router
