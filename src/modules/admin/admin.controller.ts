import type { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    const users = await adminService.getAllUsers();
    return res.status(200).json(users)
}
export const adminController = {
    getAllUsers
}