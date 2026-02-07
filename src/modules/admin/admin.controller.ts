import type { Request, Response } from "express";
import { adminService } from "./admin.service";
import { UserRole } from "../../middleware/auth";

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
        const { name, slug, image } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category name is required "
            })
        }
        const category = await adminService.createCategoryService({
            name, slug, image
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
        console.log(err);
        res.status(500).json({
            message: "Failed to get category"
        })
    }
}
const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await adminService.getOrders(req.user)
        return res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ message: "Get failed" })
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        if (!name) {
            return res.status(401).json({
                message: "provide your categories name"
            })
        }
        const result = await adminService.updateCategory(id as string, name, image);
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            message: "failed to update "
        })
    }
}
const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteCategory(id as string)
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            message: "something went wrong..."
        })
    }
}
export const adminController = {
    getAllUsers,
    updateUserStatus,
    createCategoryController,
    getCategory,
    getOrders,
    updateCategory,
    deleteCategory


}