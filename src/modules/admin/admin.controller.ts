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
const getAllMedicines = async (req: Request, res: Response) => {
    try {
        const medicine = await adminService.getAllMedicines()
        return res.status(200).json(medicine)
    } catch (err) {
        res.status(500).json({
            message: "somthing went wrong"
        })
    }
}
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllMedicines
}