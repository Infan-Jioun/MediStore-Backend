import { Request, Response } from "express";
import { ReviewService } from "./review.service";

export const ReviewController = {
    async createReview(req: Request, res: Response) {
        const { medicineId, rating, comment } = req.body;
        const userId = req.user!.id;
        try {
            const review = await ReviewService.createReview(userId as string, medicineId as string, rating as number, comment as string);
            res.status(201).json(review);
        } catch (err) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },

    async getReviewsByMedicine(req: Request, res: Response) {
        const { medicineId } = req.params;
        try {
            const reviews = await ReviewService.getReviewsByMedicine(medicineId as string);
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },

    async updateReview(req: Request, res: Response) {
        const { medicineId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user!.id;

        try {
            const review = await ReviewService.updateReview(userId as string, medicineId as string, rating as number, comment as string);
            res.status(200).json(review);
        } catch (err) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },

    async deleteReview(req: Request, res: Response) {
        const { medicineId } = req.params;
        const userId = req.user!.id;

        try {
            await ReviewService.deleteReview(userId as string, medicineId as string);
            res.status(200).json({ message: "Review deleted successfully" });
        } catch (err) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },
};
