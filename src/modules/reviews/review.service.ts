import { prisma } from "../../lib/prisma";

const createReview = async (userId: string,
    medicineId: string,
    rating: number,
    comment: string
) => {
    return prisma.review.create({
        data: { userId, medicineId, rating, comment },
        include: { medicine: { select: { id: true, name: true } } },
    });
};

const getMyReviews = (userId: string) => {
    return prisma.review.findMany({
        where: { userId },
        include: { medicine: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};

const getReviewsByMedicine = (medicineId: string) => {
    return prisma.review.findMany({
        where: { medicineId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });
};

const getUserReview = (userId: string, reviewId: string) => {
    return prisma.review.findUnique({
        where: { id: reviewId },
    });
};

const updateReview = async (
    userId: string,
    reviewId: string,
    rating?: number,
    comment?: string
) => {
    const data: Partial<{ rating: number; comment: string }> = {};
    if (rating !== undefined) data.rating = rating;
    if (comment !== undefined) data.comment = comment;

    return prisma.review.update({
        where: { id: reviewId },
        data,
    });
};

const deleteReview = async (userId: string, reviewId: string) => {
    return prisma.review.delete({
        where: { id: reviewId },
    });
};

export const ReviewService = {
    createReview,
    getMyReviews,
    getReviewsByMedicine,
    getUserReview,
    updateReview,
    deleteReview,
};
