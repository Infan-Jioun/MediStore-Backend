import type { OrderStatus } from "../../../generated/prisma/enums";
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
        throw new Error("Medicine not found...");
    }

    return await prisma.medicine.update({
        where: { id: medicineId },
        data: payload
    })

}
const deleteMedicines = async (sellerId: string, medicineId: string) => {
    const medicine = await prisma.medicine.findFirst({
        where: {
            id: medicineId,
            sellerId
        }
    });
    if (!medicine) {
        throw new Error("Medicine not found...");
    }
    if (!sellerId) {
        throw new Error("Medicine not found or you are not authorized to delete");
    }
    const deleteMedicines = await prisma.medicine.delete({
        where: {
            id: medicineId,
            sellerId
        }
    })
    return deleteMedicines;
}
const getSellerOrders = async (sellerId: string) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: {
                    medicine: {
                        sellerId
                    }
                }
            }
        },
        include: {
            items: {
                include: {
                    medicine: true
                }
            }
        },
        orderBy: { createdAt: "desc" }

    })

}
const updateStatusOrder = async (sellerId: string, orderId: string, status: OrderStatus
) => {
    const order = await prisma.order.findFirstOrThrow({
        where: {
            id: orderId,
            items: {
                some: {
                    medicine: {
                        sellerId
                    }
                }
            }
        }
    });
    return await prisma.order.update({
        where: { id: order.id },
        data: { status }
    })
}
export const sellerService = {
    createMedicine,
    updateMedicines,
    deleteMedicines,
    getSellerOrders,
    updateStatusOrder
} 