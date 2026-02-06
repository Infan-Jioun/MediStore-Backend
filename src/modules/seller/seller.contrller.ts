import type { Request, Response } from "express"
import { sellerService } from "./seller.service"


const createMedicines = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        const medicine = await sellerService.createMedicine(sellerId as string, req.body)
        return res.status(200).json(medicine)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong..."
        })
    }
}
const getSellerMedicines = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;

        if (!sellerId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized  seller not authenticated",
            });
        }

        const medicines = await sellerService.getSellerMedicines(sellerId as string);

        return res.status(200).json({
            success: true,
            data: medicines,
            count: medicines.length,
        });
    } catch (error: any) {
        console.error("Error in getSellerMedicines:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch seller's medicines",
            error: error.message || "Internal server error",
        });
    }
};
export const getMedicineById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sellerId = req.user?.id;
        const medicine = await sellerService.getMedicineById(id as string, sellerId as string);
        if (!medicine) return res.status(404).json({ message: "Medicine not found" });
        res.json(medicine);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};
const updateMedicines = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        const { id } = req.params;
        const medicine = await sellerService.updateMedicines(sellerId as string, id as string, req.body)
        return res.status(200).json(medicine)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "update failed"
        })
    }
}
const deleteMedicines = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        const { id } = req.params;
        const medicine = await sellerService.deleteMedicines(sellerId as string, id as string)
        return res.status(200).json(medicine)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Delete failed",

        })
    }
}
const getSellerOrders = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        if (!sellerId) {
            return res.status(400).json({
                message: "you are authorized seller"
            })
        }
        const orders = await sellerService.getSellerOrders(sellerId as string)
        return res.status(200).json(orders)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Orders gets failed",

        })
    }
}
const updateStatusOrder = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        const { id } = req.params;
        const { status } = req.body;
        const order = await sellerService.updateStatusOrder(sellerId as string, id as string, status);
        return res.status(200).json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Orders update failed",

        })
    }
}
export const sellerController = {
    createMedicines,
    getSellerMedicines,
    getMedicineById,
    updateMedicines,
    deleteMedicines,
    getSellerOrders,
    updateStatusOrder
}