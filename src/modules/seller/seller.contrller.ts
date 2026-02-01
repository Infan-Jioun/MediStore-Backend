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
export const sellerController = {
    createMedicines,
    updateMedicines
}