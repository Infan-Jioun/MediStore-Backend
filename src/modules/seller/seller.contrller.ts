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
    updateMedicines,
    deleteMedicines,
    getSellerOrders,
    updateStatusOrder
}