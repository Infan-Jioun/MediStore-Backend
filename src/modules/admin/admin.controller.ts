import type { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    const users = await adminService.getAllUsers();
    return res.status(200).json(users)
}
const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isBanned } = req.body;
        if (!["ACTIVE", "BANNED"].includes(isBanned)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status"
            })
        }
        if (req.user?.id === id) {
            return res.status(400).json({
                success: false,
                message: "You Cannnot ban yourself"
            })
        }
        const result = await adminService.updateUserStatus(id as string, isBanned)
        return res.status(201).json(result)
    } catch (err) {
        res.status(500).json({
            messgae: "something went wrong"
        })
    }
}
const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category name is required "
            })
        }
        const category = await adminService.createCategoryService({
            name, slug
        })
        return res.status(201).json(category);
    } catch (err) {
        res.status(500).json({
            message: "Failed to create category"
        })
    }
}
const getCategory = async (req: Request, res: Response) => {
    try {
        const categories = await adminService.getCategoryService();
        return res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({
            message: "Failed to get category"
        })
    }
}
export const adminController = {
    getAllUsers,
    updateUserStatus,
    createCategoryController,
    getCategory,


}