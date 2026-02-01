import { prisma } from "../../lib/prisma";
interface MedicineItem {
    medicineId: string;
    quantity: number;
}
interface OrderPaylaod {
    medicineItems: MedicineItem[];
    shippingAddress: string
}
const createOrder = async (userId: string, payload: OrderPaylaod) => {
    const { medicineItems, shippingAddress } = payload;

    if (!medicineItems || medicineItems.length === 0) {
        throw new Error("Order item required")
    }
    if (!shippingAddress) {
        throw new Error("shippingAddress is required")
    }
    let totalAmount = 0;
    const orderItems = await Promise.all(
        medicineItems.map(
            async (item: any) => {
                const medicine = await prisma.medicine.findUniqueOrThrow({
                    where: {
                        id: item.medicineId
                    }

                })
                if (!medicine) {
                    throw new Error(`Medicine not found for id: ${item.medicineId}`);
                }

                totalAmount += medicine.price * item.quantity;
                console.log(totalAmount);
                return {
                    medicineId: medicine.id,
                    quantity: item.quantity,
                    price: medicine.price
                }
            }
        )
    )

    return prisma.order.create({
        data: {
            customerId: userId,
            totalAmount,
            shippingAddress,

            items: {
                create: orderItems
            },
        },
        include: {
            items: true
        }

    })
}
export const orderService = {
    createOrder
}