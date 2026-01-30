import type { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategoryController = async (req: Request, res: Response) => {
    return await categoryService.createCategoryService();
}
export const categoryContoller = {
    createCategoryController
}