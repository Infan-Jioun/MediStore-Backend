import type { Request, Response } from "express";
import { categoryService } from "./category.service";

const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.getCategory()
        return res.status(201).json(category)
    } catch (err) {
        res.status(500).json({
            message: "something went wrong..."
        })
    }
}
export const categoryController = {
    getCategory
}