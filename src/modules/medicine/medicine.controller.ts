import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const createMedicine = (req: Request, res: Response) => {
    const result = await prisma()
}
export const medicineController = {
    createMedicine
}
