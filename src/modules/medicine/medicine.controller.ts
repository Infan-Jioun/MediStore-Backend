import type { Request, Response } from "express";
import { medicineService } from "./medicine.service";


const createMedicine = async (req: Request, res: Response) => {
    try {
        const { name, price, stock, categoryId, description, manufacturer, dosage, imageUrl } = req.body;

        const sellerId = req.user?.id;
        if (!sellerId) {
            return res.status(401).json({ message: "Unauthorzied seller" })
        }

        if (!name || !price || !categoryId || !manufacturer || !imageUrl) {
            return res.status(400).json({ message: "Required fields missing" });
        }

                
        const medicine = await medicineService.createMedicineService({
            name, price, stock: stock ?? 0, categoryId, sellerId, description: description ?? null, manufacturer, dosage: dosage ?? null, imageUrl,
        });

        return res.status(201).json(medicine);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create medicine" });
    }
};

export const medicineController = {
    createMedicine,
};
