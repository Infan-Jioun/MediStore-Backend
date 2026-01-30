import type { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category name is required "
            })
        }
        const category = await categoryService.createCategoryService({
            name, slug
        })
        return res.status(201).json(category);
    } catch (err) {
        res.status(500).json({
            message: "Failed to create category"
        })
    }
}
const getCategoryController = async (res: Response, req: Request) => {
    try {
        const categories = await categoryService.getCategoryService();
        return res.status(201).json(categories);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get category"
        })
    }
}
export const categoryContoller = {
    createCategoryController,
    getCategoryController
}