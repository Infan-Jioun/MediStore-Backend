import { prisma } from "../../lib/prisma"
type MedicinePayload = {
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    manufacturer?: string;
    dosage?: string;
    imageUrl?: string;
    categoryId?: string;
};

const createMedicine = async (sellerId: string, payload: any) => {
    const { categoryId } = payload;
    const category = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    if (!category) {
        throw new Error("Invalid categoryId");
    }

    return await prisma.medicine.create({
        data: {
            ...payload,
            sellerId
        }
    })
}
const updateMedicines = async (sellerId: string, medicineId: string, payload: MedicinePayload) => {
    const medicine = await prisma.medicine.findFirst({
        where: {
            id: medicineId,
            sellerId
        }
    });
    if (!medicine) {
        throw new Error("Medicine not found or you are not authorized");
    }
    return await prisma.medicine.update({
        where: { id: medicineId },
        data: payload
    })

}

export const sellerService = {
    createMedicine,
    updateMedicines
} 